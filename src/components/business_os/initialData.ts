import {
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
  InboundVoiceAgent,
  SupportTicket,
  DocumentVaultItem,
  AutomationRule,
  RolePermission
} from './types';

export const INITIAL_COMPANY_PROFILE: CompanyProfile = {
  id: 'comp_arohi_101',
  name: 'Nexus Dynamics Pvt Ltd',
  legalName: 'Nexus Dynamics Technologies India Private Limited',
  tagline: 'Enterprise Cloud & Intelligent Automation Systems',
  gstin: '21AABCN9876E1Z5',
  pan: 'AABCN9876E',
  currency: 'INR',
  currencySymbol: '₹',
  email: 'admin@nexusdynamics.in',
  phone: '+91 80 4123 9900',
  website: 'https://nexusdynamics.in',
  address: 'Plot 42, Infocity Technology Corridor, Patia',
  city: 'Bhubaneswar',
  state: 'Odisha',
  pincode: '751024',
  country: 'India',
  fiscalYear: 'FY 2024 - 2025',
  industry: 'Enterprise Software & IT Services',
  employeeCount: 48
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead_01',
    name: 'Rajesh Mukherjee',
    company: 'Tata Advanced Systems',
    email: 'rajesh.m@tatasystems.co.in',
    phone: '+91 98310 44521',
    source: 'Website',
    status: 'proposal_sent',
    estimatedValue: 1250000,
    aiScore: 94,
    aiInsight: 'High intent: Downloaded enterprise whitepaper and requested customized GST billing demo.',
    assignedTo: 'Ananya Sharma',
    city: 'Kolkata',
    createdAt: '2025-02-14',
    lastContactedAt: '2025-02-23',
    tags: ['Enterprise', 'ERP Migration', 'Q1 Target'],
    notes: 'Needs multi-plant inventory & automated vendor PO approvals.'
  },
  {
    id: 'lead_02',
    name: 'Vikramaditya Rao',
    company: 'Deccan Aerospace Components',
    email: 'v.rao@deccanaero.com',
    phone: '+91 94401 88320',
    source: 'Arohi Call',
    status: 'negotiation',
    estimatedValue: 2400000,
    aiScore: 89,
    aiInsight: 'Telephony AI flagged positive sentiment on automated quote conversion and payroll integration.',
    assignedTo: 'Rohan Verma',
    city: 'Hyderabad',
    createdAt: '2025-02-08',
    lastContactedAt: '2025-02-22',
    tags: ['Aerospace', 'High Value', 'Custom SLA'],
    notes: 'Discussed 15% discount for upfront annual billing.'
  },
  {
    id: 'lead_03',
    name: 'Pooja Chawla',
    company: 'MedSecure Diagnostics',
    email: 'pooja.c@medsecure.in',
    phone: '+91 98112 55904',
    source: 'LinkedIn',
    status: 'qualified',
    estimatedValue: 680000,
    aiScore: 78,
    aiInsight: 'Healthcare compliance focus: Needs automated document vault and HIPAA/ISO audit trails.',
    assignedTo: 'Ananya Sharma',
    city: 'Gurugram',
    createdAt: '2025-02-18',
    lastContactedAt: '2025-02-24',
    tags: ['Healthcare', 'Compliance', 'SaaS'],
    notes: 'Demo scheduled for Friday 3:00 PM.'
  },
  {
    id: 'lead_04',
    name: 'Karthik Subramanian',
    company: 'Zenith Logistics Hub',
    email: 'karthik@zenithlogistics.in',
    phone: '+91 98450 12389',
    source: 'Referral',
    status: 'new',
    estimatedValue: 450000,
    aiScore: 65,
    aiInsight: 'Inbound referral from client Jindal Poly. Immediate requirement for GPS & warehouse stock tracking.',
    assignedTo: 'Amit Patel',
    city: 'Bengaluru',
    createdAt: '2025-02-24',
    lastContactedAt: '2025-02-24',
    tags: ['Logistics', 'Warehouse', 'New Inbound']
  },
  {
    id: 'lead_05',
    name: 'Meera Nambiar',
    company: 'Malabar Agro Exports',
    email: 'meera@malabaragro.com',
    phone: '+91 97441 77623',
    source: 'Campaign',
    status: 'won',
    estimatedValue: 890000,
    aiScore: 99,
    aiInsight: 'Converted from WhatsApp Broadcast Campaign. Signed 1-year Enterprise License.',
    assignedTo: 'Rohan Verma',
    city: 'Kochi',
    createdAt: '2025-01-20',
    lastContactedAt: '2025-02-20',
    tags: ['Export', 'Agro', 'Closed Deal']
  },
  {
    id: 'lead_06',
    name: 'Sunil Senapati',
    company: 'Utkal Steel & Minerals Ltd',
    email: 'sunil.s@utkalsteel.com',
    phone: '+91 94370 66112',
    source: 'Inbound',
    status: 'contacted',
    estimatedValue: 3500000,
    aiScore: 86,
    aiInsight: 'Heavy manufacturing prospect with 500+ employees. Requires Arohi Call telephony dialer.',
    assignedTo: 'Ananya Sharma',
    city: 'Rourkela',
    createdAt: '2025-02-12',
    lastContactedAt: '2025-02-21',
    tags: ['Manufacturing', 'Telephony', 'Odisha']
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Tata Advanced Systems Ltd',
    contactPerson: 'Rajesh Mukherjee',
    email: 'accounts@tatasystems.co.in',
    phone: '+91 98310 44521',
    industry: 'Defense & Aerospace',
    city: 'Kolkata',
    state: 'West Bengal',
    gstin: '19AAACT0123M1Z8',
    lifetimeValue: 4850000,
    outstandingBalance: 325000,
    healthScore: 92,
    status: 'active',
    activeContractsCount: 3,
    totalInvoicesCount: 14,
    joinedDate: '2023-04-15',
    assignedAccountManager: 'Ananya Sharma'
  },
  {
    id: 'cust_02',
    name: 'Malabar Agro Exports Pvt Ltd',
    contactPerson: 'Meera Nambiar',
    email: 'billing@malabaragro.com',
    phone: '+91 97441 77623',
    industry: 'Agri-Commodities Export',
    city: 'Kochi',
    state: 'Kerala',
    gstin: '32AABCM4567K1Z2',
    lifetimeValue: 1780000,
    outstandingBalance: 0,
    healthScore: 98,
    status: 'active',
    activeContractsCount: 2,
    totalInvoicesCount: 8,
    joinedDate: '2024-01-10',
    assignedAccountManager: 'Rohan Verma'
  },
  {
    id: 'cust_03',
    name: 'Apex Green Energy Solutions',
    contactPerson: 'Sanjay Deshmukh',
    email: 'sanjay.d@apexgreen.in',
    phone: '+91 98220 99411',
    industry: 'Solar & Renewable Tech',
    city: 'Pune',
    state: 'Maharashtra',
    gstin: '27AABCA3322D1Z9',
    lifetimeValue: 3120000,
    outstandingBalance: 480000,
    healthScore: 84,
    status: 'active',
    activeContractsCount: 1,
    totalInvoicesCount: 11,
    joinedDate: '2023-08-20',
    assignedAccountManager: 'Amit Patel'
  },
  {
    id: 'cust_04',
    name: 'Kalinga Healthcare & Hospitals',
    contactPerson: 'Dr. Debabrata Swain',
    email: 'procurement@kalingahospital.org',
    phone: '+91 94371 22890',
    industry: 'Hospital & Healthcare',
    city: 'Bhubaneswar',
    state: 'Odisha',
    gstin: '21AAACK1199P1Z3',
    lifetimeValue: 2650000,
    outstandingBalance: 120000,
    healthScore: 76,
    status: 'active',
    activeContractsCount: 2,
    totalInvoicesCount: 9,
    joinedDate: '2023-11-01',
    assignedAccountManager: 'Ananya Sharma'
  },
  {
    id: 'cust_05',
    name: 'Novaview Cloud Labs Inc',
    contactPerson: 'David Miller',
    email: 'dmiller@novaview.io',
    phone: '+1 415 890 2200',
    industry: 'AI & Data Infrastructure',
    city: 'San Francisco',
    state: 'California',
    lifetimeValue: 6200000,
    outstandingBalance: 0,
    healthScore: 96,
    status: 'active',
    activeContractsCount: 4,
    totalInvoicesCount: 18,
    joinedDate: '2023-01-15',
    assignedAccountManager: 'Rohan Verma'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal_01',
    title: 'Enterprise Business OS 50-Seat Rollout',
    customerName: 'Tata Advanced Systems Ltd',
    contactEmail: 'rajesh.m@tatasystems.co.in',
    value: 1250000,
    probability: 80,
    stage: 'proposal',
    expectedCloseDate: '2025-03-15',
    assignedRep: 'Ananya Sharma',
    priority: 'urgent',
    productLine: 'AROHI ONE Business OS Enterprise',
    notes: 'Quotation #Q-2025-089 sent. Legal reviewing Data Sovereignty clause.',
    lastUpdated: '2025-02-23'
  },
  {
    id: 'deal_02',
    title: 'Deccan Aerospace Supply Chain Suite',
    customerName: 'Deccan Aerospace Components',
    contactEmail: 'v.rao@deccanaero.com',
    value: 2400000,
    probability: 90,
    stage: 'negotiation',
    expectedCloseDate: '2025-03-05',
    assignedRep: 'Rohan Verma',
    priority: 'high',
    productLine: 'Inventory + PO + Quality Control ERP',
    notes: 'Final price approved by CFO. Signing contract next week.',
    lastUpdated: '2025-02-24'
  },
  {
    id: 'deal_03',
    title: 'Kalinga Hospital HMS & Telephony Agent',
    customerName: 'Kalinga Healthcare & Hospitals',
    contactEmail: 'procurement@kalingahospital.org',
    value: 950000,
    probability: 60,
    stage: 'discovery',
    expectedCloseDate: '2025-03-30',
    assignedRep: 'Ananya Sharma',
    priority: 'medium',
    productLine: 'Arohi Call Telephony + Support Desk',
    notes: 'Evaluating automated voice appointment confirmation in Odia & English.',
    lastUpdated: '2025-02-20'
  },
  {
    id: 'deal_04',
    title: 'MedSecure ISO Document & Audit Vault',
    customerName: 'MedSecure Diagnostics',
    contactEmail: 'pooja.c@medsecure.in',
    value: 680000,
    probability: 40,
    stage: 'lead_in',
    expectedCloseDate: '2025-04-10',
    assignedRep: 'Amit Patel',
    priority: 'medium',
    productLine: 'Digital Document Vault & e-Sign',
    notes: 'Scheduled discovery call for security architecture review.',
    lastUpdated: '2025-02-21'
  },
  {
    id: 'deal_05',
    title: 'Malabar Global Export ERP Renewal',
    customerName: 'Malabar Agro Exports Pvt Ltd',
    contactEmail: 'billing@malabaragro.com',
    value: 890000,
    probability: 100,
    stage: 'closed_won',
    expectedCloseDate: '2025-02-20',
    assignedRep: 'Rohan Verma',
    priority: 'high',
    productLine: 'AROHI ONE Annual Subscription',
    notes: 'PO received and payment confirmed. Onboarding in progress.',
    lastUpdated: '2025-02-20'
  }
];

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'quote_01',
    quoteNumber: 'Q-2025-089',
    customerId: 'cust_01',
    customerName: 'Tata Advanced Systems Ltd',
    customerEmail: 'rajesh.m@tatasystems.co.in',
    customerGstin: '19AAACT0123M1Z8',
    date: '2025-02-18',
    validUntil: '2025-03-20',
    items: [
      {
        id: 'qi_01',
        description: 'AROHI ONE Enterprise Annual License (50 Users)',
        sku: 'A1-ENT-50',
        quantity: 1,
        unitPrice: 850000,
        taxRate: 18,
        total: 1003000
      },
      {
        id: 'qi_02',
        description: 'Custom ERP Data Migration & On-Premises Gateway Setup',
        sku: 'SRV-MIG-01',
        quantity: 1,
        unitPrice: 210000,
        taxRate: 18,
        total: 247800
      }
    ],
    subtotal: 1060000,
    taxTotal: 190800,
    discountTotal: 0,
    grandTotal: 1250800,
    status: 'sent',
    terms: 'Payment terms: 50% advance upon PO, 50% on Go-Live. 1-Year 24/7 SLA included.',
    notes: 'GST applicable at 18% (IGST for Inter-state supply).',
    paymentTerms: 'Net 30 Days'
  },
  {
    id: 'quote_02',
    quoteNumber: 'Q-2025-090',
    customerId: 'cust_03',
    customerName: 'Apex Green Energy Solutions',
    customerEmail: 'sanjay.d@apexgreen.in',
    customerGstin: '27AABCA3322D1Z9',
    date: '2025-02-12',
    validUntil: '2025-03-12',
    items: [
      {
        id: 'qi_03',
        description: 'Arohi Call Telephony Module (10,000 Voice Minutes + Speech-to-Text)',
        sku: 'AC-TEL-10K',
        quantity: 2,
        unitPrice: 120000,
        taxRate: 18,
        total: 283200
      },
      {
        id: 'qi_04',
        description: 'Automated GST Billing & WhatsApp Invoice Broadcaster',
        sku: 'A1-FIN-GST',
        quantity: 1,
        unitPrice: 95000,
        taxRate: 18,
        total: 112100
      }
    ],
    subtotal: 335000,
    taxTotal: 60300,
    discountTotal: 15000,
    grandTotal: 380300,
    status: 'approved',
    terms: '100% upfront billing with priority telephony route.',
    notes: 'Approved by Sales Director.',
    paymentTerms: 'Immediate via NEFT/UPI'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_01',
    invoiceNumber: 'INV-2025-0042',
    customerName: 'Malabar Agro Exports Pvt Ltd',
    customerEmail: 'billing@malabaragro.com',
    customerPhone: '+91 97441 77623',
    customerGstin: '32AABCM4567K1Z2',
    issueDate: '2025-02-15',
    dueDate: '2025-03-01',
    items: [
      {
        id: 'ii_01',
        description: 'AROHI ONE Business OS Annual Subscription (25 Users)',
        quantity: 1,
        unitPrice: 754237,
        taxRate: 18,
        total: 890000
      }
    ],
    subtotal: 754237,
    cgst: 0,
    sgst: 0,
    igst: 135763,
    totalTax: 135763,
    grandTotal: 890000,
    amountPaid: 890000,
    status: 'paid',
    paymentMethod: 'NEFT/RTGS',
    paymentDate: '2025-02-19',
    notes: 'Payment received via HDFC Bank Ref: HDFCR5202502198821.',
    upiQrString: 'upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=890000&cu=INR'
  },
  {
    id: 'inv_02',
    invoiceNumber: 'INV-2025-0043',
    customerName: 'Tata Advanced Systems Ltd',
    customerEmail: 'accounts@tatasystems.co.in',
    customerPhone: '+91 98310 44521',
    customerGstin: '19AAACT0123M1Z8',
    issueDate: '2025-02-01',
    dueDate: '2025-02-20',
    items: [
      {
        id: 'ii_02',
        description: 'Phase 1 Cloud Telephony & AI Speech Engine Deployment',
        quantity: 1,
        unitPrice: 275424,
        taxRate: 18,
        total: 325000
      }
    ],
    subtotal: 275424,
    cgst: 0,
    sgst: 0,
    igst: 49576,
    totalTax: 49576,
    grandTotal: 325000,
    amountPaid: 0,
    status: 'overdue',
    notes: 'Payment reminder sent via Automated WhatsApp + Email on Feb 22.',
    upiQrString: 'upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=325000&cu=INR'
  },
  {
    id: 'inv_03',
    invoiceNumber: 'INV-2025-0044',
    customerName: 'Apex Green Energy Solutions',
    customerEmail: 'sanjay.d@apexgreen.in',
    customerPhone: '+91 98220 99411',
    customerGstin: '27AABCA3322D1Z9',
    issueDate: '2025-02-20',
    dueDate: '2025-03-07',
    items: [
      {
        id: 'ii_03',
        description: 'Q1 AI Automation Workflows & WhatsApp Campaign Broadcasting',
        quantity: 1,
        unitPrice: 406780,
        taxRate: 18,
        total: 480000
      }
    ],
    subtotal: 406780,
    cgst: 0,
    sgst: 0,
    igst: 73220,
    totalTax: 73220,
    grandTotal: 480000,
    amountPaid: 0,
    status: 'pending',
    notes: 'Invoice dispatched electronically. Due in 11 days.',
    upiQrString: 'upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=480000&cu=INR'
  },
  {
    id: 'inv_04',
    invoiceNumber: 'INV-2025-0045',
    customerName: 'Kalinga Healthcare & Hospitals',
    customerEmail: 'procurement@kalingahospital.org',
    customerPhone: '+91 94371 22890',
    customerGstin: '21AAACK1199P1Z3',
    issueDate: '2025-02-22',
    dueDate: '2025-03-10',
    items: [
      {
        id: 'ii_04',
        description: 'Intra-State Software Maintenance & Local Server Monitoring (Odisha)',
        quantity: 1,
        unitPrice: 101695,
        taxRate: 18,
        total: 120000
      }
    ],
    subtotal: 101695,
    cgst: 9152,
    sgst: 9152,
    igst: 0,
    totalTax: 18305,
    grandTotal: 120000,
    amountPaid: 0,
    status: 'pending',
    notes: 'Intra-state GST (9% CGST + 9% SGST).',
    upiQrString: 'upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=120000&cu=INR'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp_01',
    title: 'Google Cloud Platform & AI Vertex Compute',
    category: 'Software & Cloud Infrastructure',
    amount: 142500,
    date: '2025-02-10',
    paidBy: 'Ankit Mohapatra (CTO)',
    vendorName: 'Google Cloud India Pvt Ltd',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    receiptAttached: true,
    receiptName: 'gcp_invoice_feb2025.pdf',
    taxDeductible: true,
    gstClaimable: true
  },
  {
    id: 'exp_02',
    title: 'Infocity Office Floor Lease (Feb 2025)',
    category: 'Office Rent & Utilities',
    amount: 185000,
    date: '2025-02-01',
    paidBy: 'Priyanka Das (Finance)',
    vendorName: 'Infocity Towers Management Ltd',
    paymentMethod: 'Bank Transfer',
    status: 'approved',
    receiptAttached: true,
    receiptName: 'infocity_rent_feb.pdf',
    taxDeductible: true,
    gstClaimable: true
  },
  {
    id: 'exp_03',
    title: 'Arohi Telecom SIP Trunking & Voice Gateway',
    category: 'Software & Cloud Infrastructure',
    amount: 54000,
    date: '2025-02-14',
    paidBy: 'Rohan Verma',
    vendorName: 'Tata Communications Ltd',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    receiptAttached: true,
    receiptName: 'tata_sip_feb.pdf',
    taxDeductible: true,
    gstClaimable: true
  },
  {
    id: 'exp_04',
    title: 'Kolkata & Hyderabad Client Meeting Travel',
    category: 'Travel & Client Meetings',
    amount: 38400,
    date: '2025-02-21',
    paidBy: 'Ananya Sharma',
    vendorName: 'IndiGo Airlines & Oberoi Grand',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    receiptAttached: true,
    receiptName: 'indigo_flight_hotel.pdf',
    taxDeductible: true,
    gstClaimable: false
  },
  {
    id: 'exp_05',
    title: 'Team High-Performance MacBook Pros (x2)',
    category: 'Equipment & Hardware',
    amount: 320000,
    date: '2025-02-05',
    paidBy: 'Ankit Mohapatra',
    vendorName: 'Apple India Retail Pvt Ltd',
    paymentMethod: 'Corporate Card',
    status: 'approved',
    receiptAttached: true,
    receiptName: 'apple_tax_invoice.pdf',
    taxDeductible: true,
    gstClaimable: true
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'ven_01',
    name: 'Tata Communications Limited',
    category: 'Telecom & Cloud Connectivity',
    contactPerson: 'Manoj Pillai',
    email: 'enterprise@tatacommunications.com',
    phone: '+91 22 6659 7000',
    gstin: '27AAACT2727Q1Z1',
    city: 'Mumbai',
    rating: 4.9,
    totalBilled: 648000,
    paymentTerms: 'Net 30 Days',
    status: 'active'
  },
  {
    id: 'ven_02',
    name: 'Google Cloud India Pvt Ltd',
    category: 'Cloud Infrastructure & GPU Compute',
    contactPerson: 'Support Team',
    email: 'billing@google.com',
    phone: '+91 80 6721 8000',
    gstin: '29AAACG9876C1Z4',
    city: 'Bengaluru',
    rating: 5.0,
    totalBilled: 1420000,
    paymentTerms: 'Auto-Debit Card',
    status: 'active'
  },
  {
    id: 'ven_03',
    name: 'Infocity Towers Real Estate Ltd',
    category: 'Commercial Office Space',
    contactPerson: 'Bipin Behera',
    email: 'leases@infocity.in',
    phone: '+91 674 272 5500',
    gstin: '21AAACI5544K1Z8',
    city: 'Bhubaneswar',
    rating: 4.7,
    totalBilled: 2220000,
    paymentTerms: '1st of Every Month',
    status: 'active'
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po_01',
    poNumber: 'PO-2025-018',
    vendorId: 'ven_01',
    vendorName: 'Tata Communications Limited',
    orderDate: '2025-02-10',
    expectedDelivery: '2025-02-15',
    itemsCount: 2,
    totalAmount: 162000,
    status: 'received',
    approvalBy: 'Ankit Mohapatra (CTO)'
  },
  {
    id: 'po_02',
    poNumber: 'PO-2025-019',
    vendorId: 'ven_02',
    vendorName: 'Google Cloud India Pvt Ltd',
    orderDate: '2025-02-22',
    expectedDelivery: '2025-02-25',
    itemsCount: 4,
    totalAmount: 380000,
    status: 'approved',
    approvalBy: 'Soumya Ranjan (CEO)'
  }
];

