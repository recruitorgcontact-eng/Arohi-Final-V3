export interface PartnerBankDetails {
  upiId?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
}

export interface PartnerProfile {
  id: string;
  referralCode: string;
  name: string;
  email: string;
  phone?: string;
  pin: string; // 4-6 digit security PIN
  commissionRate: number; // e.g. 15 for 15%
  targetStudents: number; // e.g. 1000
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
  bankDetails: PartnerBankDetails;
  notes?: string;
}

export interface PartnerConversion {
  id: string;
  partnerCode: string;
  studentEmail: string;
  studentName?: string;
  studentPhone?: string;
  type: 'signup' | 'subscription' | 'exam_pass' | 'course' | 'resume';
  planName: string;
  amount: number; // Gross amount paid in INR
  commissionPercent: number; // 15
  commissionAmount: number; // 15% of amount
  status: 'credited' | 'settled' | 'refunded';
  timestamp: string;
  transactionId?: string;
}

export interface PartnerPayout {
  id: string;
  partnerCode: string;
  amount: number;
  requestedAt: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  payoutMethod: 'UPI' | 'Bank Transfer';
  payoutDetails: string;
  utr?: string;
  processedAt?: string;
  notes?: string;
}

export interface PartnerDashboardStats {
  partner: PartnerProfile;
  metrics: {
    totalStudents: number;
    targetStudents: number;
    targetProgressPercent: number;
    paidConversionsCount: number;
    totalGrossRevenue: number;
    totalCommissionEarned: number;
    unpaidCommissionBalance: number;
    totalPaidOut: number;
    averageOrderValue: number;
  };
  conversions: PartnerConversion[];
  payouts: PartnerPayout[];
}
