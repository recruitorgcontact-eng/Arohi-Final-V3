export type BusinessOSModule =
  | 'overview'
  | 'brain_sync'
  | 'crm'
  | 'crm_leads'
  | 'customers'
  | 'pipeline'
  | 'quotations'
  | 'invoices'
  | 'finance'
  | 'purchases'
  | 'inventory'
  | 'hr'
  | 'hr_payroll'
  | 'projects'
  | 'marketing'
  | 'telephony'
  | 'support'
  | 'documents'
  | 'analytics'
  | 'automations'
  | 'automation'
  | 'settings';

export interface CompanyProfile {
  id: string;
  name: string;
  legalName: string;
  tagline: string;
  gstin: string;
  pan: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  currencySymbol: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  fiscalYear: string;
  industry: string;
  logoUrl?: string;
  employeeCount: number;
  bankAccount?: string;
  bankIfsc?: string;
  bankName?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: 'Website' | 'LinkedIn' | 'Referral' | 'Arohi Call' | 'Inbound' | 'Campaign';
  status: LeadStatus;
  estimatedValue: number;
  aiScore: number; // 0 - 100
  aiInsight: string;
  assignedTo: string;
  city: string;
  createdAt: string;
  lastContactedAt: string;
  tags: string[];
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
  state: string;
  gstin?: string;
  lifetimeValue: number;
  outstandingBalance: number;
  healthScore: number; // 0 - 100
  status: 'active' | 'at_risk' | 'churned' | 'onboarding';
  activeContractsCount: number;
  totalInvoicesCount: number;
  joinedDate: string;
  assignedAccountManager: string;
}

export type DealStage = 'lead_in' | 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface Deal {
  id: string;
  title: string;
  customerName: string;
  contactEmail: string;
  value: number;
  probability: number; // Percentage 0-100
  stage: DealStage;
  expectedCloseDate: string;
  assignedRep: string;
  priority: PriorityLevel;
  productLine: string;
  notes: string;
  lastUpdated: string;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 18 for 18% GST
  discountPercent?: number;
  total: number;
}

export type QuoteStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'converted_to_invoice';

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerGstin?: string;
  date: string;
  validUntil: string;
  items: QuoteLineItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  status: QuoteStatus;
  terms: string;
  notes: string;
  paymentTerms: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerGstin?: string;
  issueDate: string;
  dueDate: string;
  items: QuoteLineItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  grandTotal: number;
  amountPaid: number;
  status: InvoiceStatus;
  paymentMethod?: 'UPI' | 'NEFT/RTGS' | 'Razorpay' | 'Card' | 'Cheque';
  paymentDate?: string;
  notes: string;
  upiQrString?: string;
}

export type ExpenseCategory =
  | 'Salaries & Payroll'
  | 'Office Rent & Utilities'
  | 'Software & Cloud Infrastructure'
  | 'Marketing & Ads'
  | 'Travel & Client Meetings'
  | 'Equipment & Hardware'
  | 'Legal & Compliance'
  | 'Vendor Payments'
  | 'Miscellaneous';

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidBy: string;
  vendorName: string;
  vendor?: string;
  paymentMethod: 'Corporate Card' | 'Bank Transfer' | 'UPI' | 'Petty Cash';
  status: 'approved' | 'pending_approval' | 'reimbursed';
  receiptAttached: boolean;
  receiptName?: string;
  taxDeductible: boolean;
  gstClaimable: boolean;
  isGstClaimable?: boolean;
  gstin?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstin: string;
  city: string;
  state?: string;
  rating: number; // 1-5
  totalBilled: number;
  totalBilledAmount?: number;
  paymentTerms: string;
  status: 'active' | 'review' | 'inactive';
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  vendorGstin?: string;
  orderDate: string;
  date?: string;
  expectedDelivery: string;
  itemsCount: number;
  items?: any[];
  totalAmount: number;
  grandTotal?: number;
  status: 'draft' | 'approved' | 'dispatched' | 'received' | 'cancelled' | 'issued';
  approvalBy: string;
}

export interface ProductInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouseLocation: string;
  stockOnHand: number;
  reorderLevel: number;
  costPrice: number;
  sellingPrice: number;
  unitPrice?: number;
  unit: 'Units' | 'Kg' | 'Meters' | 'Licenses' | 'Hours' | 'Boxes';
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestockedDate: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  role: string;
  department: 'Engineering' | 'Sales & Growth' | 'Marketing' | 'Operations' | 'Finance' | 'Human Resources' | 'Executive';
  email: string;
  phone: string;
  joinDate: string;
  monthlyCtc: number;
  attendancePercentage: number;
  status: 'active' | 'on_leave' | 'probation' | 'notice_period';
  leaveBalance: number;
  bankAccount: string;
  pan: string;
}