export const INITIAL_INVENTORY: ProductInventoryItem[] = [
  {
    id: 'inv_item_01',
    sku: 'A1-ENT-LIC-01',
    name: 'AROHI ONE Business OS Core Enterprise License',
    category: 'Software Licenses',
    warehouseLocation: 'Cloud Master Tier 1 (AWS/GCP)',
    stockOnHand: 85,
    reorderLevel: 20,
    costPrice: 8500,
    sellingPrice: 24999,
    unit: 'Licenses',
    status: 'in_stock',
    lastRestockedDate: '2025-02-01'
  },
  {
    id: 'inv_item_02',
    sku: 'AC-VOICE-SIP-01',
    name: 'Arohi Call Telephony 10K Dedicated Minute Pack',
    category: 'Telecom Bundles',
    warehouseLocation: 'Tata SIP Gateway Cluster 4',
    stockOnHand: 14,
    reorderLevel: 10,
    costPrice: 42000,
    sellingPrice: 120000,
    unit: 'Units',
    status: 'low_stock',
    lastRestockedDate: '2025-02-10'
  },
  {
    id: 'inv_item_03',
    sku: 'HW-SEC-TOKEN-02',
    name: 'FIDO2 Hardware USB-C Security Auth Key',
    category: 'Hardware & Security',
    warehouseLocation: 'Bhubaneswar Central Store Room B',
    stockOnHand: 42,
    reorderLevel: 15,
    costPrice: 1800,
    sellingPrice: 3500,
    unit: 'Units',
    status: 'in_stock',
    lastRestockedDate: '2025-01-18'
  },
  {
    id: 'inv_item_04',
    sku: 'SRV-CUSTOM-INTEG',
    name: 'Dedicated Solutions Architect Integration (40 Hours)',
    category: 'Professional Services',
    warehouseLocation: 'Consulting Pool',
    stockOnHand: 6,
    reorderLevel: 5,
    costPrice: 60000,
    sellingPrice: 160000,
    unit: 'Boxes',
    status: 'in_stock',
    lastRestockedDate: '2025-02-15'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp_01',
    employeeCode: 'ND-001',
    name: 'Soumya Ranjan Nayak',
    role: 'Chief Executive Officer & Founder',
    department: 'Executive',
    email: 'soumya@nexusdynamics.in',
    phone: '+91 94370 11223',
    joinDate: '2022-01-10',
    monthlyCtc: 350000,
    attendancePercentage: 99,
    status: 'active',
    leaveBalance: 18,
    bankAccount: 'HDFC Bank - 50100499218821',
    pan: 'AABCN1234F'
  },
  {
    id: 'emp_02',
    employeeCode: 'ND-002',
    name: 'Ankit Mohapatra',
    role: 'Chief Technology Officer',
    department: 'Engineering',
    email: 'ankit@nexusdynamics.in',
    phone: '+91 98610 33445',
    joinDate: '2022-02-01',
    monthlyCtc: 280000,
    attendancePercentage: 97,
    status: 'active',
    leaveBalance: 14,
    bankAccount: 'ICICI Bank - 002105884920',
    pan: 'BCPMN5678G'
  },
  {
    id: 'emp_03',
    employeeCode: 'ND-003',
    name: 'Ananya Sharma',
    role: 'VP - Enterprise Sales & Partnerships',
    department: 'Sales & Growth',
    email: 'ananya@nexusdynamics.in',
    phone: '+91 98300 77889',
    joinDate: '2022-06-15',
    monthlyCtc: 220000,
    attendancePercentage: 96,
    status: 'active',
    leaveBalance: 12,
    bankAccount: 'Axis Bank - 91802004819283',
    pan: 'CDKPS9012H'
  },
  {
    id: 'emp_04',
    employeeCode: 'ND-004',
    name: 'Rohan Verma',
    role: 'Senior Solutions Architect',
    department: 'Engineering',
    email: 'rohan.v@nexusdynamics.in',
    phone: '+91 98101 22334',
    joinDate: '2023-03-01',
    monthlyCtc: 175000,
    attendancePercentage: 98,
    status: 'active',
    leaveBalance: 16,
    bankAccount: 'HDFC Bank - 50100612984711',
    pan: 'DEFRS3456J'
  },
  {
    id: 'emp_05',
    employeeCode: 'ND-005',
    name: 'Priyanka Das',
    role: 'Head of People & Operations',
    department: 'Human Resources',
    email: 'priyanka@nexusdynamics.in',
    phone: '+91 94372 88990',
    joinDate: '2023-05-10',
    monthlyCtc: 150000,
    attendancePercentage: 100,
    status: 'active',
    leaveBalance: 20,
    bankAccount: 'SBI - 30849201948',
    pan: 'EFGPS7890K'
  }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay_01',
    monthYear: 'February 2025',
    employeeId: 'emp_01',
    employeeName: 'Soumya Ranjan Nayak',
    employeeCode: 'ND-001',
    role: 'CEO & Founder',
    basicSalary: 175000,
    hra: 70000,
    allowances: 105000,
    grossSalary: 350000,
    pfDeduction: 1800,
    tdsDeduction: 45000,
    netPay: 303200,
    status: 'paid',
    paymentDate: '2025-02-28'
  },
  {
    id: 'pay_02',
    monthYear: 'February 2025',
    employeeId: 'emp_02',
    employeeName: 'Ankit Mohapatra',
    employeeCode: 'ND-002',
    role: 'Chief Technology Officer',
    basicSalary: 140000,
    hra: 56000,
    allowances: 84000,
    grossSalary: 280000,
    pfDeduction: 1800,
    tdsDeduction: 32000,
    netPay: 246200,
    status: 'paid',
    paymentDate: '2025-02-28'
  },
  {
    id: 'pay_03',
    monthYear: 'February 2025',
    employeeId: 'emp_03',
    employeeName: 'Ananya Sharma',
    employeeCode: 'ND-003',
    role: 'VP - Enterprise Sales',
    basicSalary: 110000,
    hra: 44000,
    allowances: 66000,
    grossSalary: 220000,
    pfDeduction: 1800,
    tdsDeduction: 22000,
    netPay: 196200,
    status: 'paid',
    paymentDate: '2025-02-28'
  },
  {
    id: 'pay_04',
    monthYear: 'February 2025',
    employeeId: 'emp_04',
    employeeName: 'Rohan Verma',
    employeeCode: 'ND-004',
    role: 'Senior Solutions Architect',
    basicSalary: 87500,
    hra: 35000,
    allowances: 52500,
    grossSalary: 175000,
    pfDeduction: 1800,
    tdsDeduction: 15000,
    netPay: 158200,
    status: 'paid',
    paymentDate: '2025-02-28'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_01',
    name: 'Tata Systems ERP & Telephony Migration',
    clientName: 'Tata Advanced Systems Ltd',
    budget: 1250000,
    spent: 420000,
    progressPercentage: 68,
    startDate: '2025-01-15',
    targetEndDate: '2025-03-31',
    status: 'in_progress',
    projectManager: 'Rohan Verma',
    teamSize: 6,
    tasksCount: 18,
    completedTasksCount: 12
  },
  {
    id: 'proj_02',
    name: 'Malabar Agro Supply Chain Automation',
    clientName: 'Malabar Agro Exports Pvt Ltd',
    budget: 890000,
    spent: 790000,
    progressPercentage: 92,
    startDate: '2024-12-01',
    targetEndDate: '2025-02-28',
    status: 'in_progress',
    projectManager: 'Ankit Mohapatra',
    teamSize: 4,
    tasksCount: 14,
    completedTasksCount: 13
  },
  {
    id: 'proj_03',
    name: 'Kalinga Hospital Multi-lingual Voice Bot',
    clientName: 'Kalinga Healthcare & Hospitals',
    budget: 950000,
    spent: 180000,
    progressPercentage: 35,
    startDate: '2025-02-01',
    targetEndDate: '2025-04-15',
    status: 'in_progress',
    projectManager: 'Rohan Verma',
    teamSize: 5,
    tasksCount: 16,
    completedTasksCount: 6
  }
];

