export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  status: 'Active' | 'Suspended' | 'VIP';
  customerType?: 'Business' | 'Govt Aspirant' | 'Student' | 'Executive' | 'VIP' | 'Free Tier';
  entrySource?: string; // App Entry Source (e.g., website, PWA)
  isSubscribed?: boolean;
  activePlanName?: string;
  planStartDate?: string;
  planExpiryDate?: string;
  planExpiryTimestamp?: number;
  totalPaidAmount?: number;
  lifetimeValue?: number; // Total real revenue across all transactions
  lastPaymentMethod?: string;
  lastPaymentMode?: string;
  lastCouponUsed?: string;
  paymentStatus?: 'Verified' | 'Pending' | 'Expired' | 'Free Tier';
  primaryPaymentMode?: 'UPI (GPay/PhonePe)' | 'Razorpay Card' | 'Razorpay NetBanking' | 'Manual QR / UTR' | 'Promo Coupon' | 'Free Tier';
  permissions: {
    canEditJobs: boolean;
    canApproveApps: boolean;
    canViewFinance: boolean;
  };
  services: {
    path1: boolean; // Career, Jobs & Resume Plan
    path2: boolean; // Economical Skill Upgrade Plan
    path3: boolean; // Udyam Business Plan
    path4: boolean; // Student Support Plan
  };
  takenCourses: string[];
  usage: {
    chatsWithArohi: number;
    voiceCallsCount?: number;
    resumeScans: number;
    mockInterviews: number;
    testsAttempted?: number;
    roadmapsCreated?: number;
  };
  arenaStats?: {
    coins: number;
    gems: number;
    registeredTournaments?: string[];
    classTrack?: string;
    targetSubject?: string;
    survivalHighScore?: number;
  };
  mission87?: {
    cadetId: string;
    name: string;
    state: string;
    district: string;
    primaryTrack: string;
    enrolledAt: string;
    milestonesCount?: number;
    verifiedProjectsCount?: number;
  };
  businessOs?: {
    companyName?: string;
    leadsCount?: number;
    customersCount?: number;
    invoicesCount?: number;
    lastSyncedAt?: string;
  };
  lastActive?: string;
  joinedDate?: string;
  customizedSettings: {
    tutoringSlot: string;
    priorityLevel: 'Standard' | 'High' | 'Critical';
    assignedMentor: string;
  };
}

