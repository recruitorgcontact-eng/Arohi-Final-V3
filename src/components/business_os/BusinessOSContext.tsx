import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessOSModule,
  CompanyProfile,
  Lead,
  Customer,
  Deal,
  Quotation,
  Invoice,
  Expense,
  Vendor,
  PurchaseOrder,
  ProductInventoryItem,
  Employee,
  PayrollRecord,
  Project,
  ProjectTask,
  MarketingCampaign,
  TelephonyCallRecord,
  SupportTicket,
  DocumentVaultItem,
  AutomationRule,
  RolePermission,
  DealStage,
  LeadStatus,
  InvoiceStatus,
  QuoteStatus
} from './types';
import {
  INITIAL_COMPANY_PROFILE,
  INITIAL_LEADS,
  INITIAL_CUSTOMERS,
  INITIAL_DEALS,
  INITIAL_QUOTATIONS,
  INITIAL_INVOICES,
  INITIAL_EXPENSES,
  INITIAL_VENDORS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_EMPLOYEES,
  INITIAL_PAYROLL,
  INITIAL_PROJECTS,
  INITIAL_PROJECT_TASKS,
  INITIAL_CAMPAIGNS,
  INITIAL_TELEPHONY_CALLS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_DOCUMENTS,
  INITIAL_AUTOMATIONS,
  INITIAL_ROLES
} from './initialData';

