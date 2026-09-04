import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  FileText,
  DollarSign,
  ShoppingBag,
  Package,
  FolderKanban,
  Send,
  PhoneCall,
  LifeBuoy,
  ShieldCheck,
  BarChart3,
  Zap,
  Settings,
  Sparkles,
  Search,
  Plus,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  Bell,
  CheckCircle2,
  Lock,
  Globe,
  Sun,
  Moon,
  Bot
} from 'lucide-react';
import { BusinessOSProvider, useBusinessOS } from './BusinessOSContext';
import { BusinessOSModule } from './types';

// Sub components
import DashboardOverview from './DashboardOverview';
import CrmLeadsView from './CrmLeadsView';
import CustomersView from './CustomersView';
import SalesDealsPipelineView from './SalesDealsPipelineView';
import QuotationsView from './QuotationsView';
import InvoicingBillingView from './InvoicingBillingView';
import FinanceExpensesView from './FinanceExpensesView';
import PurchasesVendorsView from './PurchasesVendorsView';
import InventoryStockView from './InventoryStockView';
import HrPayrollView from './HrPayrollView';
import ProjectsTasksView from './ProjectsTasksView';
import MarketingCampaignsView from './MarketingCampaignsView';
import ArohiCallView from './ArohiCallView';
import BusinessBrainSyncView from './BusinessBrainSyncView';
import SupportDeskView from './SupportDeskView';
import DocumentsVaultView from './DocumentsVaultView';
import AnalyticsBiView from './AnalyticsBiView';
import WorkflowAutomationView from './WorkflowAutomationView';
import SettingsTenantView from './SettingsTenantView';
import BusinessCopilotDrawer from './BusinessCopilotDrawer';
import CommandPaletteModal from './CommandPaletteModal';
import QuickCreateModal from './QuickCreateModal';
import { BusinessErrorBoundary } from './BusinessErrorBoundary';

interface BusinessOSShellProps {
  onBackToMainApp?: () => void;
}