export interface PaymentTransaction {
  id: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  amount: number; // Actual amount paid
  originalAmount?: number; // List / regular price before coupon/discount
  currency?: string; // 'INR' | 'USD'
  planName: string; // e.g. 'Starter Plan (₹399/mo)', 'Pro Career & Resume Plan (₹499/mo)', 'Business Udyam Suite (₹899/mo)'
  planId?: string; // 'path1' | 'path2' | 'path3' | 'path4' | 'all_access'
  method: 'UPI Scan' | 'Razorpay Gateway' | 'GooglePlay' | 'NetBanking' | 'Credit/Debit Card' | 'Promo Coupon (100% Free)' | 'Arohi Coins Cashback' | 'UPI' | string;
  realPaymentMode?: 'razorpay_card' | 'razorpay_upi' | 'razorpay_netbanking' | 'manual_upi_gpay' | 'manual_upi_phonepe' | 'manual_upi_paytm' | 'manual_upi_qr' | 'promo_coupon' | 'bank_neft';
  realModeLabel?: string; // e.g. 'Google Pay UPI (Direct QR)', 'Razorpay Visa Card', 'PhonePe UPI App', '100% Promo Coupon'
  customerType?: 'Business' | 'Govt Aspirant' | 'Student' | 'Executive' | 'VIP';
  date: string; // Formatted date e.g. '16/08/2026'
  planStartDate: string; // e.g. '16 Aug 2026, 11:30 AM'
  planExpiryDate: string; // e.g. '15 Sep 2026, 11:30 AM'
  planExpiryTimestamp?: number; // Epoch timestamp for live countdown calculation
  status: 'Verified' | 'Pending' | 'Refunded' | 'Expired';
  couponUsed?: string; // e.g. 'JUNOON', 'AROHI399', 'WELCOME100', 'PRO399', 'AROHI-VIP', or 'None / Direct'
  couponDiscount?: number; // Discount given e.g. ₹399
  cashbackReward?: number; // Coins given e.g. 399 coins
  utr?: string; // UTR or Payment Gateway Reference ID
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  isRazorpay?: boolean;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpayMethod?: string;
  razorpayVpa?: string;
  razorpayCard?: string;
  razorpayFee?: number;
  razorpayTax?: number;
  razorpayError?: string;
  upiVpa?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface UserActivityTelemetry {
  id: string;
  userId?: string;
  userEmail: string;
  userName: string;
  actionType: 'chat_query' | 'voice_call' | 'resume_analysis' | 'mocktest_attempt' | 'roadmap_generated' | 'job_application' | 'payment_made' | 'scheme_view' | 'navigation' | 'login';
  actionTitle: string;
  module: 'Arohi LLM Brain' | 'Voice Call AI' | 'CBT Mock Tests' | 'ATS Resume Suite' | 'Career Roadmap' | 'Finance & Billing' | 'Jobs & Schemes' | 'System Telemetry';
  inputSnippet: string; // The exact user prompt or action input
  outputSnippet?: string; // Short response summary or score
  metadata?: Record<string, any>;
  device: string;
  ipLocation: string;
  timestamp: string;
  timestampMs: number;
}

export interface MockTestSubmissionRecord {
  id: string;
  testId: string;
  testTitle: string;
  targetExam: string;
  userEmail: string;
  userName: string;
  userState: string;
  score: number;
  totalMarks: number;
  percentage: number;
  accuracyPercent: number;
  timeTakenFormatted: string;
  submittedAt: string;
  status: 'Completed' | 'Qualified' | 'Needs Practice';
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  percentileRank?: number;
}

export interface ArohiChatLog {
  id: string;
  userEmail: string;
  userName: string;
  topic: string;
  sentiment: 'Positive' | 'Neutral' | 'Urgent';
  messages: {
    sender: 'user' | 'arohi';
    text: string;
    time: string;
  }[];
}

const NOW = Date.now();
const ONE_DAY = 24 * 60 * 60 * 1000;

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_admin_001',
    email: 'elitetraderjunoon@gmail.com',
    name: 'Junoon Admin',
    phone: '+91 98765 43210',
    role: 'Super Administrator & Founder',
    status: 'VIP',
    customerType: 'VIP',
    entrySource: 'Direct Admin Gateway',
    isSubscribed: true,
    activePlanName: 'Executive All-Access Pro (₹1,299/mo)',
    planStartDate: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryDate: new Date(NOW + 20 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryTimestamp: NOW + 20 * ONE_DAY,
    totalPaidAmount: 1299,
    lifetimeValue: 3897,
    lastPaymentMethod: 'UPI Scan (elitetraderjunoon@oksbi)',
    lastPaymentMode: 'manual_upi_gpay',
    primaryPaymentMode: 'UPI (GPay/PhonePe)',
    lastCouponUsed: 'JUNOONVIP (100% Founder Access)',
    paymentStatus: 'Verified',
    permissions: {
      canEditJobs: true,
      canApproveApps: true,
      canViewFinance: true
    },
    services: {
      path1: true,
      path2: true,
      path3: true,
      path4: true
    },
    takenCourses: ['Full Stack AI Architecture', 'Odisha Civil Services Prelims', 'Executive Mentorship'],
    usage: {
      chatsWithArohi: 142,
      voiceCallsCount: 18,
      resumeScans: 28,
      mockInterviews: 12,
      testsAttempted: 14,
      roadmapsCreated: 8
    },
    lastActive: 'Just now',
    joinedDate: '01/01/2026',
    customizedSettings: {
      tutoringSlot: 'Bhubaneswar Command Center',
      priorityLevel: 'Critical',
      assignedMentor: 'Arohi AI Master Model'
    }
  },
  {
    id: 'usr_sub_002',
    email: 'priya.sharma@gmail.com',
    name: 'Priya Sharma',
    phone: '+91 91234 56780',
    role: 'Job Seeker / Aspirant',
    status: 'Active',
    customerType: 'Govt Aspirant',
    entrySource: 'Google Search PWA',
    isSubscribed: true,
    activePlanName: 'Career & Resume Pro Plan (₹499/mo)',
    planStartDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryDate: new Date(NOW + 25 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryTimestamp: NOW + 25 * ONE_DAY,
    totalPaidAmount: 499,
    lifetimeValue: 998,
    lastPaymentMethod: 'Razorpay Gateway (Card)',
    lastPaymentMode: 'razorpay_card',
    primaryPaymentMode: 'Razorpay Card',
    lastCouponUsed: 'None (Direct Payment)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: false, path3: false, path4: false },
    takenCourses: ['SSC CGL Complete Tier-1', 'ATS Resume Optimization'],
    usage: { chatsWithArohi: 36, voiceCallsCount: 4, resumeScans: 8, mockInterviews: 3, testsAttempted: 6, roadmapsCreated: 2 },
    lastActive: '12 mins ago',
    joinedDate: '15/07/2026',
    customizedSettings: { tutoringSlot: 'Daily Evening 7 PM', priorityLevel: 'High', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_003',
    email: 'amit.patel@outlook.com',
    name: 'Amit Patel',
    phone: '+91 98450 11223',
    role: 'MSME Business Owner',
    status: 'Active',
    customerType: 'Business',
    entrySource: 'WhatsApp Referral Link',
    isSubscribed: true,
    activePlanName: 'Udyam Business Growth Suite (₹899/mo)',
    planStartDate: new Date(NOW - 2 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryDate: new Date(NOW + 28 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryTimestamp: NOW + 28 * ONE_DAY,
    totalPaidAmount: 0,
    lifetimeValue: 899,
    lastPaymentMethod: 'Promo Coupon (100% Free)',
    lastPaymentMode: 'promo_coupon',
    primaryPaymentMode: 'Promo Coupon',
    lastCouponUsed: 'JUNOON (100% Off + 399 Coins)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: false, path2: false, path3: true, path4: false },
    takenCourses: ['PMEGP & Mudra Loan DPR Generator', 'GST Invoicing Masterclass'],
    usage: { chatsWithArohi: 45, voiceCallsCount: 6, resumeScans: 2, mockInterviews: 1, testsAttempted: 1, roadmapsCreated: 5 },
    lastActive: '1 hour ago',
    joinedDate: '02/08/2026',
    customizedSettings: { tutoringSlot: 'Weekend Special', priorityLevel: 'High', assignedMentor: 'MSME Growth Consultant AI' }
  },
  {
    id: 'usr_sub_004',
    email: 'rahul.verma@yahoo.com',
    name: 'Rahul Verma',
    phone: '+91 97112 33445',
    role: 'Student & Tech Learner',
    status: 'Active',
    customerType: 'Student',
    entrySource: 'YouTube Review Link',
    isSubscribed: true,
    activePlanName: 'Starter Plan (₹399/mo)',
    planStartDate: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryDate: new Date(NOW + 4 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryTimestamp: NOW + 4 * ONE_DAY,
    totalPaidAmount: 399,
    lifetimeValue: 798,
    lastPaymentMethod: 'UPI Scan (PhonePe App)',
    lastPaymentMode: 'manual_upi_phonepe',
    primaryPaymentMode: 'UPI (GPay/PhonePe)',
    lastCouponUsed: 'None (Direct Payment)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: true, path3: false, path4: false },
    takenCourses: ['Python for Data Science', 'React Full-Stack Bootcamp'],
    usage: { chatsWithArohi: 68, voiceCallsCount: 8, resumeScans: 5, mockInterviews: 4, testsAttempted: 8, roadmapsCreated: 3 },
    lastActive: '3 hours ago',
    joinedDate: '10/06/2026',
    customizedSettings: { tutoringSlot: 'Morning 9 AM', priorityLevel: 'Standard', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_005',
    email: 'ananya.das@gmail.com',
    name: 'Ananya Das',
    phone: '+91 93370 88990',
    role: 'Banking & Railway Aspirant',
    status: 'Active',
    customerType: 'Govt Aspirant',
    entrySource: 'Instagram Ad Campaign',
    isSubscribed: true,
    activePlanName: 'Starter Plan (₹399/mo)',
    planStartDate: new Date(NOW - 1 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryDate: new Date(NOW + 29 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryTimestamp: NOW + 29 * ONE_DAY,
    totalPaidAmount: 0,
    lifetimeValue: 399,
    lastPaymentMethod: 'Promo Coupon (100% Free)',
    lastPaymentMode: 'promo_coupon',
    primaryPaymentMode: 'Promo Coupon',
    lastCouponUsed: 'AROHI399 (100% Off + 399 Coins)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: false, path3: false, path4: false },
    takenCourses: ['IBPS PO Quantitative Aptitude', 'Reasoning Fast-Track'],
    usage: { chatsWithArohi: 19, voiceCallsCount: 1, resumeScans: 2, mockInterviews: 2, testsAttempted: 4, roadmapsCreated: 1 },
    lastActive: 'Yesterday',
    joinedDate: '14/08/2026',
    customizedSettings: { tutoringSlot: 'Flexible', priorityLevel: 'Standard', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_006',
    email: 'deepak.nayak@rediffmail.com',
    name: 'Deepak Nayak',
    phone: '+91 94371 55667',
    role: 'Odisha Police Candidate',
    status: 'Active',
    customerType: 'Govt Aspirant',
    entrySource: 'Direct Browser',
    isSubscribed: false,
    activePlanName: 'Starter Plan (₹399/mo) [Expired]',
    planStartDate: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryTimestamp: NOW - 5 * ONE_DAY,
    totalPaidAmount: 399,
    lifetimeValue: 399,
    lastPaymentMethod: 'UPI Scan (Google Pay)',
    lastPaymentMode: 'manual_upi_gpay',
    primaryPaymentMode: 'UPI (GPay/PhonePe)',
    lastCouponUsed: 'None',
    paymentStatus: 'Expired',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: false, path2: false, path3: false, path4: false },
    takenCourses: ['Odisha Sub-Inspector Physical & Exam Guide'],
    usage: { chatsWithArohi: 52, voiceCallsCount: 2, resumeScans: 4, mockInterviews: 1, testsAttempted: 5, roadmapsCreated: 2 },
    lastActive: '4 days ago',
    joinedDate: '05/07/2026',
    customizedSettings: { tutoringSlot: 'None Scheduled', priorityLevel: 'Standard', assignedMentor: 'Automated AI Guide' }
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN-984102',
    userEmail: 'elitetraderjunoon@gmail.com',
    userName: 'Junoon Admin',
    userPhone: '+91 98765 43210',
    amount: 1299,
    originalAmount: 1299,
    currency: 'INR',
    planName: 'Executive All-Access Pro (₹1,299/mo)',
    planId: 'all_access',
    method: 'UPI Scan',
    realPaymentMode: 'manual_upi_gpay',
    realModeLabel: 'Google Pay UPI (Direct Merchant QR)',
    customerType: 'VIP',
    date: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryDate: new Date(NOW + 20 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryTimestamp: NOW + 20 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'JUNOONVIP',
    couponDiscount: 0,
    cashbackReward: 1299,
    utr: 'SBI982410938472',
    upiVpa: 'elitetraderjunoon@oksbi',
    gatewayOrderId: 'ord_sbi_qr_9841',
    invoiceNumber: 'INV-2026-0806-01',
    notes: 'Super Admin All-Access Full Plan'
  },
  {
    id: 'TXN-874519',
    userEmail: 'priya.sharma@gmail.com',
    userName: 'Priya Sharma',
    userPhone: '+91 91234 56780',
    amount: 499,
    originalAmount: 499,
    currency: 'INR',
    planName: 'Career & Resume Pro Plan (₹499/mo)',
    planId: 'path1',
    method: 'Razorpay Gateway',
    realPaymentMode: 'razorpay_card',
    realModeLabel: 'Razorpay Visa Card (Ending 4242)',
    customerType: 'Govt Aspirant',
    date: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryDate: new Date(NOW + 25 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryTimestamp: NOW + 25 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'None (Direct Payment)',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'pay_rzp_8745192847',
    gatewayPaymentId: 'pay_rzp_8745192847',
    gatewayOrderId: 'ord_rzp_874519',
    razorpayPaymentId: 'pay_rzp_8745192847',
    razorpayMethod: 'card',
    razorpayCard: 'Visa **** 4242',
    razorpayFee: 9.98,
    razorpayTax: 1.80,
    invoiceNumber: 'INV-2026-0811-04',
    notes: 'Direct Razorpay Credit Card transaction'
  },
  {
    id: 'TXN-763291',
    userEmail: 'amit.patel@outlook.com',
    userName: 'Amit Patel',
    userPhone: '+91 98450 11223',
    amount: 0,
    originalAmount: 899,
    currency: 'INR',
    planName: 'Udyam Business Growth Suite (₹899/mo)',
    planId: 'path3',
    method: 'Promo Coupon (100% Free)',
    realPaymentMode: 'promo_coupon',
    realModeLabel: '100% Promo Coupon (JUNOON)',
    customerType: 'Business',
    date: new Date(NOW - 2 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 2 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryDate: new Date(NOW + 28 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryTimestamp: NOW + 28 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'JUNOON (100% Off + 399 Coins)',
    couponDiscount: 899,
    cashbackReward: 399,
    utr: 'CPN-JUNOON-763291',
    gatewayOrderId: 'promo_order_7632',
    invoiceNumber: 'INV-2026-0814-02',
    notes: 'Promo code JUNOON successfully unlocked Udyam Suite for MSME Business setup'
  },
  {
    id: 'TXN-652190',
    userEmail: 'rahul.verma@yahoo.com',
    userName: 'Rahul Verma',
    userPhone: '+91 97112 33445',
    amount: 399,
    originalAmount: 399,
    currency: 'INR',
    planName: 'Starter Plan (₹399/mo)',
    planId: 'path1',
    method: 'UPI Scan',
    realPaymentMode: 'manual_upi_phonepe',
    realModeLabel: 'PhonePe App (UPI QR Scan)',
    customerType: 'Student',
    date: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryDate: new Date(NOW + 4 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryTimestamp: NOW + 4 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'None (Direct Payment)',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'UPI918273645019',
    upiVpa: '9711233445@ybl',
    gatewayOrderId: 'qr_pay_652190',
    invoiceNumber: 'INV-2026-0721-08',
    notes: 'PhonePe UPI QR payment verified by admin'
  },
  {
    id: 'TXN-541098',
    userEmail: 'ananya.das@gmail.com',
    userName: 'Ananya Das',
    userPhone: '+91 93370 88990',
    amount: 0,
    originalAmount: 399,
    currency: 'INR',
    planName: 'Starter Plan (₹399/mo)',
    planId: 'path1',
    method: 'Promo Coupon (100% Free)',
    realPaymentMode: 'promo_coupon',
    realModeLabel: '100% Promo Coupon (AROHI399)',
    customerType: 'Govt Aspirant',
    date: new Date(NOW - 1 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 1 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryDate: new Date(NOW + 29 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryTimestamp: NOW + 29 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'AROHI399 (100% Off + 399 Coins)',
    couponDiscount: 399,
    cashbackReward: 399,
    utr: 'CPN-AROHI399-541098',
    gatewayOrderId: 'promo_order_5410',
    invoiceNumber: 'INV-2026-0815-09',
    notes: 'Promo code AROHI399 applied at onboarding'
  },
  {
    id: 'TXN-430987',
    userEmail: 'vikram.singh@gmail.com',
    userName: 'Vikram Singh',
    userPhone: '+91 99887 66554',
    amount: 399,
    originalAmount: 399,
    currency: 'INR',
    planName: 'Starter Plan (₹399/mo)',
    planId: 'path1',
    method: 'UPI Scan',
    realPaymentMode: 'manual_upi_paytm',
    realModeLabel: 'Paytm UPI (Scan & Pay)',
    customerType: 'Govt Aspirant',
    date: new Date(NOW).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 06:10 AM',
    planExpiryDate: new Date(NOW + 30 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 06:10 AM',
    planExpiryTimestamp: NOW + 30 * ONE_DAY,
    status: 'Pending',
    couponUsed: 'None',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'SBI993847291834',
    upiVpa: 'vikram.singh@paytm',
    gatewayOrderId: 'pending_upi_4309',
    invoiceNumber: 'INV-2026-0816-01',
    notes: 'Candidate submitted UPI UTR ref, awaiting admin approval'
  },
  {
    id: 'TXN-329876',
    userEmail: 'deepak.nayak@rediffmail.com',
    userName: 'Deepak Nayak',
    userPhone: '+91 94371 55667',
    amount: 399,
    originalAmount: 399,
    currency: 'INR',
    planName: 'Starter Plan (₹399/mo)',
    planId: 'path1',
    method: 'UPI Scan',
    realPaymentMode: 'manual_upi_gpay',
    realModeLabel: 'Google Pay UPI (Direct QR)',
    customerType: 'Govt Aspirant',
    date: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryTimestamp: NOW - 5 * ONE_DAY,
    status: 'Expired',
    couponUsed: 'None',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'GPAY772819384019',
    upiVpa: 'deepak.nayak@okaxis',
    gatewayOrderId: 'qr_pay_329876',
    invoiceNumber: 'INV-2026-0712-03',
    notes: 'Previous 30-day billing cycle completed and expired'
  }
];

export const INITIAL_USER_TELEMETRY: UserActivityTelemetry[] = [
  {
    id: 'tel_001',
    userEmail: 'priya.sharma@gmail.com',
    userName: 'Priya Sharma',
    actionType: 'chat_query',
    actionTitle: 'Asked Arohi AI for OSSC CGL Exam Strategy',
    module: 'Arohi LLM Brain',
    inputSnippet: 'How should I divide my daily 4 hours study schedule for OSSC CGL preliminary reasoning and Odia grammar?',
    outputSnippet: 'Arohi synthesized a structured 4-week time block with subject breakdowns and high-yield scoring topics.',
    device: 'Chrome 128 / Android 14 (OnePlus)',
    ipLocation: 'Bhubaneswar, Odisha (Jio 5G)',
    timestamp: '5 mins ago',
    timestampMs: NOW - 5 * 60 * 1000
  },
  {
    id: 'tel_002',
    userEmail: 'priya.sharma@gmail.com',
    userName: 'Priya Sharma',
    actionType: 'mocktest_attempt',
    actionTitle: 'Completed OSSC CGL Tier-1 Mock Test',
    module: 'CBT Mock Tests',
    inputSnippet: 'Attempted 150 questions across General Awareness, Reasoning, and Quantitative Aptitude.',
    outputSnippet: 'Scored 118.5/150 (79% Accuracy, 94th Percentile All-India).',
    device: 'Chrome 128 / Android 14 (OnePlus)',
    ipLocation: 'Bhubaneswar, Odisha (Jio 5G)',
    timestamp: '18 mins ago',
    timestampMs: NOW - 18 * 60 * 1000
  },
  {
    id: 'tel_003',
    userEmail: 'amit.patel@outlook.com',
    userName: 'Amit Patel',
    actionType: 'roadmap_generated',
    actionTitle: 'Generated PMEGP Project Report (DPR)',
    module: 'Career Roadmap',
    inputSnippet: 'Generated ₹25 Lakhs Dairy & Bio-Fertilizer Food Processing Project DPR for PMEGP 35% Subsidy.',
    outputSnippet: 'Detailed 6-page financial projections, machinery costings, and bank balance sheets compiled.',
    device: 'Edge 127 / Windows 11',
    ipLocation: 'Cuttack, Odisha (Airtel Fiber)',
    timestamp: '42 mins ago',
    timestampMs: NOW - 42 * 60 * 1000
  },
  {
    id: 'tel_004',
    userEmail: 'amit.patel@outlook.com',
    userName: 'Amit Patel',
    actionType: 'voice_call',
    actionTitle: 'Hands-free Voice Call with Arohi',
    module: 'Voice Call AI',
    inputSnippet: 'Discussed GST registration exemption thresholds for agro-allied startup companies in Odisha.',
    outputSnippet: 'Voice call completed in 4 mins 32 secs with zero dropped audio packets.',
    device: 'Safari / iPhone 15 Pro',
    ipLocation: 'Cuttack, Odisha (Airtel Fiber)',
    timestamp: '1 hour ago',
    timestampMs: NOW - 60 * 60 * 1000
  },
  {
    id: 'tel_005',
    userEmail: 'rahul.verma@yahoo.com',
    userName: 'Rahul Verma',
    actionType: 'resume_analysis',
    actionTitle: 'Analyzed & Tailored ATS Resume',
    module: 'ATS Resume Suite',
    inputSnippet: 'Uploaded resume.pdf targeting Full Stack React & Node.js Developer roles.',
    outputSnippet: 'ATS Score increased from 62% to 94% with optimized action verbs and quantified impact metrics.',
    device: 'Chrome 128 / macOS Sonoma',
    ipLocation: 'Rourkela, Odisha (BSNL FTTH)',
    timestamp: '2 hours ago',
    timestampMs: NOW - 120 * 60 * 1000
  },
  {
    id: 'tel_006',
    userEmail: 'ananya.das@gmail.com',
    userName: 'Ananya Das',
    actionType: 'mocktest_attempt',
    actionTitle: 'Attempted IBPS PO Quant Sectional Test',
    module: 'CBT Mock Tests',
    inputSnippet: 'Submitted 35 questions on Data Interpretation, Quadratic Equations, and Arithmetic Series.',
    outputSnippet: 'Scored 28.75/35 (82.1% Accuracy, 91st Percentile).',
    device: 'Chrome 128 / Windows 10',
    ipLocation: 'Sambalpur, Odisha (Jio Fiber)',
    timestamp: '3 hours ago',
    timestampMs: NOW - 180 * 60 * 1000
  },
  {
    id: 'tel_007',
    userEmail: 'priya.sharma@gmail.com',
    userName: 'Priya Sharma',
    actionType: 'payment_made',
    actionTitle: 'Renewed Career & Resume Pro Plan',
    module: 'Finance & Billing',
    inputSnippet: 'Selected ₹499/mo Career Pro Plan via Razorpay Live Gateway (Visa Card).',
    outputSnippet: 'Payment captured successfully. Tax invoice INV-2026-0811-04 generated.',
    device: 'Chrome 128 / Android 14',
    ipLocation: 'Bhubaneswar, Odisha',
    timestamp: '5 days ago',
    timestampMs: NOW - 5 * ONE_DAY
  },
  {
    id: 'tel_008',
    userEmail: 'elitetraderjunoon@gmail.com',
    userName: 'Junoon Admin',
    actionType: 'navigation',
    actionTitle: 'Accessed Super Admin Executive Workspace',
    module: 'System Telemetry',
    inputSnippet: 'Authorized login to Arohi AI Master Command Center with hardware security token.',
    outputSnippet: 'Active session confirmed with VIP multi-channel permissions.',
    device: 'Chrome 128 / Windows 11 Pro',
    ipLocation: 'Bhubaneswar Command Center (Dedicated IP)',
    timestamp: 'Just now',
    timestampMs: NOW - 1000
  }
];

export const INITIAL_MOCKTEST_SUBMISSIONS: MockTestSubmissionRecord[] = [
  {
    id: 'sub_cbt_001',
    testId: 'ossc_cgl_tier1_full',
    testTitle: 'OSSC CGL Tier-1 Full-Length Mock Test (2026)',
    targetExam: 'OSSC CGL',
    userEmail: 'priya.sharma@gmail.com',
    userName: 'Priya Sharma',
    userState: 'Odisha',
    score: 118.5,
    totalMarks: 150,
    percentage: 79,
    accuracyPercent: 88.4,
    timeTakenFormatted: '104 mins 12 secs',
    submittedAt: 'Today, 06:15 AM',
    status: 'Qualified',
    correctAnswers: 124,
    wrongAnswers: 22,
    unattempted: 4,
    percentileRank: 96.8
  },
  {
    id: 'sub_cbt_002',
    testId: 'ibps_po_prelims_01',
    testTitle: 'IBPS PO Prelims All-India Live Mock (Quant + Reasoning)',
    targetExam: 'Banking (IBPS PO)',
    userEmail: 'ananya.das@gmail.com',
    userName: 'Ananya Das',
    userState: 'Odisha',
    score: 74.25,
    totalMarks: 100,
    percentage: 74.25,
    accuracyPercent: 85.2,
    timeTakenFormatted: '58 mins 45 secs',
    submittedAt: 'Today, 04:30 AM',
    status: 'Qualified',
    correctAnswers: 79,
    wrongAnswers: 19,
    unattempted: 2,
    percentileRank: 92.4
  },
  {
    id: 'sub_cbt_003',
    testId: 'odisha_police_si_paper1',
    testTitle: 'Odisha Police SI Paper-1 (Odia + English + GK)',
    targetExam: 'Odisha Police SI',
    userEmail: 'deepak.nayak@rediffmail.com',
    userName: 'Deepak Nayak',
    userState: 'Odisha',
    score: 62.0,
    totalMarks: 100,
    percentage: 62,
    accuracyPercent: 71.5,
    timeTakenFormatted: '85 mins 10 secs',
    submittedAt: 'Yesterday, 08:20 PM',
    status: 'Needs Practice',
    correctAnswers: 68,
    wrongAnswers: 24,
    unattempted: 8,
    percentileRank: 68.2
  },
  {
    id: 'sub_cbt_004',
    testId: 'ssc_cgl_tier1_2026',
    testTitle: 'SSC CGL Tier-1 All-India Mock Test Series',
    targetExam: 'SSC CGL',
    userEmail: 'rahul.verma@yahoo.com',
    userName: 'Rahul Verma',
    userState: 'Odisha',
    score: 142.0,
    totalMarks: 200,
    percentage: 71,
    accuracyPercent: 81.3,
    timeTakenFormatted: '59 mins 30 secs',
    submittedAt: '18 Aug 2026, 11:15 AM',
    status: 'Qualified',
    correctAnswers: 76,
    wrongAnswers: 20,
    unattempted: 4,
    percentileRank: 88.5
  }
];

export const INITIAL_CHAT_LOGS: ArohiChatLog[] = [];