export interface PayrollRecord {
  id: string;
  monthYear: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  role: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  grossSalary: number;
  pfDeduction: number;
  tdsDeduction: number;
  netPay: number;
  status: 'paid' | 'pending' | 'processing';
  paymentDate?: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: PriorityLevel;
  status: TaskStatus;
  estimatedHours?: number;
  loggedHours?: number;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  budget: number;
  spent: number;
  progressPercentage: number;
  startDate: string;
  targetEndDate: string;
  deadline?: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  projectManager: string;
  teamSize: number;
  tasksCount: number;
  completedTasksCount: number;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'WhatsApp Broadcast' | 'Email Newsletter' | 'LinkedIn Ads' | 'Google Search Ads' | 'SMS Blast' | 'whatsapp';
  budget?: number;
  spent?: number;
  spend?: number;
  targetAudience?: string;
  audienceCount?: number;
  leadsGenerated?: number;
  sentCount?: number;
  deliveredCount?: number;
  conversions?: number;
  conversionsCount?: number;
  revenueAttributed?: number;
  revenueGenerated?: number;
  roi?: number; // e.g. 3.4x
  status: 'active' | 'scheduled' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
}

export interface TelephonyCallRecord {
  id: string;
  callType: 'inbound' | 'outbound';
  callerName: string;
  callerPhone: string;
  companyName?: string;
  durationSeconds: number;
  timestamp: string;
  agentName: string; // Arohi AI Agent / Human Agent
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  callSummary: string;
  actionItems: string[];
  audioDuration: string;
  transcriptionSnippet: string;
  status: 'completed' | 'missed' | 'callback_requested';
}

export interface SupportTicket {
  id: string;
  ticketCode: string;
  subject: string;
  customerName: string;
  customerEmail?: string;
  priority: PriorityLevel;
  status: 'open' | 'in_progress' | 'waiting_on_client' | 'resolved' | 'closed';
  slaDueInHours?: number;
  slaDeadline?: string;
  category: 'Billing' | 'Technical / Bug' | 'Feature Request' | 'Onboarding' | 'General' | 'General Query';
  assignedAgent: string;
  createdAt?: string;
  aiSuggestedResolution?: string;
  aiSuggestedResponse?: string;
}

export interface DocumentVaultItem {
  id: string;
  title: string;
  category: 'Contracts & MSAs' | 'NDAs' | 'Tax & Compliance' | 'Invoices & Receipts' | 'HR Policies' | 'Company Deeds' | 'Legal & Agreements';
  fileSize: string;
  fileFormat?: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  fileType?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  isSigned: boolean;
  signedBy?: string;
  status?: 'active' | 'expired' | 'pending_signature';
  tags?: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerEvent: string;
  actionSummary?: string;
  action?: string;
  isActive: boolean;
  executionCount: number;
  lastTriggered: string;
  category?: 'Sales & CRM' | 'Finance & Billing' | 'HR & Alerts' | 'Support & SLA';
}

export interface RolePermission {
  roleName: 'Super Admin' | 'Sales Manager' | 'Accountant' | 'HR Admin' | 'Support Lead' | 'Staff';
  description: string;
  canEditFinance: boolean;
  canManageEmployees: boolean;
  canManageLeads: boolean;
  canApproveOrders: boolean;
  canAccessApi: boolean;
}

export type VoiceProfileId =
  | 'Arohi-Warm-Female'
  | 'Arohi-Executive-Male'
  | 'Arohi-Empathetic-Female'
  | 'Arohi-Energetic-Male';

export interface InboundVoiceAgent {
  id: string;
  name: string;
  role: string;
  department: 'Reception & Front Desk' | 'Sales & Qualification' | 'Appointments & Booking' | 'Customer Support' | 'VIP Concierge';
  language: string;
  voiceProfile: VoiceProfileId;
  pitch: number; // 0.8 - 1.2
  speechRate: number; // 0.8 - 1.3
  greetingMessage: string;
  businessName: string;
  systemPrompt?: string;
  knowledgeBase: string;
  autoActions: {
    createCrmLead: boolean;
    sendWhatsAppNotification: boolean;
    bookCalendarAppointment: boolean;
    forwardToHumanOnUrgent: boolean;
  };
  forwardingPhoneNumber?: string;
  assignedPhoneNumber?: string;
  operatingHours: '24/7 Always Active' | 'Business Hours (9 AM - 7 PM)' | 'After Hours & Weekends';
  isActive: boolean;
  totalCallsAttended: number;
  avgRating: number;
  createdAt: string;
}

export interface InboundCallTurnMessage {
  id: string;
  role: 'agent' | 'caller' | 'system';
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
  detectedIntent?: string;
}

export interface InboundCallSimulationSession {
  sessionId: string;
  agentId: string;
  callerName: string;
  callerPhone: string;
  companyName?: string;
  messages: InboundCallTurnMessage[];
  status: 'idle' | 'calling' | 'connected' | 'ended';
  startedAt?: string;
  durationSeconds: number;
  extractedLead?: Partial<Lead>;
  extractedAppointment?: {
    title: string;
    date: string;
    time: string;
    callerName: string;
    phone: string;
    notes?: string;
  };
  actionItemsTriggered: string[];
}
