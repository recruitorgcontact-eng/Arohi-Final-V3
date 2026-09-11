import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  FileText, 
  CheckSquare, 
  Bot, 
  BarChart3, 
  Share2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  PhoneCall, 
  Globe, 
  Play, 
  Layers
} from 'lucide-react';

interface ArohiOneProductPageProps {
  onLaunchBusinessOS: () => void;
  onNavigateTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiOneProductPage({
  onLaunchBusinessOS,
  onNavigateTab,
  isDarkMode = true
}: ArohiOneProductPageProps) {
  const [selectedModule, setSelectedModule] = useState(0);

  const modules = [
    {
      title: 'CRM',
      desc: 'Manage customer contacts, history & pipeline',
      icon: Users,
      badge: 'Core CRM',
      metrics: '482 Leads Tracked'
    },
    {
      title: 'Sales',
      desc: 'Smart deal flows, quotes & closing automation',
      icon: TrendingUp,
      badge: 'Sales Engine',
      metrics: '₹12.4L Pipeline'
    },
    {
      title: 'Marketing',
      desc: 'WhatsApp campaigns, emails & lead generation',
      icon: Zap,
      badge: 'Omni-Channel',
      metrics: '18.4% Conversion'
    },
    {
      title: 'Finance & Invoicing',
      desc: 'GST compliant invoices, receipts & cashflow tracking',
      icon: DollarSign,
      badge: 'GST Ready',
      metrics: 'Instant PDF / WhatsApp'
    },
    {
      title: 'Operations',
      desc: 'Inventory, vendor supply and order workflows',
      icon: Settings,
      badge: 'Automated',
      metrics: '99.4% Fulfillment'
    },
    {
      title: 'HR & Payroll',
      desc: 'Attendance, payroll calculations & team records',
      icon: FileText,
      badge: 'Team OS',
      metrics: '1-Click Payslips'
    },
    {
      title: 'Projects & Tasks',
      desc: 'Kanban boards, deliverables & milestone alerts',
      icon: CheckSquare,
      badge: 'Execution',
      metrics: '14 Active Milestones'
    },
    {
      title: 'AI Autonomous Agents',
      desc: 'Voice callers, email responders & triage bots',
      icon: Bot,
      badge: 'Genie Autonomous',
      metrics: '12 Active Agents'
    },
    {
      title: 'Analytics & Insights',
      desc: 'Real-time revenue, CAC, LTV and growth metrics',
      icon: BarChart3,
      badge: 'Deep BI',
      metrics: 'Live Cash Velocity'
    },
    {
      title: 'Integrations Hub',
      desc: 'Tally, Zoho, WhatsApp, Razorpay & PhonePe links',
      icon: Share2,
      badge: '100+ Connectors',
      metrics: 'Zero-Code Setup'
    }
  ];

  const agentTypes = [
    { name: 'Inbound Customer Receptionist', status: 'Active 24/7', role: 'Answers calls, answers product queries, books appointments' },
    { name: 'Outbound Sales & Follow-Up Agent', status: 'Active', role: 'Calls warm leads, qualifies interest, updates CRM records' },
    { name: 'Payment Collection & Reminder Agent', status: 'Active', role: 'Polite reminder calls, WhatsApp invoice links, payment confirmation' },
    { name: 'Marketing Campaign Dispatcher', status: 'Active', role: 'Targeted broadcast campaigns across WhatsApp & email' },
    { name: 'HR Interview Screener', status: 'Active', role: 'Screens applicant resumes, conducts initial voice interview assessment' }
  ];

  const integratedTools = [
    'WhatsApp Business API', 'Google Workspace', 'Microsoft 365', 'Tally Prime', 
    'Zoho CRM', 'Razorpay', 'PhonePe', 'Slack', 'Gmail', 'IndiaMART'
  ];

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>AROHI ONE BUSINESS OS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Run your business. Smarter. Faster. Together.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          A complete AI-powered Business Operating System for modern Indian businesses, MSMEs, startups, and agencies.
        </p>

        {/* Hand-lettered accent */}
        <div className="mt-2 text-sm sm:text-base font-bold text-[#d4af37] italic font-newsreader">
          — Built for Bharat&apos;s Businesses —
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={onLaunchBusinessOS}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Launch Business OS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('calling-agents')}
            className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-500" />
            <span>Calling Agents Demo</span>
          </button>
        </div>