interface NavItem {
  id: BusinessOSModule;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_GROUPS: { groupName: string; items: NavItem[] }[] = [
  {
    groupName: 'Executive & Sales',
    items: [
      { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
      { id: 'crm_leads', label: 'CRM & Leads', icon: Users, badge: 'AI Score' },
      { id: 'customers', label: '360° Customers', icon: Building },
      { id: 'pipeline', label: 'Sales Deals Pipeline', icon: Briefcase },
      { id: 'quotations', label: 'Quotations & Estimates', icon: FileText },
    ]
  },
  {
    groupName: 'Finance & Supply Chain',
    items: [
      { id: 'invoices', label: 'GST Tax Invoicing', icon: FileText, badge: 'UPI QR' },
      { id: 'finance', label: 'Finance & Expenses', icon: DollarSign },
      { id: 'purchases', label: 'Purchases & Vendors', icon: ShoppingBag },
      { id: 'inventory', label: 'Inventory & Stock', icon: Package },
    ]
  },
  {
    groupName: 'Operations & HR',
    items: [
      { id: 'hr_payroll', label: 'HR & Indian Payroll', icon: Users, badge: 'PF/TDS' },
      { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban },
      { id: 'support', label: 'Support Helpdesk', icon: LifeBuoy },
      { id: 'documents', label: 'Document & Legal Vault', icon: ShieldCheck, badge: 'E-sign' },
    ]
  },
  {
    groupName: 'Intelligence & Comms',
    items: [
      { id: 'brain_sync', label: 'Arohi Brain & Voice Sync', icon: Bot, badge: 'Auto-Sync' },
      { id: 'telephony', label: 'Arohi Call Telephony', icon: PhoneCall, badge: 'AI Voice' },
      { id: 'marketing', label: 'WhatsApp & Marketing', icon: Send },
      { id: 'analytics', label: 'BI Analytics & Forecast', icon: BarChart3 },
      { id: 'automation', label: 'Workflow Automations', icon: Zap },
      { id: 'settings', label: 'Settings & Multi-Tenant', icon: Settings },
    ]
  }
];

function InnerBusinessOS({ onBackToMainApp }: { onBackToMainApp?: () => void }) {
  const {
    activeModule,
    setActiveModule,
    companyProfile,
    activeUserRole,
    setIsCopilotOpen,
    setIsCommandPaletteOpen,
    setQuickCreateType,
    toastMessage,
    metrics,
    theme,
    toggleTheme
  } = useBusinessOS();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Render the appropriate module view safely with isolated error boundaries
  const renderModuleView = () => {
    const getView = () => {
      switch (activeModule) {
        case 'overview':
          return <DashboardOverview />;
        case 'brain_sync':
          return <BusinessBrainSyncView />;
        case 'crm':
        case 'crm_leads':
          return <CrmLeadsView />;
        case 'customers':
          return <CustomersView />;
        case 'pipeline':
          return <SalesDealsPipelineView />;
        case 'quotations':
          return <QuotationsView />;
        case 'invoices':
          return <InvoicingBillingView />;
        case 'finance':
          return <FinanceExpensesView />;
        case 'purchases':
          return <PurchasesVendorsView />;
        case 'inventory':
          return <InventoryStockView />;
        case 'hr':
        case 'hr_payroll':
          return <HrPayrollView />;
        case 'projects':
          return <ProjectsTasksView />;
        case 'marketing':
          return <MarketingCampaignsView />;
        case 'telephony':
          return <ArohiCallView />;
        case 'support':
          return <SupportDeskView />;
        case 'documents':
          return <DocumentsVaultView />;
        case 'analytics':
          return <AnalyticsBiView />;
        case 'automation':
        case 'automations':
          return <WorkflowAutomationView />;
        case 'settings':
          return <SettingsTenantView />;
        default:
          return <DashboardOverview />;
      }
    };

    return (
      <BusinessErrorBoundary
        key={activeModule}
        moduleName={activeModule}
        onResetModule={() => {
          // Re-render or fallback
          setActiveModule('overview');
        }}
        onNavigateHome={() => setActiveModule('overview')}
      >
        {getView()}
      </BusinessErrorBoundary>
    );
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} transition-colors duration-200`}>
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-200">
        
        {/* Apple-grade Top Navigation Header */}
        <header className="h-14 sm:h-15 bg-white/80 dark:bg-[#121214]/80 border-b border-black/[0.06] dark:border-white/[0.08] sticky top-0 z-40 backdrop-blur-xl flex items-center justify-between px-3 sm:px-6 transition-colors">
          
          {/* Left: Brand Identity & Workspace Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs tracking-tight text-zinc-900 dark:text-white">AROHI ONE</span>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider bg-black/[0.05] dark:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.1] px-1.5 py-0.2 rounded-full">
                    BUSINESS OS
                  </span>
                </div>
                <p className="text-[9.5px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[130px] sm:max-w-xs">
                  {companyProfile.name} • {companyProfile.city}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Spotlight Search (⌘K) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full bg-white dark:bg-[#18181b] hover:bg-zinc-50 dark:hover:bg-[#202024] border border-black/[0.08] dark:border-white/[0.1] rounded-xl px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span className="text-[11.5px]">Search modules, invoices, leads or tasks...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-[9.5px] text-zinc-500 dark:text-zinc-400 font-mono font-medium">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Actions: Theme Switcher, Role Badge, Quick Dispatch, AI Copilot & Exit */}
          <div className="flex items-center gap-2">
            
            {/* Apple Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Light / Dark Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-90 duration-200" />
              )}
            </button>

            {/* Quick Create Button */}
            <button
              onClick={() => setQuickCreateType('invoice')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.1] text-zinc-800 dark:text-zinc-200 text-[11px] font-medium transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Quick Entry</span>
            </button>

            {/* AI Business Copilot Button */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-[11px] font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Copilot</span>
            </button>

            {/* Active Role Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] px-2.5 py-1 rounded-full text-[10.5px] text-zinc-700 dark:text-zinc-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{activeUserRole}</span>
            </div>

            {/* Return to Arohi Main App */}
            {onBackToMainApp && (
              <button
                onClick={onBackToMainApp}
                className="px-2.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer border border-black/[0.06] dark:border-white/[0.08]"
                title="Return to Arohi AI Main Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Main App</span>
              </button>
            )}

          </div>

        </header>

        {/* Main Body: Left Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Apple-grade Left Navigation Sidebar */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-[#FBFBFD]/90 dark:bg-[#121214]/90 border-r border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl flex flex-col justify-between overflow-y-auto transition-all duration-200 lg:translate-x-0 ${
              isMobileSidebarOpen ? 'translate-x-0 top-14' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div className="p-3.5 space-y-5">
              
              {/* Search on mobile */}
              <div className="lg:hidden">
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsCommandPaletteOpen(true);
                  }}
                  className="w-full bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] rounded-xl p-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px]">Spotlight Search...</span>
                </button>
              </div>

              {/* Navigation Groups */}
              {NAV_GROUPS.map((group) => (
                <div key={group.groupName} className="space-y-1">
                  <span className="text-[9.5px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider px-2.5">
                    {group.groupName}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeModule === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveModule(item.id);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11.5px] font-medium transition-all cursor-pointer ${
                            isActive
                              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-400 dark:text-zinc-500'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border ${
                              isActive
                                ? 'bg-white/20 text-white dark:bg-black/10 dark:text-zinc-900 border-transparent'
                                : 'bg-black/[0.04] dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400 border-black/[0.05] dark:border-white/[0.08]'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>

            {/* Sidebar Footer: Enterprise Compliance Badge */}
            <div className="p-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
                <span>GSTIN:</span>
                <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">{companyProfile.gstin.slice(0, 8)}...</span>
              </div>
              <div className="flex items-center gap-1 text-[9.5px] text-zinc-400 dark:text-zinc-500 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Unified Enterprise Business OS</span>
              </div>
            </div>
          </aside>

          {/* Main Content View Area */}
          <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-6 space-y-4">
            {activeModule !== 'overview' && (
              <div className="flex items-center justify-between bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] px-3.5 py-2 rounded-xl text-xs shadow-xs">
                <button
                  onClick={() => setActiveModule('overview')}
                  className="flex items-center gap-1.5 font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← All Modules & Tools Launcher</span>
                </button>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">
                  <span className="hidden sm:inline">Current Module:</span>
                  <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[10px] bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">
                    {activeModule.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )}
            {renderModuleView()}
          </main>

        </div>

        {/* Global Modals & Drawers */}
        <BusinessCopilotDrawer />
        <CommandPaletteModal />
        <QuickCreateModal />

        {/* Toast Notifications */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-[300] bg-zinc-900/95 dark:bg-white/95 text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 px-3.5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200 backdrop-blur-xl">
            <div className="w-6 h-6 rounded-xl bg-white/10 dark:bg-zinc-900/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            </div>
            <span className="text-[11.5px] font-semibold">{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default function BusinessOSShell({ onBackToMainApp }: BusinessOSShellProps) {
  return (
    <BusinessOSProvider>
      <InnerBusinessOS onBackToMainApp={onBackToMainApp} />
    </BusinessOSProvider>
  );
}
