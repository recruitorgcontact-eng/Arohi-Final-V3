export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  status: 'Active' | 'Suspended' | 'VIP';
  entrySource?: string; // App Entry Source (e.g., website, PWA)
  isSubscribed?: boolean;
  activePlanName?: string;
  planStartDate?: string;
  planExpiryDate?: string;
  planExpiryTimestamp?: number;
  totalPaidAmount?: number;
  lastPaymentMethod?: string;
  lastCouponUsed?: string;
  paymentStatus?: 'Verified' | 'Pending' | 'Expired' | 'Free Tier';
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
    resumeScans: number;
    mockInterviews: number;
  };
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
  invoiceNumber?: string;
  notes?: string;
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
    entrySource: 'Direct Admin Gateway',
    isSubscribed: true,
    activePlanName: 'Executive All-Access Pro (₹1,299/mo)',
    planStartDate: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryDate: new Date(NOW + 20 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryTimestamp: NOW + 20 * ONE_DAY,
    totalPaidAmount: 1299,
    lastPaymentMethod: 'UPI Scan (elitetraderjunoon@oksbi)',
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
      resumeScans: 28,
      mockInterviews: 12
    },
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
    entrySource: 'Google Search PWA',
    isSubscribed: true,
    activePlanName: 'Career & Resume Pro Plan (₹499/mo)',
    planStartDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryDate: new Date(NOW + 25 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryTimestamp: NOW + 25 * ONE_DAY,
    totalPaidAmount: 499,
    lastPaymentMethod: 'Razorpay Gateway (UPI)',
    lastCouponUsed: 'None (Direct Payment)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: false, path3: false, path4: false },
    takenCourses: ['SSC CGL Complete Tier-1', 'ATS Resume Optimization'],
    usage: { chatsWithArohi: 36, resumeScans: 8, mockInterviews: 3 },
    customizedSettings: { tutoringSlot: 'Daily Evening 7 PM', priorityLevel: 'High', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_003',
    email: 'amit.patel@outlook.com',
    name: 'Amit Patel',
    phone: '+91 98450 11223',
    role: 'MSME Business Owner',
    status: 'Active',
    entrySource: 'WhatsApp Referral Link',
    isSubscribed: true,
    activePlanName: 'Udyam Business Growth Suite (₹899/mo)',
    planStartDate: new Date(NOW - 2 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryDate: new Date(NOW + 28 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 11:15 AM',
    planExpiryTimestamp: NOW + 28 * ONE_DAY,
    totalPaidAmount: 0,
    lastPaymentMethod: 'Promo Coupon (100% Free)',
    lastCouponUsed: 'JUNOON (100% Off + 399 Coins)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: false, path2: false, path3: true, path4: false },
    takenCourses: ['PMEGP & Mudra Loan DPR Generator', 'GST Invoicing Masterclass'],
    usage: { chatsWithArohi: 45, resumeScans: 2, mockInterviews: 1 },
    customizedSettings: { tutoringSlot: 'Weekend Special', priorityLevel: 'High', assignedMentor: 'MSME Growth Consultant AI' }
  },
  {
    id: 'usr_sub_004',
    email: 'rahul.verma@yahoo.com',
    name: 'Rahul Verma',
    phone: '+91 97112 33445',
    role: 'Student & Tech Learner',
    status: 'Active',
    entrySource: 'YouTube Review Link',
    isSubscribed: true,
    activePlanName: 'Starter Plan (₹399/mo)',
    planStartDate: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryDate: new Date(NOW + 4 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryTimestamp: NOW + 4 * ONE_DAY,
    totalPaidAmount: 399,
    lastPaymentMethod: 'UPI Scan (PhonePe)',
    lastCouponUsed: 'None (Direct Payment)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: true, path3: false, path4: false },
    takenCourses: ['Python for Data Science', 'React Full-Stack Bootcamp'],
    usage: { chatsWithArohi: 68, resumeScans: 5, mockInterviews: 4 },
    customizedSettings: { tutoringSlot: 'Morning 9 AM', priorityLevel: 'Standard', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_005',
    email: 'ananya.das@gmail.com',
    name: 'Ananya Das',
    phone: '+91 93370 88990',
    role: 'Banking & Railway Aspirant',
    status: 'Active',
    entrySource: 'Instagram Ad Campaign',
    isSubscribed: true,
    activePlanName: 'Starter Plan (₹399/mo)',
    planStartDate: new Date(NOW - 1 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryDate: new Date(NOW + 29 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 04:20 PM',
    planExpiryTimestamp: NOW + 29 * ONE_DAY,
    totalPaidAmount: 0,
    lastPaymentMethod: 'Promo Coupon (100% Free)',
    lastCouponUsed: 'AROHI399 (100% Off + 399 Coins)',
    paymentStatus: 'Verified',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: true, path2: false, path3: false, path4: false },
    takenCourses: ['IBPS PO Quantitative Aptitude', 'Reasoning Fast-Track'],
    usage: { chatsWithArohi: 19, resumeScans: 2, mockInterviews: 2 },
    customizedSettings: { tutoringSlot: 'Flexible', priorityLevel: 'Standard', assignedMentor: 'Automated AI Guide' }
  },
  {
    id: 'usr_sub_006',
    email: 'deepak.nayak@rediffmail.com',
    name: 'Deepak Nayak',
    phone: '+91 94371 55667',
    role: 'Odisha Police Candidate',
    status: 'Active',
    entrySource: 'Direct Browser',
    isSubscribed: false,
    activePlanName: 'Starter Plan (₹399/mo) [Expired]',
    planStartDate: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryTimestamp: NOW - 5 * ONE_DAY,
    totalPaidAmount: 399,
    lastPaymentMethod: 'UPI Scan (Google Pay)',
    lastCouponUsed: 'None',
    paymentStatus: 'Expired',
    permissions: { canEditJobs: false, canApproveApps: false, canViewFinance: false },
    services: { path1: false, path2: false, path3: false, path4: false },
    takenCourses: ['Odisha Sub-Inspector Physical & Exam Guide'],
    usage: { chatsWithArohi: 52, resumeScans: 4, mockInterviews: 1 },
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
    date: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 10 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryDate: new Date(NOW + 20 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 10:00 AM',
    planExpiryTimestamp: NOW + 20 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'JUNOONVIP',
    couponDiscount: 0,
    cashbackReward: 1299,
    utr: 'SBI982410938472',
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
    date: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryDate: new Date(NOW + 25 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 02:30 PM',
    planExpiryTimestamp: NOW + 25 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'None (Direct Payment)',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'pay_rzp_8745192847',
    gatewayOrderId: 'ord_rzp_874519',
    invoiceNumber: 'INV-2026-0811-04',
    notes: 'Direct Razorpay NetBanking transaction'
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
    notes: 'Promo code JUNOON successfully unlocked Udyam Suite'
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
    date: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 26 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryDate: new Date(NOW + 4 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 09:45 AM',
    planExpiryTimestamp: NOW + 4 * ONE_DAY,
    status: 'Verified',
    couponUsed: 'None (Direct Payment)',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'UPI918273645019',
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
    date: new Date(NOW).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 06:10 AM',
    planExpiryDate: new Date(NOW + 30 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 06:10 AM',
    planExpiryTimestamp: NOW + 30 * ONE_DAY,
    status: 'Pending',
    couponUsed: 'None',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'SBI993847291834',
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
    date: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB'),
    planStartDate: new Date(NOW - 35 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryDate: new Date(NOW - 5 * ONE_DAY).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 01:00 PM',
    planExpiryTimestamp: NOW - 5 * ONE_DAY,
    status: 'Expired',
    couponUsed: 'None',
    couponDiscount: 0,
    cashbackReward: 0,
    utr: 'GPAY772819384019',
    gatewayOrderId: 'qr_pay_329876',
    invoiceNumber: 'INV-2026-0712-03',
    notes: 'Previous 30-day billing cycle completed and expired'
  }
];

export const INITIAL_CHAT_LOGS: ArohiChatLog[] = [];