        {/* Interactive Simulated Business OS Dashboard Card */}
        <div className="mt-10 max-w-3xl mx-auto rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-white to-slate-50 dark:from-[#15171e] dark:to-[#0c0d12] border border-blue-500/30 shadow-2xl text-left">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/8">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-mono font-bold text-zinc-500 ml-2">Arohi One Enterprise Cockpit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Live Production System</span>
            </div>
          </div>

          {/* 4 Hero Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-[11px] font-bold text-blue-500 uppercase">Monthly Sales</div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white font-mono mt-0.5">₹12,48,000</div>
              <div className="text-[10px] text-emerald-500 font-bold mt-0.5">+24.8% vs last mo</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-[11px] font-bold text-emerald-500 uppercase">Active Leads</div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white font-mono mt-0.5">482</div>
              <div className="text-[10px] text-zinc-400 font-medium mt-0.5">72 Qualified Today</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="text-[11px] font-bold text-purple-500 uppercase">Customers</div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white font-mono mt-0.5">1,024</div>
              <div className="text-[10px] text-purple-400 font-medium mt-0.5">99.2% Retention</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-[11px] font-bold text-amber-500 uppercase">AI Agents</div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white font-mono mt-0.5">12 Active</div>
              <div className="text-[10px] text-amber-400 font-medium mt-0.5">Autonomous Ops</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-zinc-500">Includes Invoicing, Calling Bots, CRM &amp; Tally integration</span>
            <button 
              onClick={onLaunchBusinessOS} 
              className="text-blue-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Enter Working OS Workspace →
            </button>
          </div>
        </div>
      </section>

      {/* 2. 10 Core Modules Grid */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            10 Integrated Modules. Zero Disconnected Chaos.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Replace 8 expensive software subscriptions with one cohesive sovereign operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {modules.map((m, index) => {
            const Icon = m.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-blue-500/40' : 'bg-white border-black/8 hover:shadow-md'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-blue-500 mb-0.5">{m.badge}</div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{m.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">{m.desc}</p>
                <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 text-[10px] font-mono font-bold text-emerald-500">
                  {m.metrics}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. AI Autonomous Agents For Every Function */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/15 via-indigo-900/15 to-slate-900/20 rounded-3xl border border-blue-500/20 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
              AUTONOMOUS WORKFORCE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              AI Agents for Every Business Function
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Configure specialized voice, text and workflow agents that work on autopilot 24/7 without fatigue.
            </p>
          </div>

          <div className="space-y-2.5">
            {agentTypes.map((agent, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#12141c]/80 rounded-2xl p-3.5 border border-black/6 dark:border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">{agent.name}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/20">
                    {agent.status}
                  </span>
                  <button
                    onClick={onLaunchBusinessOS}
                    className="text-xs font-bold text-blue-500 hover:text-blue-400 cursor-pointer"
                  >
                    Configure →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tools Integration Ecosystem */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
          CONNECTED ECOSYSTEM
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
          Works with your favorite Indian &amp; Global tools
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 max-w-3xl mx-auto">
          {integratedTools.map((tool, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#15171e] border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs"
            >
              {tool}
            </span>
          ))}
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
            +100 More via Webhook &amp; REST API
          </span>
        </div>
      </section>

      {/* 5. Metrics Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-display">10,000+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Businesses Empowered</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">3x</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Average Productivity</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-display">40%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Operational Cost Reduction</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-display">99.9%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Uptime &amp; Data Security</div>
          </div>
        </div>
      </section>
    </div>
  );
}