export const INITIAL_PROJECT_TASKS: ProjectTask[] = [
  {
    id: 'task_01',
    projectId: 'proj_01',
    title: 'Configure GST HSN/SAC Code Master in ERP Core',
    description: 'Verify 18% and 5% tax slabs mapping with Odisha and West Bengal state branches.',
    assignedTo: 'Rohan Verma',
    dueDate: '2025-02-27',
    priority: 'urgent',
    status: 'completed',
    estimatedHours: 12,
    loggedHours: 11
  },
  {
    id: 'task_02',
    projectId: 'proj_01',
    title: 'Setup Arohi Call SIP Telephony Gateway for 50 Agents',
    description: 'Integrate Tata Communications trunk with automatic fallback to WebRTC.',
    assignedTo: 'Ankit Mohapatra',
    dueDate: '2025-03-02',
    priority: 'high',
    status: 'in_progress',
    estimatedHours: 24,
    loggedHours: 16
  },
  {
    id: 'task_03',
    projectId: 'proj_01',
    title: 'UAT Sign-off on Automated Quotation to Invoice Flow',
    description: 'Conduct live demo with Tata Systems procurement and finance heads.',
    assignedTo: 'Ananya Sharma',
    dueDate: '2025-03-08',
    priority: 'high',
    status: 'todo',
    estimatedHours: 8,
    loggedHours: 0
  },
  {
    id: 'task_04',
    projectId: 'proj_02',
    title: 'Barcode & QR Scanner Integration for Warehouse Pallets',
    description: 'Enable instant stock check-in with low-stock alerts triggered to Telegram & WhatsApp.',
    assignedTo: 'Rohan Verma',
    dueDate: '2025-02-26',
    priority: 'medium',
    status: 'review',
    estimatedHours: 16,
    loggedHours: 15
  }
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'camp_01',
    name: 'India MSME Business OS Q1 WhatsApp Blast',
    channel: 'WhatsApp Broadcast',
    budget: 45000,
    spent: 38000,
    targetAudience: '12,500 Manufacturing & IT Founders (Odisha, WB, MH, KA)',
    leadsGenerated: 142,
    conversions: 18,
    revenueAttributed: 1680000,
    roi: 44.2,
    status: 'active',
    startDate: '2025-02-01',
    endDate: '2025-02-28'
  },
  {
    id: 'camp_02',
    name: 'LinkedIn Enterprise CIO Leadership Outreach',
    channel: 'LinkedIn Ads',
    budget: 95000,
    spent: 72000,
    targetAudience: 'CTOs & Heads of Supply Chain in Tier 1 Indian Enterprises',
    leadsGenerated: 64,
    conversions: 8,
    revenueAttributed: 3200000,
    roi: 44.4,
    status: 'active',
    startDate: '2025-02-10',
    endDate: '2025-03-15'
  },
  {
    id: 'camp_03',
    name: 'GST Compliance & Automated Invoicing Webinar',
    channel: 'Email Newsletter',
    budget: 15000,
    spent: 14200,
    targetAudience: 'Chartered Accountants & CFO Network (28,000 subscribers)',
    leadsGenerated: 89,
    conversions: 12,
    revenueAttributed: 980000,
    roi: 69.0,
    status: 'completed',
    startDate: '2025-01-15',
    endDate: '2025-02-05'
  }
];

