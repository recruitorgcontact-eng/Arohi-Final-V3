export type ConnectorCategory = 
  | 'all'
  | 'workspace'
  | 'developer'
  | 'communication'
  | 'database'
  | 'finance'
  | 'sovereign';

export interface ConnectorItem {
  id: string;
  name: string;
  category: ConnectorCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  iconBg: string;
  iconColor: string;
  emoji: string;
  brandColor: string;
  popular?: boolean;
  status: 'connected' | 'available' | 'beta';
  authType: 'oauth' | 'api_key' | 'token' | 'native';
  privacyLevel: 'Read-Only' | 'Zero Retention' | 'User-Authorized' | 'Full Sync';
  scopes: string[];
  capabilities: string[];
  samplePrompts: {
    title: string;
    prompt: string;
    tag: string;
  }[];
  authDocs?: string;
  partnerInfo?: string;
}

export const AROHI_CONNECTORS: ConnectorItem[] = [
  // 1. Google Workspace & Drive
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'workspace',
    categoryLabel: 'Workspace & Docs',
    tagline: 'Search, read & ingest Docs, Sheets, Slides and PDFs',
    description: 'Connect Arohi directly to your personal or Google Workspace Drive to read documents, summarize PDFs, extract tabular sheets, and cross-reference multiple files.',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-500',
    emoji: '📁',
    brandColor: '#F4B400',
    popular: true,
    status: 'connected',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['drive.readonly', 'drive.metadata.readonly'],
    capabilities: [
      'Full-text semantic search across Google Drive files',
      'Instant extraction and summarization of PDF, DOCX, and PPTX files',
      'Multi-document cross-referencing in active Arohi chats'
    ],
    samplePrompts: [
      {
        title: 'Search & Summarize Drive Document',
        prompt: 'Arohi, search my Google Drive for the latest "Q3 Financial Report.pdf" and provide a 5-bullet summary with key growth metrics.',
        tag: 'Drive Search'
      },
      {
        title: 'Cross-Reference Client Contracts',
        prompt: 'Arohi, read the 2 client agreements in my "Contracts 2026" folder on Google Drive and compare their payment terms side by side.',
        tag: 'Contract Analysis'
      }
    ]
  },

  // 2. Gmail
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'communication',
    categoryLabel: 'Communication',
    tagline: 'Read inbox, summarize emails & draft executive responses',
    description: 'Bridge Arohi with your Gmail inbox to triage urgent emails, summarize newsletter threads, and draft personalized responses ready for 1-click sending.',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    iconColor: 'text-rose-500',
    emoji: '✉️',
    brandColor: '#EA4335',
    popular: true,
    status: 'connected',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['gmail.readonly', 'gmail.compose'],
    capabilities: [
      'Search unread or starred emails by sender and topic',
      'Draft formal replies in 150+ languages directly in Gmail drafts',
      'Summarize long email threads with action items'
    ],
    samplePrompts: [
      {
        title: 'Triage Unread Client Emails',
        prompt: 'Arohi, check my unread Gmail messages from the past 24 hours, identify any urgent client inquiries, and draft polite replies for each.',
        tag: 'Inbox Triage'
      },
      {
        title: 'Draft Bilingual Proposal Follow-Up',
        prompt: 'Arohi, draft an executive follow-up email in English and Hindi regarding our software proposal, and save it to my Gmail drafts.',
        tag: 'Draft Follow-Up'
      }
    ]
  },

  // 3. Google Calendar
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'communication',
    categoryLabel: 'Communication',
    tagline: 'Check free slots, summarize daily agenda & book meetings',
    description: 'Sync your daily schedule so Arohi can find open meeting slots, brief you on upcoming events, and draft calendar invites automatically.',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-500',
    emoji: '📅',
    brandColor: '#4285F4',
    popular: true,
    status: 'connected',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['calendar.events.readonly', 'calendar.events.freebusy'],
    capabilities: [
      'Daily morning schedule briefings with agenda timelines',
      'Finding conflict-free meeting slots across team calendars',
      'Creating calendar event drafts with meeting agendas'
    ],
    samplePrompts: [
      {
        title: 'Daily Schedule Briefing',
        prompt: 'Arohi, what does my Google Calendar look like today? List my meetings with start times and highlight any back-to-back overlaps.',
        tag: 'Daily Brief'
      },
      {
        title: 'Find Next Available 45-Min Slot',
        prompt: 'Arohi, check my calendar for this Thursday and Friday and give me three 45-minute open slots for a client onboarding session.',
        tag: 'Slot Finder'
      }
    ]
  },

  // 4. Google Sheets
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    category: 'workspace',
    categoryLabel: 'Workspace & Docs',
    tagline: 'Live tabular read/write, budget analysis & row updates',
    description: 'Connect spreadsheets to Arohi for dynamic row queries, formula validation, financial budgeting, and automated export of chat datasets directly into Google Sheets.',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-500',
    emoji: '📊',
    brandColor: '#0F9D58',
    popular: true,
    status: 'connected',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['spreadsheets.readonly', 'spreadsheets'],
    capabilities: [
      'Read rows, columns, and named ranges with automatic formula parsing',
      'Append AI research tables and catalog entries directly into live sheets',
      'Run spreadsheet calculations and financial projections'
    ],
    samplePrompts: [
      {
        title: 'Append Data to Monthly Budget Sheet',
        prompt: 'Arohi, generate a 12-month projected revenue forecast for our SaaS startup and export the formatted table into my "Q1 Finance" Google Sheet.',
        tag: 'Data Sync'
      },
      {
        title: 'Analyze Expense Trends',
        prompt: 'Arohi, read the "Marketing Expenses 2026" sheet from my Google Sheets and tell me which channel had the highest ROI.',
        tag: 'Sheet Analysis'
      }
    ]
  },

  // 5. GitHub
  {
    id: 'github',
    name: 'GitHub',
    category: 'developer',
    categoryLabel: 'Developer & Code',
    tagline: 'Triage PRs, inspect repositories, commits & issues',
    description: 'Integrate your GitHub repositories, issues, and pull requests so Arohi can review pull requests, generate code fixes, and explain repo architecture.',
    iconBg: 'bg-zinc-500/10 dark:bg-zinc-500/20',
    iconColor: 'text-zinc-100',
    emoji: '🐙',
    brandColor: '#24292F',
    popular: true,
    status: 'connected',
    authType: 'oauth',
    privacyLevel: 'Read-Only',
    scopes: ['repo:status', 'read:user', 'repo:read'],
    capabilities: [
      'Read pull request diffs and generate line-by-line review comments',
      'Search codebase files for specific functions and architectural patterns',
      'Create GitHub issue templates and bug reproduction steps'
    ],
    samplePrompts: [
      {
        title: 'Review Open Pull Request',
        prompt: 'Arohi, inspect the latest open Pull Request on my "arohi-core" repository, check for TypeScript edge cases, and write a polite code review.',
        tag: 'PR Review'
      },
      {
        title: 'Explain Repo Architecture',
        prompt: 'Arohi, examine the repository structure of my project and draft an onboarding README for new full-stack contributors.',
        tag: 'Code Explainer'
      }
    ]
  },

  // 6. Notion
  {
    id: 'notion',
    name: 'Notion',
    category: 'workspace',
    categoryLabel: 'Workspace & Docs',
    tagline: 'Ingest team wikis, project pages & task databases',
    description: 'Connect your Notion workspace to bring documentation, meeting notes, project roadmaps, and sprint tasks directly into Arohi conversations.',
    iconBg: 'bg-zinc-500/10 dark:bg-zinc-500/20',
    iconColor: 'text-zinc-200',
    emoji: '📝',
    brandColor: '#000000',
    popular: true,
    status: 'available',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['read_content', 'insert_content'],
    capabilities: [
      'Search Notion workspaces and read nested page blocks',
      'Sync conversation action items into your Notion task database',
      'Generate formatted documentation ready for direct Notion pasting'
    ],
    samplePrompts: [
      {
        title: 'Query Company Knowledge Base',
        prompt: 'Arohi, look up our company travel and reimbursement policy in our Notion wiki and summarize what expenses are eligible for refund.',
        tag: 'Wiki Search'
      },
      {
        title: 'Sync Action Items to Notion',
        prompt: 'Arohi, take the sprint priorities we just discussed and create 4 new task cards in my Notion "Engineering Sprint" database.',
        tag: 'Task Sync'
      }
    ]
  },

  // 7. Slack
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    categoryLabel: 'Communication',
    tagline: 'Read channel discussions, summarize threads & post updates',
    description: 'Link your Slack workspace so Arohi can catch you up on busy channel threads, draft status updates, and notify team members.',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    iconColor: 'text-purple-400',
    emoji: '💬',
    brandColor: '#4A154B',
    popular: true,
    status: 'available',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['channels:read', 'chat:write'],
    capabilities: [
      'Summarize long Slack threads with clear bulleted takeaways',
      'Draft standup status posts formatted with Slack markdown',
      'Search channel history for decisions and shared files'
    ],
    samplePrompts: [
      {
        title: 'Summarize #announcements Channel',
        prompt: 'Arohi, read the messages posted in the #product-releases Slack channel this week and give me a high-level summary of new features.',
        tag: 'Channel Catchup'
      },
      {
        title: 'Draft Daily Standup Update',
        prompt: 'Arohi, draft my daily engineering standup update for Slack covering completed auth fixes, in-progress testing, and no blockers.',
        tag: 'Standup Draft'
      }
    ]
  },

  // 8. PostgreSQL / Cloud SQL
  {
    id: 'postgresql',
    name: 'PostgreSQL & Cloud SQL',
    category: 'database',
    categoryLabel: 'Databases & Cloud',
    tagline: 'Natural language queries (Text-to-SQL) & data analytics',
    description: 'Securely connect relational databases so Arohi can write SQL queries, analyze relational schemas, troubleshoot queries, and summarize business KPIs.',
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    emoji: '🗄️',
    brandColor: '#336791',
    popular: true,
    status: 'connected',
    authType: 'native',
    privacyLevel: 'Read-Only',
    scopes: ['read_schema', 'execute_readonly_query'],
    capabilities: [
      'Text-to-SQL query generation with strict syntax safety',
      'Table schema inspection and indexing recommendations',
      'Analytical breakdowns and aggregations of database metrics'
    ],
    samplePrompts: [
      {
        title: 'Text-to-SQL Query Generator',
        prompt: 'Arohi, write an optimized PostgreSQL query to find our top 10 most active users in the last 30 days grouped by country.',
        tag: 'SQL Query'
      },
      {
        title: 'Analyze Database Performance',
        prompt: 'Arohi, explain how I can add a composite index on (user_id, created_at) to speed up our transactions lookup table in PostgreSQL.',
        tag: 'DB Tuning'
      }
    ]
  },

  // 9. Firebase & Firestore
  {
    id: 'firebase',
    name: 'Firebase Firestore',
    category: 'database',
    categoryLabel: 'Databases & Cloud',
    tagline: 'Real-time NoSQL collections, documents & user metadata',
    description: 'Directly bridge Firebase Firestore collections and security rules into Arohi for real-time document inspection, schema verification, and state debugging.',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-400',
    emoji: '🔥',
    brandColor: '#FFCA28',
    popular: false,
    status: 'connected',
    authType: 'native',
    privacyLevel: 'Zero Retention',
    scopes: ['firestore.read'],
    capabilities: [
      'Inspect Firestore collection documents and subcollections',
      'Audit security rules against role-based access rules (RBAC)',
      'Debug client-side query indexing requirements'
    ],
    samplePrompts: [
      {
        title: 'Audit Firestore Security Rules',
        prompt: 'Arohi, verify my firestore.rules to ensure that only authenticated users with verified student profiles can write to the mock test results collection.',
        tag: 'Security Audit'
      }
    ]
  },

  // 10. Razorpay Payments & Billing
  {
    id: 'razorpay',
    name: 'Razorpay Commerce',
    category: 'finance',
    categoryLabel: 'Finance & Commerce',
    tagline: 'Payment links, invoices, subscriptions & transaction inquiries',
    description: 'Connect Razorpay to generate instant payment links for clients, check payout status, generate GST invoices, and verify UPI/Card subscriptions.',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-400',
    emoji: '💳',
    brandColor: '#02042B',
    popular: true,
    status: 'connected',
    authType: 'api_key',
    privacyLevel: 'Zero Retention',
    scopes: ['payments:read', 'invoices:create'],
    capabilities: [
      'Generate live payment links for WhatsApp and email customer billing',
      'Generate GST-compliant tax invoices for digital services',
      'Verify transaction IDs and settlement statuses in real-time'
    ],
    samplePrompts: [
      {
        title: 'Generate Payment Link for Client',
        prompt: 'Arohi, generate a Razorpay payment link for ₹2,500 for "Website SEO Audit" for client Junoon Traders and format a WhatsApp bill note.',
        tag: 'Invoice & Link'
      },
      {
        title: 'Calculate GST Breakdown',
        prompt: 'Arohi, calculate 18% GST breakdown on an invoice of ₹15,000 and provide the exact CGST, SGST, and net amount.',
        tag: 'GST Billing'
      }
    ]
  },

  // 11. Microsoft OneDrive & Office 365
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive & 365',
    category: 'workspace',
    categoryLabel: 'Workspace & Docs',
    tagline: 'Word, Excel, PowerPoint & OneDrive cloud document access',
    description: 'Access Word documents, Excel workbooks, and PowerPoint decks hosted on OneDrive and SharePoint for real-time AI extraction and editing.',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-400',
    emoji: '☁️',
    brandColor: '#0078D4',
    popular: false,
    status: 'available',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['Files.Read', 'User.Read'],
    capabilities: [
      'Read Word `.docx` and Excel `.xlsx` files from OneDrive',
      'Search SharePoint corporate repositories for policy files',
      'Export multi-tab spreadsheet models directly to OneDrive'
    ],
    samplePrompts: [
      {
        title: 'Read OneDrive Financial Model',
        prompt: 'Arohi, open my "2026_Projections.xlsx" workbook from OneDrive and summarize the total projected operating expenses in Tab 2.',
        tag: 'Excel Extract'
      }
    ]
  },

  // 12. Microsoft Outlook
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    category: 'communication',
    categoryLabel: 'Communication',
    tagline: 'Enterprise Outlook mail, calendar invites & contacts',
    description: 'Bridge corporate Outlook emails and Microsoft Exchange calendars into Arohi for enterprise communications and team scheduling.',
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/20',
    iconColor: 'text-sky-400',
    emoji: '📬',
    brandColor: '#0078D4',
    popular: false,
    status: 'available',
    authType: 'oauth',
    privacyLevel: 'User-Authorized',
    scopes: ['Mail.Read', 'Calendars.Read'],
    capabilities: [
      'Search Outlook inbox by subject and sender',
      'Draft executive corporate emails with standard enterprise etiquette',
      'Check Outlook calendar conflicts'
    ],
    samplePrompts: [
      {
        title: 'Search Outlook for Vendor Agreements',
        prompt: 'Arohi, search my Outlook inbox for emails from vendors containing the subject "Service Agreement" and list their expiration dates.',
        tag: 'Outlook Search'
      }
    ]
  },

  // 13. GeM (Government e-Marketplace) Portal
  {
    id: 'gem-portal',
    name: 'GeM Portal (Govt e-Marketplace)',
    category: 'sovereign',
    categoryLabel: 'Sovereign & India',
    tagline: 'Public procurement tenders, bid eligibility & government RFP specs',
    description: 'Connect Arohi to GeM portal catalog and tender guidelines to help Indian MSMEs, startups, and Mission 87 creators bid for government supply orders.',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-400',
    emoji: '🏛️',
    brandColor: '#D97706',
    popular: true,
    status: 'connected',
    authType: 'native',
    privacyLevel: 'Read-Only',
    scopes: ['public.tenders', 'gem.guidelines'],
    capabilities: [
      'Find active government procurement bids for MSMEs and local vendors',
      'Check eligibility rules, earnest money deposit (EMD) exemptions & turnover criteria',
      'Draft technical bids and vendor compliance letters'
    ],
    samplePrompts: [
      {
        title: 'Search GeM Solar & IT Tenders',
        prompt: 'Arohi, explain the mandatory documents required for an MSME startup in Odisha to bid for solar installation contracts on the GeM portal.',
        tag: 'GeM MSME Bid'
      },
      {
        title: 'Draft EMD Exemption Letter',
        prompt: 'Arohi, draft a formal EMD Exemption request letter under the Public Procurement Policy for MSEs for a tender bid on GeM.',
        tag: 'EMD Exemption'
      }
    ]
  },

  // 14. DigiLocker & National Academic Depository
  {
    id: 'digilocker',
    name: 'DigiLocker & Certificate Hub',
    category: 'sovereign',
    categoryLabel: 'Sovereign & India',
    tagline: 'Aadhaar, educational marksheets, UDID & government documents',
    description: 'Bridge DigiLocker document formats to assist students and candidates in validating academic degrees, category certificates, and ID documents for competitive exams.',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    emoji: '🪪',
    brandColor: '#059669',
    popular: true,
    status: 'connected',
    authType: 'native',
    privacyLevel: 'Read-Only',
    scopes: ['document.verification', 'public.schemes'],
    capabilities: [
      'Verify required document checklists for UPSC, SSC, NEET, and State PSC exams',
      'Format academic credential summaries for job applications',
      'Guide Divyangjan applicants on Swavlamban UDID card application procedures'
    ],
    samplePrompts: [
      {
        title: 'Check UDID Card Application Process',
        prompt: 'Arohi, explain step-by-step how a Divyangjan candidate can apply for a digital UDID card on swavlambancard.gov.in and what medical certificates are required.',
        tag: 'UDID Guide'
      }
    ]
  },

  // 15. Jira & Confluence
  {
    id: 'jira',
    name: 'Jira & Linear',
    category: 'developer',
    categoryLabel: 'Developer & Code',
    tagline: 'Sprint backlog, bug tracking tickets & user stories',
    description: 'Connect your issue tracker to fetch sprint tasks, draft user stories with acceptance criteria, and update issue statuses via AI.',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-400',
    emoji: '🎯',
    brandColor: '#0052CC',
    popular: false,
    status: 'available',
    authType: 'api_key',
    privacyLevel: 'User-Authorized',
    scopes: ['issues.read', 'issues.write'],
    capabilities: [
      'Draft detailed user stories with Gherkin acceptance criteria (Given/When/Then)',
      'Summarize sprint velocity and blocker dependencies',
      'Convert customer bug reports into actionable developer tickets'
    ],
    samplePrompts: [
      {
        title: 'Write User Story for Jira',
        prompt: 'Arohi, write a detailed Jira ticket for adding "Google One-Tap Login" including Acceptance Criteria and Edge Cases.',
        tag: 'User Story'
      }
    ]
  },

  // 16. Figma Design System
  {
    id: 'figma',
    name: 'Figma',
    category: 'developer',
    categoryLabel: 'Developer & Code',
    tagline: 'Design tokens, layout specs & front-end UI component generation',
    description: 'Inspect Figma component libraries, typography scales, and design tokens to generate pixel-perfect Tailwind CSS code matching your Figma screens.',
    iconBg: 'bg-pink-500/10 dark:bg-pink-500/20',
    iconColor: 'text-pink-400',
    emoji: '🎨',
    brandColor: '#F24E1E',
    popular: false,
    status: 'available',
    authType: 'api_key',
    privacyLevel: 'Read-Only',
    scopes: ['files:read'],
    capabilities: [
      'Extract design tokens (colors, radii, font sizes) from Figma files',
      'Generate matching React + Tailwind CSS code components',
      'Audit UI contrast and accessibility for WCAG compliance'
    ],
    samplePrompts: [
      {
        title: 'Generate React Component from Design Specs',
        prompt: 'Arohi, create a responsive React pricing card component with Tailwind CSS based on our design system palette.',
        tag: 'Figma to Code'
      }
    ]
  }
];

export const CONNECTOR_CATEGORIES: { id: ConnectorCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Connectors', count: AROHI_CONNECTORS.length },
  { id: 'workspace', label: 'Workspace & Docs', count: AROHI_CONNECTORS.filter(c => c.category === 'workspace').length },
  { id: 'communication', label: 'Communication', count: AROHI_CONNECTORS.filter(c => c.category === 'communication').length },
  { id: 'developer', label: 'Developer & Code', count: AROHI_CONNECTORS.filter(c => c.category === 'developer').length },
  { id: 'database', label: 'Databases & Cloud', count: AROHI_CONNECTORS.filter(c => c.category === 'database').length },
  { id: 'finance', label: 'Finance & Payments', count: AROHI_CONNECTORS.filter(c => c.category === 'finance').length },
  { id: 'sovereign', label: 'Sovereign & India', count: AROHI_CONNECTORS.filter(c => c.category === 'sovereign').length }
];
