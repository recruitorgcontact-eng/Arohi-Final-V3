export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'Active' | 'Suspended' | 'VIP';
  entrySource?: string; // App Entry Source (e.g., website, PWA)
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
  amount: number;
  planName: string;
  method: 'UPI' | 'GooglePlay' | 'NetBanking';
  date: string;
  status: 'Verified' | 'Pending' | 'Refunded';
  utr?: string;
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

export const INITIAL_ADMIN_USERS: AdminUser[] = [];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [];

export const INITIAL_CHAT_LOGS: ArohiChatLog[] = [];