export const INITIAL_INBOUND_VOICE_AGENTS: InboundVoiceAgent[] = [
  {
    id: 'agent_reception_01',
    name: 'Pooja Sharma',
    role: 'Autonomous Front Desk Receptionist',
    department: 'Reception & Front Desk',
    language: 'Hinglish (Hindi + English)',
    voiceProfile: 'Arohi-Warm-Female',
    pitch: 1.0,
    speechRate: 1.0,
    greetingMessage: 'Namaste! Welcome to our enterprise. How may I assist you or direct your call today?',
    businessName: 'Apex Innovations & Enterprises',
    knowledgeBase: `Business Overview: Apex Innovations provides AI Enterprise Solutions, GST Billing software, and HRMS.
Operating Hours: Monday to Saturday, 9:30 AM to 6:30 PM IST.
Location: Sector 62, Noida, NCR & Indiranagar, Bengaluru.
Pricing Plans: Starter at ₹399/mo, Business OS at ₹1,999/mo, Enterprise Custom.
Common Queries:
- For Demo/Sales: Book 15-min discovery call or transfer to Sales.
- For Support: Collect ticket number or phone and assign high priority.
- For Billing/GST: Invoices are auto-sent with QR code payment.`,
    autoActions: {
      createCrmLead: true,
      sendWhatsAppNotification: true,
      bookCalendarAppointment: true,
      forwardToHumanOnUrgent: true,
    },
    forwardingPhoneNumber: '+91 98765 43210',
    assignedPhoneNumber: '+91 80 4712 9901',
    operatingHours: '24/7 Always Active',
    isActive: true,
    totalCallsAttended: 142,
    avgRating: 4.9,
    createdAt: '2025-01-15'
  },
  {
    id: 'agent_appointments_02',
    name: 'Dr. Consultation Frontdesk (Kavita)',
    role: 'Clinical & OPD Appointment Booker',
    department: 'Appointments & Booking',
    language: 'Hindi, English & Odia',
    voiceProfile: 'Arohi-Empathetic-Female',
    pitch: 1.05,
    speechRate: 0.95,
    greetingMessage: 'Namaste! Thank you for calling the Wellness & Diagnostics Care Desk. I can book your doctor consultation or lab test slot.',
    businessName: 'Kalinga Care & Multi-Specialty Clinic',
    knowledgeBase: `Clinic Hours: 8:00 AM to 8:00 PM Daily.
Doctors Available:
- Dr. S. N. Rath (Cardiologist, Mon-Fri 4 PM - 7 PM, Fee: ₹800)
- Dr. Meera Sen (General Physician & Diabetologist, Daily 10 AM - 2 PM, Fee: ₹500)
- Dr. Anupam Ray (Orthopedic & Joint Care, Tue/Thu/Sat 5 PM - 8 PM, Fee: ₹700)
Booking Procedure: Ask caller's name, preferred doctor, day, and time. Confirm slot and trigger SMS/WhatsApp confirmation.
Emergency: For emergency, dial 108 or transfer to emergency line immediately.`,
    autoActions: {
      createCrmLead: true,
      sendWhatsAppNotification: true,
      bookCalendarAppointment: true,
      forwardToHumanOnUrgent: true,
    },
    forwardingPhoneNumber: '+91 94371 99880',
    assignedPhoneNumber: '+91 80 4712 9902',
    operatingHours: 'Business Hours (9 AM - 7 PM)',
    isActive: true,
    totalCallsAttended: 288,
    avgRating: 4.95,
    createdAt: '2025-01-10'
  },
  {
    id: 'agent_sales_03',
    name: 'Rajesh Nair',
    role: 'Enterprise Sales & Deal Qualifier',
    department: 'Sales & Qualification',
    language: 'English & Hindi (Professional)',
    voiceProfile: 'Arohi-Executive-Male',
    pitch: 0.95,
    speechRate: 1.05,
    greetingMessage: 'Hello and welcome to Sales! I am Rajesh. Are you looking to upgrade your business software or explore our Enterprise tier?',
    businessName: 'Apex Innovations & Enterprises',
    knowledgeBase: `Enterprise Capabilities:
- Full ERP with 15 integrated modules (GST Invoicing, CRM, HR Payroll, Document Vault, Telephony).
- Multi-branch inventory tracking, custom GST e-Invoicing & e-Way bill sync.
- Pricing discount of 20% on annual multi-seat agreements.
- Implementation timeframe: 48 hours with dedicated support manager.
Sales Qualification Criteria:
- Number of users / employees.
- Current software used (Tally, Excel, Zoho, SAP).
- Timeline to deploy and budget range.`,
    autoActions: {
      createCrmLead: true,
      sendWhatsAppNotification: true,
      bookCalendarAppointment: true,
      forwardToHumanOnUrgent: true,
    },
    forwardingPhoneNumber: '+91 98450 77661',
    assignedPhoneNumber: '+91 80 4712 9903',
    operatingHours: '24/7 Always Active',
    isActive: true,
    totalCallsAttended: 96,
    avgRating: 4.85,
    createdAt: '2025-01-20'
  },
  {
    id: 'agent_support_04',
    name: 'Aditya Care',
    role: '24/7 Emergency & VIP Support Desk',
    department: 'Customer Support',
    language: '150+ Multilingual Auto-Detect',
    voiceProfile: 'Arohi-Energetic-Male',
    pitch: 1.0,
    speechRate: 1.0,
    greetingMessage: 'Hello! You have reached our 24/7 Priority Support Desk. Please share your issue or ticket number, and I will resolve it immediately.',
    businessName: 'Apex Innovations & Enterprises',
    knowledgeBase: `Support SLAs:
- Critical downtime: Escalated in 5 minutes with human on-call engineer.
- Billing / License inquiries: Instant license key lookup and verification.
- Password/Login resets: Self-service via registered email or instant OTP.
Escalation Protocol: If caller expresses high frustration or severity level 1 outage, trigger instant call transfer to +91 98765 00000.`,
    autoActions: {
      createCrmLead: false,
      sendWhatsAppNotification: true,
      bookCalendarAppointment: false,
      forwardToHumanOnUrgent: true,
    },
    forwardingPhoneNumber: '+91 98765 00000',
    assignedPhoneNumber: '+91 80 4712 9904',
    operatingHours: 'After Hours & Weekends',
    isActive: true,
    totalCallsAttended: 215,
    avgRating: 4.88,
    createdAt: '2025-01-05'
  }
];