interface BusinessOSContextType {
  activeModule: BusinessOSModule;
  setActiveModule: (mod: BusinessOSModule) => void;
  companyProfile: CompanyProfile;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  
  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertLeadToDeal: (leadId: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (cust: Omit<Customer, 'id' | 'joinedDate'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Deals
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id' | 'lastUpdated'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  updateDealStage: (id: string, newStage: DealStage) => void;
  deleteDeal: (id: string) => void;

  // Quotations
  quotations: Quotation[];
  addQuotation: (quote: Omit<Quotation, 'id'>) => void;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;
  convertQuoteToInvoice: (quoteId: string) => void;
  deleteQuotation: (id: string) => void;

  // Invoices
  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  markInvoicePaid: (id: string, method?: 'UPI' | 'NEFT/RTGS' | 'Razorpay') => void;
  deleteInvoice: (id: string) => void;

  // Expenses
  expenses: Expense[];
  addExpense: (exp: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;

  // Vendors & PO
  vendors: Vendor[];
  addVendor: (v: Omit<Vendor, 'id'>) => void;
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void;
  updatePOStatus: (id: string, status: PurchaseOrder['status']) => void;

  // Inventory
  inventory: ProductInventoryItem[];
  addProduct: (item: Omit<ProductInventoryItem, 'id'>) => void;
  updateProductStock: (id: string, newStock: number) => void;

  // Employees & Payroll
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  payroll: PayrollRecord[];
  generateMonthlyPayroll: (monthYear: string) => void;

  // Projects & Tasks
  projects: Project[];
  tasks: ProjectTask[];
  addTask: (task: Omit<ProjectTask, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: ProjectTask['status']) => void;

  // Marketing
  campaigns: MarketingCampaign[];
  addCampaign: (camp: Omit<MarketingCampaign, 'id'>) => void;

  // Telephony
  calls: TelephonyCallRecord[];
  simulateInboundCall: (callerName: string, phone: string) => void;

  // Support
  tickets: SupportTicket[];
  addTicket: (tkt: Omit<SupportTicket, 'id' | 'createdAt'>) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;

  // Documents
  documents: DocumentVaultItem[];
  addDocument: (doc: Omit<DocumentVaultItem, 'id' | 'uploadedAt'>) => void;

  // Automations
  automations: AutomationRule[];
  toggleAutomation: (id: string) => void;

  // Roles & Security
  roles: RolePermission[];
  activeUserRole: string;
  setActiveUserRole: (role: string) => void;

  // Global KPIs & Stats
  metrics: {
    totalRevenue: number;
    monthlyRecurringRevenue: number;
    openDealsValue: number;
    pipelineCount: number;
    pendingInvoiceAmount: number;
    overdueInvoiceAmount: number;
    cashBalance: number;
    totalExpenses: number;
    activeEmployeesCount: number;
    lowStockItemsCount: number;
    openTicketsCount: number;
  };

  // UI state
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  quickCreateType: string | null;
  setQuickCreateType: (type: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetToSampleData: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const BusinessOSContext = createContext<BusinessOSContextType | undefined>(undefined);

const STORAGE_KEY = 'arohi_one_business_os_state_v1';

export const BusinessOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<BusinessOSModule>('overview');
  const [activeUserRole, setActiveUserRole] = useState<string>('Super Admin');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [quickCreateType, setQuickCreateType] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apple-grade Theme state: defaults to light (bright) theme first
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(`${STORAGE_KEY}_theme`, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      localStorage.setItem(`${STORAGE_KEY}_theme`, newTheme);
    } catch {
      // ignore
    }
  };

  // Load from local storage or fallback to defaults with deep merge safety
  const safeLoad = <T,>(keySuffix: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_${keySuffix}`);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback)) {
        return (Array.isArray(parsed) ? parsed : fallback) as unknown as T;
      }
      if (typeof fallback === 'object' && fallback !== null) {
        return { ...fallback, ...parsed };
      }
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  };

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => safeLoad('company', INITIAL_COMPANY_PROFILE));
  const [leads, setLeads] = useState<Lead[]>(() => safeLoad('leads', INITIAL_LEADS));
  const [customers, setCustomers] = useState<Customer[]>(() => safeLoad('customers', INITIAL_CUSTOMERS));
  const [deals, setDeals] = useState<Deal[]>(() => safeLoad('deals', INITIAL_DEALS));
  const [quotations, setQuotations] = useState<Quotation[]>(() => safeLoad('quotes', INITIAL_QUOTATIONS));
  const [invoices, setInvoices] = useState<Invoice[]>(() => safeLoad('invoices', INITIAL_INVOICES));
  const [expenses, setExpenses] = useState<Expense[]>(() => safeLoad('expenses', INITIAL_EXPENSES));
  const [vendors, setVendors] = useState<Vendor[]>(() => safeLoad('vendors', INITIAL_VENDORS));
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => safeLoad('purchase_orders', INITIAL_PURCHASE_ORDERS));
  const [inventory, setInventory] = useState<ProductInventoryItem[]>(() => safeLoad('inventory', INITIAL_INVENTORY));
  const [employees, setEmployees] = useState<Employee[]>(() => safeLoad('employees', INITIAL_EMPLOYEES));
  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => safeLoad('payroll', INITIAL_PAYROLL));
  const [projects, setProjects] = useState<Project[]>(() => safeLoad('projects', INITIAL_PROJECTS));
  const [tasks, setTasks] = useState<ProjectTask[]>(() => safeLoad('tasks', INITIAL_PROJECT_TASKS));
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(() => safeLoad('campaigns', INITIAL_CAMPAIGNS));
  const [calls, setCalls] = useState<TelephonyCallRecord[]>(() => safeLoad('calls', INITIAL_TELEPHONY_CALLS));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => safeLoad('tickets', INITIAL_SUPPORT_TICKETS));
  const [documents, setDocuments] = useState<DocumentVaultItem[]>(() => safeLoad('documents', INITIAL_DOCUMENTS));
  const [automations, setAutomations] = useState<AutomationRule[]>(() => safeLoad('automations', INITIAL_AUTOMATIONS));
  const [roles] = useState<RolePermission[]>(INITIAL_ROLES);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(companyProfile));
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
      localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
      localStorage.setItem(`${STORAGE_KEY}_deals`, JSON.stringify(deals));
      localStorage.setItem(`${STORAGE_KEY}_quotes`, JSON.stringify(quotations));
      localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
      localStorage.setItem(`${STORAGE_KEY}_expenses`, JSON.stringify(expenses));
      localStorage.setItem(`${STORAGE_KEY}_vendors`, JSON.stringify(vendors));
      localStorage.setItem(`${STORAGE_KEY}_purchase_orders`, JSON.stringify(purchaseOrders));
      localStorage.setItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventory));
      localStorage.setItem(`${STORAGE_KEY}_employees`, JSON.stringify(employees));
      localStorage.setItem(`${STORAGE_KEY}_payroll`, JSON.stringify(payroll));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
      localStorage.setItem(`${STORAGE_KEY}_calls`, JSON.stringify(calls));
      localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(tickets));
      localStorage.setItem(`${STORAGE_KEY}_documents`, JSON.stringify(documents));
      localStorage.setItem(`${STORAGE_KEY}_automations`, JSON.stringify(automations));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [
    companyProfile, leads, customers, deals, quotations, invoices, expenses,
    vendors, purchaseOrders, inventory, employees, payroll, projects, tasks,
    campaigns, calls, tickets, documents, automations
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateCompanyProfile = (updates: Partial<CompanyProfile>) => {
    setCompanyProfile(prev => ({ ...prev, ...updates }));
    showToast('Company profile & GST settings updated');
  };

  // Leads
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
    showToast(`Lead created: ${newLead.company}`);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    showToast('Lead details updated');
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Lead removed');
  };

  const convertLeadToDeal = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    // Create deal
    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      title: `${lead.company} - Expansion Deal`,
      customerName: lead.company,
      contactEmail: lead.email,
      value: lead.estimatedValue || 500000,
      probability: 70,
      stage: 'proposal',
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedRep: lead.assignedTo || 'Ananya Sharma',
      priority: 'high',
      productLine: 'AROHI ONE Business OS Enterprise',
      notes: `Converted directly from Lead ${lead.name}. ${lead.notes || ''}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setDeals(prev => [newDeal, ...prev]);
    updateLead(leadId, { status: 'won' });
    showToast(`Lead ${lead.company} converted to Pipeline Deal!`);
    setActiveModule('pipeline');
  };

  // Customers
  const addCustomer = (custData: Omit<Customer, 'id' | 'joinedDate'>) => {
    const newCust: Customer = {
      ...custData,
      id: `cust_${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [newCust, ...prev]);
    showToast(`Customer account added: ${newCust.name}`);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    showToast('Customer account updated');
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    showToast('Customer deleted');
  };

  // Deals
  const addDeal = (dealData: Omit<Deal, 'id' | 'lastUpdated'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal_${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setDeals(prev => [newDeal, ...prev]);
    showToast(`Deal created: ${newDeal.title}`);
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : d));
    showToast('Deal updated');
  };

  const updateDealStage = (id: string, newStage: DealStage) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage: newStage, lastUpdated: new Date().toISOString().split('T')[0] } : d));
    showToast(`Deal moved to ${newStage.replace('_', ' ').toUpperCase()}`);
  };

  const deleteDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    showToast('Deal removed');
  };

  // Quotations
  const addQuotation = (quoteData: Omit<Quotation, 'id'>) => {
    const newQuote: Quotation = {
      ...quoteData,
      id: `quote_${Date.now()}`
    };
    setQuotations(prev => [newQuote, ...prev]);
    showToast(`Quotation ${newQuote.quoteNumber} created`);
  };

  const updateQuotation = (id: string, updates: Partial<Quotation>) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
    showToast('Quotation updated');
  };

  const convertQuoteToInvoice = (quoteId: string) => {
    const quote = quotations.find(q => q.id === quoteId);
    if (!quote) return;

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 43).padStart(4, '0')}`,
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerGstin: quote.customerGstin,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: quote.items,
      subtotal: quote.subtotal,
      cgst: quote.taxTotal / 2,
      sgst: quote.taxTotal / 2,
      igst: 0,
      totalTax: quote.taxTotal,
      grandTotal: quote.grandTotal,
      amountPaid: 0,
      status: 'pending',
      notes: `Generated automatically from Quote ${quote.quoteNumber}`,
      upiQrString: `upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=${quote.grandTotal}&cu=INR`
    };

    setInvoices(prev => [newInvoice, ...prev]);
    updateQuotation(quoteId, { status: 'converted_to_invoice' });
    showToast(`Invoice ${newInvoice.invoiceNumber} created from Quote!`);
    setActiveModule('invoices');
  };

  const deleteQuotation = (id: string) => {
    setQuotations(prev => prev.filter(q => q.id !== id));
    showToast('Quotation removed');
  };

  // Invoices
  const addInvoice = (invData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invData,
      id: `inv_${Date.now()}`
    };
    setInvoices(prev => [newInvoice, ...prev]);
    showToast(`Invoice ${newInvoice.invoiceNumber} created`);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
    showToast('Invoice updated');
  };

  const markInvoicePaid = (id: string, method: 'UPI' | 'NEFT/RTGS' | 'Razorpay' = 'NEFT/RTGS') => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: 'paid',
          amountPaid: inv.grandTotal,
          paymentMethod: method,
          paymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return inv;
    }));
    showToast('Payment recorded successfully! GST ledger updated.');
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    showToast('Invoice removed');
  };

  // Expenses
  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp_${Date.now()}`
    };
    setExpenses(prev => [newExp, ...prev]);
    showToast(`Expense recorded: ₹${newExp.amount.toLocaleString()}`);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast('Expense entry deleted');
  };

  // Vendors & POs
  const addVendor = (vData: Omit<Vendor, 'id'>) => {
    const newV: Vendor = {
      ...vData,
      id: `ven_${Date.now()}`
    };
    setVendors(prev => [newV, ...prev]);
    showToast(`Vendor ${newV.name} added`);
  };

  const addPurchaseOrder = (poData: Omit<PurchaseOrder, 'id'>) => {
    const newPo: PurchaseOrder = {
      ...poData,
      id: `po_${Date.now()}`
    };
    setPurchaseOrders(prev => [newPo, ...prev]);
    showToast(`Purchase Order ${newPo.poNumber} issued`);
  };

  const updatePOStatus = (id: string, status: PurchaseOrder['status']) => {
    setPurchaseOrders(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    showToast(`PO status changed to ${status.toUpperCase()}`);
  };

  // Inventory
  const addProduct = (prodData: Omit<ProductInventoryItem, 'id'>) => {
    const newProd: ProductInventoryItem = {
      ...prodData,
      id: `inv_item_${Date.now()}`
    };
    setInventory(prev => [newProd, ...prev]);
    showToast(`Product SKU ${newProd.sku} registered`);
  };

  const updateProductStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(p => {
      if (p.id === id) {
        const status = newStock <= 0 ? 'out_of_stock' : newStock <= p.reorderLevel ? 'low_stock' : 'in_stock';
        return { ...p, stockOnHand: newStock, status };
      }
      return p;
    }));
    showToast('Stock quantity updated');
  };

  // Employees & Payroll
  const addEmployee = (empData: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp_${Date.now()}`
    };
    setEmployees(prev => [newEmp, ...prev]);
    showToast(`Employee ${newEmp.name} onboarded`);
  };

  const generateMonthlyPayroll = (monthYear: string) => {
    const newRecords: PayrollRecord[] = employees.map(emp => {
      const basic = Math.round(emp.monthlyCtc * 0.5);
      const hra = Math.round(emp.monthlyCtc * 0.2);
      const allowances = emp.monthlyCtc - (basic + hra);
      const pf = 1800;
      const tds = Math.round(emp.monthlyCtc * 0.1);
      const net = emp.monthlyCtc - (pf + tds);

      return {
        id: `pay_${emp.id}_${Date.now()}`,
        monthYear,
        employeeId: emp.id,
        employeeName: emp.name,
        employeeCode: emp.employeeCode,
        role: emp.role,
        basicSalary: basic,
        hra,
        allowances,
        grossSalary: emp.monthlyCtc,
        pfDeduction: pf,
        tdsDeduction: tds,
        netPay: net,
        status: 'paid',
        paymentDate: new Date().toISOString().split('T')[0]
      };
    });

    setPayroll(newRecords);
    showToast(`Automated Payroll processed for ${employees.length} employees for ${monthYear}!`);
  };

  // Tasks
  const addTask = (taskData: Omit<ProjectTask, 'id'>) => {
    const newTask: ProjectTask = {
      ...taskData,
      id: `task_${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task assigned: ${newTask.title}`);
  };

  const updateTaskStatus = (taskId: string, status: ProjectTask['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    showToast(`Task moved to ${status.replace('_', ' ').toUpperCase()}`);
  };

  // Marketing
  const addCampaign = (campData: Omit<MarketingCampaign, 'id'>) => {
    const newCamp: MarketingCampaign = {
      ...campData,
      id: `camp_${Date.now()}`
    };
    setCampaigns(prev => [newCamp, ...prev]);
    showToast(`Campaign ${newCamp.name} launched`);
  };

  // Telephony simulation
  const simulateInboundCall = (callerName: string, phone: string) => {
    const newCall: TelephonyCallRecord = {
      id: `call_${Date.now()}`,
      callType: 'inbound',
      callerName,
      callerPhone: phone,
      companyName: 'Incoming Enterprise Caller',
      durationSeconds: 195,
      timestamp: 'Just Now',
      agentName: 'Arohi AI Telephony Agent',
      sentiment: 'positive',
      callSummary: 'Live Telephony demonstration: AI handled multilingual caller query, explained Business OS capabilities, and captured lead requirements.',
      actionItems: ['Generate custom quotation', 'Send WhatsApp brochure'],
      audioDuration: '03:15',
      transcriptionSnippet: `Caller: "Hello, I am interested in Arohi Business OS." Arohi AI: "Welcome! I can assist you with CRM, GST billing, telephony, and HR payroll integration..."`,
      status: 'completed'
    };

    setCalls(prev => [newCall, ...prev]);
    showToast(`Arohi Call Telephony: New inbound call logged from ${callerName}`);
    setActiveModule('telephony');
  };

  // Support
  const addTicket = (tktData: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const newTkt: SupportTicket = {
      ...tktData,
      id: `tkt_${Date.now()}`,
      createdAt: 'Today'
    };
    setTickets(prev => [newTkt, ...prev]);
    showToast(`Support Ticket ${newTkt.ticketCode} logged`);
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    showToast(`Ticket status updated to ${status.toUpperCase()}`);
  };

  // Documents
  const addDocument = (docData: Omit<DocumentVaultItem, 'id' | 'uploadedAt'>) => {
    const newDoc: DocumentVaultItem = {
      ...docData,
      id: `doc_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast(`Document uploaded to secure vault: ${newDoc.title}`);
  };

  // Automations
  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
    showToast('Workflow automation status toggled');
  };

  // Reset to clean sample data
  const resetToSampleData = () => {
    setCompanyProfile(INITIAL_COMPANY_PROFILE);
    setLeads(INITIAL_LEADS);
    setCustomers(INITIAL_CUSTOMERS);
    setDeals(INITIAL_DEALS);
    setQuotations(INITIAL_QUOTATIONS);
    setInvoices(INITIAL_INVOICES);
    setExpenses(INITIAL_EXPENSES);
    setVendors(INITIAL_VENDORS);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setInventory(INITIAL_INVENTORY);
    setEmployees(INITIAL_EMPLOYEES);
    setPayroll(INITIAL_PAYROLL);
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_PROJECT_TASKS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setCalls(INITIAL_TELEPHONY_CALLS);
    setTickets(INITIAL_SUPPORT_TICKETS);
    setDocuments(INITIAL_DOCUMENTS);
    setAutomations(INITIAL_AUTOMATIONS);
    localStorage.clear();
    showToast('Business OS sample enterprise database reset successfully');
  };

  // Calculate live global metrics
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.grandTotal, 0);
  const pendingInvoiceAmount = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.grandTotal, 0);
  const overdueInvoiceAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.grandTotal, 0);
  const openDealsValue = deals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost').reduce((sum, d) => sum + d.value, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyRecurringRevenue = Math.round(totalRevenue / 3) || 890000;
  const cashBalance = 4250000 + totalRevenue - totalExpenses;
  const lowStockItemsCount = inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const openTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

  const metrics = {
    totalRevenue,
    monthlyRecurringRevenue,
    openDealsValue,
    pipelineCount: deals.length,
    pendingInvoiceAmount,
    overdueInvoiceAmount,
    cashBalance,
    totalExpenses,
    activeEmployeesCount: employees.filter(e => e.status === 'active').length,
    lowStockItemsCount,
    openTicketsCount
  };

  return (
    <BusinessOSContext.Provider
      value={{
        activeModule,
        setActiveModule,
        companyProfile,
        updateCompanyProfile,
        leads,
        addLead,
        updateLead,
        deleteLead,
        convertLeadToDeal,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        deals,
        addDeal,
        updateDeal,
        updateDealStage,
        deleteDeal,
        quotations,
        addQuotation,
        updateQuotation,
        convertQuoteToInvoice,
        deleteQuotation,
        invoices,
        addInvoice,
        updateInvoice,
        markInvoicePaid,
        deleteInvoice,
        expenses,
        addExpense,
        deleteExpense,
        vendors,
        addVendor,
        purchaseOrders,
        addPurchaseOrder,
        updatePOStatus,
        inventory,
        addProduct,
        updateProductStock,
        employees,
        addEmployee,
        payroll,
        generateMonthlyPayroll,
        projects,
        tasks,
        addTask,
        updateTaskStatus,
        campaigns,
        addCampaign,
        calls,
        simulateInboundCall,
        tickets,
        addTicket,
        updateTicketStatus,
        documents,
        addDocument,
        automations,
        toggleAutomation,
        roles,
        activeUserRole,
        setActiveUserRole,
        metrics,
        isCopilotOpen,
        setIsCopilotOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        quickCreateType,
        setQuickCreateType,
        toastMessage,
        showToast,
        resetToSampleData,
        theme,
        setTheme: handleSetTheme,
        toggleTheme
      }}
    >
      {children}
    </BusinessOSContext.Provider>
  );
};

export const useBusinessOS = () => {
  const context = useContext(BusinessOSContext);
  if (!context) {
    throw new Error('useBusinessOS must be used within a BusinessOSProvider');
  }
  return context;
};