export const INITIAL_TELEPHONY_CALLS: TelephonyCallRecord[] = [
  {
    id: 'call_01',
    callType: 'inbound',
    callerName: 'Rajesh Mukherjee',
    callerPhone: '+91 98310 44521',
    companyName: 'Tata Advanced Systems Ltd',
    durationSeconds: 384,
    timestamp: '2025-02-24 11:24 AM',
    agentName: 'Arohi AI Telephony Agent',
    sentiment: 'positive',
    callSummary: 'Client inquired about multi-warehouse GST tracking. Confirmed that AROHI ONE supports IGST/CGST split and automatic e-Way bill sync.',
    actionItems: [
      'Send Quotation #Q-2025-089 revision with 50-seat volume tier',
      'Schedule technical architect review on Friday 4 PM'
    ],
    audioDuration: '06:24',
    transcriptionSnippet: 'Customer: "Hello Arohi, does your Business OS allow multi-location GST returns with automatic reconciliation?" Arohi AI: "Yes Mr. Mukherjee! Our system auto-segregates CGST, SGST, and IGST..."',
    status: 'completed'
  },
  {
    id: 'call_02',
    callType: 'outbound',
    callerName: 'Vikramaditya Rao',
    callerPhone: '+91 94401 88320',
    companyName: 'Deccan Aerospace Components',
    durationSeconds: 512,
    timestamp: '2025-02-23 03:45 PM',
    agentName: 'Rohan Verma (Human + AI Assisted)',
    sentiment: 'positive',
    callSummary: 'Discussed annual payment milestone and vendor PO automated approval rules. Agreed to sign contract upon receiving board approval on March 1st.',
    actionItems: [
      'Draft digital contract on Arohi Document Vault',
      'Assign dedicated implementation engineer'
    ],
    audioDuration: '08:32',
    transcriptionSnippet: 'Agent: "We can provision your dedicated cloud cluster within 24 hours of contract execution." Customer: "Terrific, let us finalize the NDA and payment schedule today."',
    status: 'completed'
  },
  {
    id: 'call_03',
    callType: 'inbound',
    callerName: 'Dr. Debabrata Swain',
    callerPhone: '+91 94371 22890',
    companyName: 'Kalinga Healthcare & Hospitals',
    durationSeconds: 240,
    timestamp: '2025-02-24 09:15 AM',
    agentName: 'Arohi AI Telephony Agent',
    sentiment: 'urgent',
    callSummary: 'Requested assistance with automated voice appointment calls in Odia and Hindi for outpatient department.',
    actionItems: [
      'Deploy localized Odia voice model to sandbox environment',
      'Test 50 sample reminder triggers'
    ],
    audioDuration: '04:00',
    transcriptionSnippet: 'Customer: "Arohi namaskar, ama hospital appointment reminder Odia re voice call re heipariba ki?" Arohi AI: "Haa aagyan, Arohi AI Odia, Hindi ebong English re sahajare call kari pariba."',
    status: 'completed'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    ticketCode: 'TKT-8842',
    subject: 'Request to configure additional GSTIN for Kolkata Branch',
    customerName: 'Tata Advanced Systems Ltd',
    customerEmail: 'rajesh.m@tatasystems.co.in',
    priority: 'high',
    status: 'in_progress',
    slaDueInHours: 4,
    category: 'Billing',
    assignedAgent: 'Priyanka Das',
    createdAt: '2025-02-24 08:30 AM',
    aiSuggestedResolution: 'Navigate to Settings > Multi-Branch GSTIN > Click + Add Branch. Enter 19AAACT0123M1Z8 and select State: West Bengal.'
  },
  {
    id: 'tkt_02',
    ticketCode: 'TKT-8843',
    subject: 'Automated WhatsApp payment link not firing on overdue invoice',
    customerName: 'Apex Green Energy Solutions',
    customerEmail: 'sanjay.d@apexgreen.in',
    priority: 'medium',
    status: 'resolved',
    slaDueInHours: 12,
    category: 'Technical / Bug',
    assignedAgent: 'Rohan Verma',
    createdAt: '2025-02-22 02:15 PM',
    aiSuggestedResolution: 'Webhook payload was missing country code +91 prefix. Updated automation trigger to auto-format standard 10-digit Indian mobile numbers.'
  },
  {
    id: 'tkt_03',
    ticketCode: 'TKT-8844',
    subject: 'Need export of FY24 full General Ledger to Excel (.xlsx)',
    customerName: 'Malabar Agro Exports Pvt Ltd',
    customerEmail: 'billing@malabaragro.com',
    priority: 'low',
    status: 'open',
    slaDueInHours: 24,
    category: 'General',
    assignedAgent: 'Priyanka Das',
    createdAt: '2025-02-24 10:00 AM',
    aiSuggestedResolution: 'Go to Finance > Reports > Select Date Range 01-Apr-2023 to 31-Mar-2024 > Click "Export to Excel (.xlsx)".'
  }
];

export const INITIAL_DOCUMENTS: DocumentVaultItem[] = [
  {
    id: 'doc_01',
    title: 'Master Service Agreement (MSA) - Tata Advanced Systems',
    category: 'Contracts & MSAs',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    uploadedAt: '2025-02-18',
    uploadedBy: 'Ananya Sharma',
    isSigned: true,
    status: 'active',
    tags: ['Tata', 'Legal', 'Signed MSA', '50-Seats']
  },
  {
    id: 'doc_02',
    title: 'Deccan Aerospace Mutual NDA & IP Protection Deed',
    category: 'NDAs',
    fileSize: '1.1 MB',
    fileFormat: 'PDF',
    uploadedAt: '2025-02-20',
    uploadedBy: 'Soumya Ranjan Nayak',
    isSigned: true,
    status: 'active',
    tags: ['Deccan', 'NDA', 'Defense Grade']
  },
  {
    id: 'doc_03',
    title: 'Odisha GST Registration Certificate (Form GST REG-06)',
    category: 'Tax & Compliance',
    fileSize: '840 KB',
    fileFormat: 'PDF',
    uploadedAt: '2024-01-10',
    uploadedBy: 'Priyanka Das',
    isSigned: true,
    status: 'active',
    tags: ['Statutory', 'GST', 'Govt of India']
  },
  {
    id: 'doc_04',
    title: 'FY 2024-25 Employee Standard Code of Conduct & POSH Policy',
    category: 'HR Policies',
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    uploadedAt: '2024-04-01',
    uploadedBy: 'Priyanka Das',
    isSigned: true,
    status: 'active',
    tags: ['Internal', 'HR', 'Compliance']
  }
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto_01',
    name: 'Auto-Generate Invoice upon Deal Stage "Closed Won"',
    triggerEvent: 'When Deal is moved to "Closed Won"',
    actionSummary: 'Create GST Invoice draft, attach quote PDF, and send notification to Finance Team.',
    isActive: true,
    executionCount: 28,
    lastTriggered: '2025-02-20 04:30 PM',
    category: 'Sales & CRM'
  },
  {
    id: 'auto_02',
    name: 'Overdue Invoice WhatsApp & Email Gentle Follow-up',
    triggerEvent: 'When Invoice status is "Overdue" for 3+ Days',
    actionSummary: 'Send UPI QR code link and payment link via Arohi WhatsApp Business API.',
    isActive: true,
    executionCount: 54,
    lastTriggered: '2025-02-23 10:00 AM',
    category: 'Finance & Billing'
  },
  {
    id: 'auto_03',
    name: 'Instant AI Lead Scoring & Priority Route on Arohi Call',
    triggerEvent: 'When new Lead is created with Value > ₹10,00,000',
    actionSummary: 'Assign Lead to VP of Sales, alert mobile app, and schedule AI phone callback.',
    isActive: true,
    executionCount: 16,
    lastTriggered: '2025-02-24 11:25 AM',
    category: 'Sales & CRM'
  },
  {
    id: 'auto_04',
    name: 'Low Inventory Stock Auto-PO Generation',
    triggerEvent: 'When SKU Stock on Hand falls below Reorder Level',
    actionSummary: 'Create Draft Purchase Order to preferred vendor and notify Operations Manager.',
    isActive: true,
    executionCount: 9,
    lastTriggered: '2025-02-15 02:00 PM',
    category: 'Finance & Billing'
  }
];

export const INITIAL_ROLES: RolePermission[] = [
  {
    roleName: 'Super Admin',
    description: 'Full unrestricted access to all Business OS modules, settings, financials & API keys.',
    canEditFinance: true,
    canManageEmployees: true,
    canManageLeads: true,
    canApproveOrders: true,
    canAccessApi: true
  },
  {
    roleName: 'Sales Manager',
    description: 'Access to CRM, Leads, Deals Pipeline, Quotes & Marketing Campaigns.',
    canEditFinance: false,
    canManageEmployees: false,
    canManageLeads: true,
    canApproveOrders: false,
    canAccessApi: false
  },
  {
    roleName: 'Accountant',
    description: 'Access to Invoicing, Expenses, Profit & Loss, GST Reports & Vendor Bills.',
    canEditFinance: true,
    canManageEmployees: false,
    canManageLeads: false,
    canApproveOrders: true,
    canAccessApi: false
  },
  {
    roleName: 'HR Admin',
    description: 'Access to Employee Directory, Attendance, Leave Approvals & Payroll processing.',
    canEditFinance: false,
    canManageEmployees: true,
    canManageLeads: false,
    canApproveOrders: false,
    canAccessApi: false
  }
];
