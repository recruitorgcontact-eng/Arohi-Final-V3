import { ConnectorDefinition, ConnectorCategory, ActiveConnectorConfig } from '../types/connectors';

export const CONNECTOR_CATEGORIES: { id: ConnectorCategory; label: string; count?: number }[] = [
  { id: 'productivity', label: 'Productivity & Docs' },
  { id: 'communication', label: 'Chat & Voice' },
  { id: 'crm', label: 'CRM & Sales' },
  { id: 'finance', label: 'Finance & Invoicing' },
  { id: 'developer', label: 'DevOps & Database' },
  { id: 'ecommerce', label: 'Shopping & Retail' },
  { id: 'mobility_travel', label: 'Rides & Flights' },
  { id: 'food_delivery', label: 'Food & Dining' },
  { id: 'marketing', label: 'Marketing & Social' },
  { id: 'sovereign_india', label: 'Sovereign India & Public' },
  { id: 'custom', label: 'Custom API / Webhook' }
];

export const ALL_CONNECTORS: ConnectorDefinition[] = [
  // ================= 1. PRODUCTIVITY & DOCS =================
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    tagline: 'Read, write, update rows and build real-time spreadsheets',
    description: 'Direct bi-directional sync with Google Sheets. Append leads, run formulas, extract cells, and generate live dashboard tables.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key', 'webhook'],
    defaultProtocol: 'oauth',
    logoText: '📊',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    docUrl: 'https://developers.google.com/sheets/api',
    actions: [
      {
        id: 'append_row',
        name: 'Append Rows to Sheet',
        description: 'Append calculated rows, lead data, or reports to a spreadsheet',
        type: 'write',
        samplePrompt: 'Append the 5 latest customer inquiries as rows to my Google Sheet "Client Pipeline 2026".'
      },
      {
        id: 'read_sheet',
        name: 'Read & Analyze Sheet',
        description: 'Pull spreadsheet data for synthesis, financial formulas, or audit',
        type: 'read',
        samplePrompt: 'Read the data from my "Q2 P&L" Google Sheet and summarize expenses above ₹50,000.'
      }
    ],
    mockLatencyMs: 65
  },
  {
    id: 'google_drive',
    name: 'Google Drive',
    tagline: 'Search, upload, export and organize folders in the cloud',
    description: 'Cloud storage integration. Upload generated PDFs, search contracts, export invoices, and organize company folders.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📁',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    docUrl: 'https://developers.google.com/drive',
    actions: [
      {
        id: 'upload_file',
        name: 'Upload Document to Drive',
        description: 'Save documents, transcripts, and exports into Google Drive',
        type: 'write',
        samplePrompt: 'Export this project proposal as a PDF and upload it into my Google Drive folder "Q3 Proposals".'
      },
      {
        id: 'search_files',
        name: 'Search Files in Drive',
        description: 'Find files by keyword, date, or owner across Google Drive',
        type: 'read',
        samplePrompt: 'Find all PDF files in my Google Drive that mention "Service Agreement" from last month.'
      }
    ],
    mockLatencyMs: 78
  },
  {
    id: 'google_calendar',
    name: 'Google Calendar',
    tagline: 'Check availability, schedule meetings and sync invites',
    description: 'Automate calendar scheduling. Detect free slots, invite attendees, and prevent double-booking directly through voice or chat.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📅',
    accentColor: 'text-indigo-400',
    bgTint: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    actions: [
      {
        id: 'schedule_event',
        name: 'Schedule Meeting',
        description: 'Create a calendar event with Meet link and attendees',
        type: 'write',
        samplePrompt: 'Schedule a 30-minute client demo on my Google Calendar tomorrow at 3 PM with rahul@example.com.'
      }
    ],
    mockLatencyMs: 45
  },
  {
    id: 'gmail',
    name: 'Gmail',
    tagline: 'Draft emails, send documents & dispatch PDF/PPT attachments',
    description: 'Direct Google Workspace & Gmail email integration. Compose professional messages, dispatch generated PDF quotes, PowerPoint decks, invoices, and summaries directly from your inbox.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key', 'webhook'],
    defaultProtocol: 'oauth',
    logoText: '✉️',
    accentColor: 'text-red-400',
    bgTint: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    docUrl: 'https://developers.google.com/gmail/api',
    actions: [
      {
        id: 'send_email',
        name: 'Send Email with Attachments',
        description: 'Dispatch an email directly to any recipient with optional PDF, PPTX or DOCX documents',
        type: 'write',
        samplePrompt: 'Send an email via Gmail to client@enterprise.in with the subject "Project Proposal" and attach the PDF deck.'
      },
      {
        id: 'create_draft',
        name: 'Create Gmail Draft',
        description: 'Draft a message into your Gmail Drafts folder ready for your final 1-click review',
        type: 'write',
        samplePrompt: 'Draft an email in my Gmail to hr@tcs.com with my tailored cover letter for the Senior AI Engineer role.'
      },
      {
        id: 'search_emails',
        name: 'Search & Summarize Inbox',
        description: 'Find messages by sender, subject, date, or keywords and summarize their contents',
        type: 'read',
        samplePrompt: 'Search my Gmail for recent emails from "CA Rajesh" and summarize any pending tax audit items.'
      }
    ],
    mockLatencyMs: 60
  },
  {
    id: 'microsoft_excel',
    name: 'Microsoft Excel 365',
    tagline: 'Enterprise workbook sync via Microsoft Graph API',
    description: 'Direct connection to OneDrive & SharePoint Excel workbooks. Run advanced macro queries, append accounting rows, and build pivot tables.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📗',
    accentColor: 'text-green-400',
    bgTint: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    badge: 'Enterprise',
    isEnterprise: true,
    actions: [
      {
        id: 'update_excel_table',
        name: 'Update Excel Table',
        description: 'Add new records into Excel workbook tables on OneDrive',
        type: 'write',
        samplePrompt: 'Append the monthly inventory tally into my OneDrive Excel sheet "Master_Stock_2026.xlsx".'
      }
    ],
    mockLatencyMs: 82
  },
  {
    id: 'microsoft_outlook',
    name: 'Microsoft Outlook 365',
    tagline: 'Search corporate mailboxes, draft replies and send memos',
    description: 'Corporate email management. Filter urgent VIP emails, draft professional proposals, and send executive updates.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📬',
    accentColor: 'text-sky-400',
    bgTint: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    badge: 'Enterprise',
    actions: [
      {
        id: 'draft_outlook_email',
        name: 'Draft Outlook Mail',
        description: 'Draft a message into Outlook drafts folder for executive review',
        type: 'write',
        samplePrompt: 'Draft an executive briefing email to team-leads@company.com in my Outlook drafts.'
      }
    ],
    mockLatencyMs: 58
  },
  {
    id: 'notion',
    name: 'Notion',
    tagline: 'Query databases, append workspace pages and manage wikis',
    description: 'Connect your company or personal Notion workspace. Update task boards, append meeting minutes, and query documentation.',
    category: 'productivity',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📝',
    accentColor: 'text-neutral-300',
    bgTint: 'bg-neutral-500/10',
    borderColor: 'border-neutral-500/30',
    isPopular: true,
    actions: [
      {
        id: 'add_notion_page',
        name: 'Create Notion Page',
        description: 'Add a formatted page or database item into Notion',
        type: 'write',
        samplePrompt: 'Create a new page in my Notion "Engineering Wiki" with today\'s architecture plan.'
      }
    ],
    mockLatencyMs: 95
  },
  {
    id: 'airtable',
    name: 'Airtable',
    tagline: 'Query relational bases, update CRM fields and trigger views',
    description: 'Connect Airtable bases to sync records, update statuses, attach files, and build automated client trackers.',
    category: 'productivity',
    supportedProtocols: ['api_key', 'oauth', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '⚡',
    accentColor: 'text-yellow-400',
    bgTint: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    actions: [
      {
        id: 'create_airtable_record',
        name: 'Create Airtable Record',
        description: 'Insert structured row into an Airtable table',
        type: 'write',
        samplePrompt: 'Add a new candidate record into my Airtable "Recruiting Base" with status "Interview Scheduled".'
      }
    ],
    mockLatencyMs: 70
  },
  {
    id: 'coda',
    name: 'Coda Docs',
    tagline: 'Interactive docs and automated data tables',
    description: 'Manage collaborative Coda docs, update control tables, and trigger internal automations.',
    category: 'productivity',
    supportedProtocols: ['api_key', 'oauth'],
    defaultProtocol: 'api_key',
    logoText: '📑',
    accentColor: 'text-rose-400',
    bgTint: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    actions: [
      {
        id: 'insert_coda_row',
        name: 'Insert Row in Coda Table',
        description: 'Push data directly into a Coda table',
        type: 'write',
        samplePrompt: 'Add this weekly task list into my Coda project dashboard table.'
      }
    ],
    mockLatencyMs: 90
  },

  // ================= 2. CHAT & VOICE COMMUNICATION =================
  {
    id: 'whatsapp_business',
    name: 'WhatsApp Business Cloud',
    tagline: 'Send official WhatsApp alerts, order confirmations & templates',
    description: 'Meta WhatsApp Cloud API integration. Dispatch automated order confirmations, follow-up messages, and interactive catalogs to customers.',
    category: 'communication',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '💬',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'send_whatsapp_message',
        name: 'Send WhatsApp Message',
        description: 'Send a direct WhatsApp text or pre-approved template message',
        type: 'action',
        samplePrompt: 'Send a WhatsApp confirmation message to +919876543210 confirming their booking appointment for tomorrow 11 AM.'
      }
    ],
    mockLatencyMs: 110
  },
  {
    id: 'slack',
    name: 'Slack',
    tagline: 'Post channel updates, alert engineering teams and send DMs',
    description: 'Team chat integration. Notify channels on high-priority leads, post daily standup summaries, and trigger bots.',
    category: 'communication',
    supportedProtocols: ['oauth', 'webhook', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '💼',
    accentColor: 'text-purple-400',
    bgTint: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    actions: [
      {
        id: 'post_slack_message',
        name: 'Post Message to Channel',
        description: 'Publish message into a Slack channel or user direct message',
        type: 'action',
        samplePrompt: 'Post a summary of today\'s closed deals into our #sales-wins Slack channel.'
      }
    ],
    mockLatencyMs: 40
  },
  {
    id: 'telegram',
    name: 'Telegram Bot API',
    tagline: 'Instant alerts, channel broadcasts and bot dispatching',
    description: 'Connect any Telegram bot token to broadcast market alerts, student quiz scores, or private community notifications.',
    category: 'communication',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '✈️',
    accentColor: 'text-sky-400',
    bgTint: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    actions: [
      {
        id: 'send_telegram_alert',
        name: 'Send Telegram Broadcast',
        description: 'Dispatch an alert to a Telegram channel or chat ID',
        type: 'action',
        samplePrompt: 'Broadcast the daily mock exam leaderboard to our Telegram subscriber channel.'
      }
    ],
    mockLatencyMs: 38
  },
  {
    id: 'discord',
    name: 'Discord Webhooks & Bot',
    tagline: 'Community notifications, announcements and role updates',
    description: 'Trigger rich Discord embed messages into developer or gaming community servers.',
    category: 'communication',
    supportedProtocols: ['webhook', 'api_key', 'oauth'],
    defaultProtocol: 'webhook',
    logoText: '🎮',
    accentColor: 'text-indigo-400',
    bgTint: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    actions: [
      {
        id: 'send_discord_webhook',
        name: 'Send Discord Embed',
        description: 'Post formatted rich embed into a Discord text channel',
        type: 'action',
        samplePrompt: 'Post a Discord announcement embed celebrating our 10,000th active cadet.'
      }
    ],
    mockLatencyMs: 35
  },
  {
    id: 'twilio',
    name: 'Twilio SMS & Voice',
    tagline: 'Dispatch international SMS, OTPs and initiate voice calls',
    description: 'Global telecom gateway. Send transactional SMS, verify phone numbers via OTP, and trigger outbound voice notices.',
    category: 'communication',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '📱',
    accentColor: 'text-red-400',
    bgTint: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    badge: 'Telecom',
    actions: [
      {
        id: 'send_sms',
        name: 'Send SMS Alert',
        description: 'Send a verified SMS message to any global mobile number',
        type: 'action',
        samplePrompt: 'Send an urgent SMS alert via Twilio to +919938000000 with the OTP code.'
      }
    ],
    mockLatencyMs: 140
  },

  // ================= 3. CRM & SALES =================
  {
    id: 'zoho_crm',
    name: 'Zoho CRM',
    tagline: 'Lead scoring, contact creation, deal pipeline & notes',
    description: 'Enterprise Indian CRM integration. Add incoming leads, assign sales reps, track deal stages, and append meeting logs.',
    category: 'crm',
    supportedProtocols: ['oauth', 'api_key', 'webhook'],
    defaultProtocol: 'oauth',
    logoText: '📈',
    accentColor: 'text-red-400',
    bgTint: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'create_zoho_lead',
        name: 'Create Lead in Zoho',
        description: 'Push new customer lead into Zoho CRM with contact details and source',
        type: 'write',
        samplePrompt: 'Create a new lead in Zoho CRM for Priya Sharma, phone 9876543210, source "Arohi AI Consultation".'
      },
      {
        id: 'get_deal_pipeline',
        name: 'Fetch Open Deals',
        description: 'Retrieve deal stages and values for pipeline forecasting',
        type: 'read',
        samplePrompt: 'Fetch all open deals closing this month from Zoho CRM and calculate total estimated revenue.'
      }
    ],
    mockLatencyMs: 88
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    tagline: 'Inbound marketing, CRM contacts, deals & lifecycle stages',
    description: 'Inbound CRM sync. Enrich contacts, log sales activities, schedule tasks, and track customer lifecycle stages.',
    category: 'crm',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '🎯',
    accentColor: 'text-orange-400',
    bgTint: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    actions: [
      {
        id: 'create_hubspot_contact',
        name: 'Create HubSpot Contact',
        description: 'Add new contact with email, company, and custom properties',
        type: 'write',
        samplePrompt: 'Add a new contact in HubSpot for rahul@orissatech.com and tag them as "Hot Enterprise Prospect".'
      }
    ],
    mockLatencyMs: 74
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    tagline: 'Enterprise accounts, opportunities, leads & custom objects',
    description: 'World #1 enterprise CRM. Query opportunities, update enterprise pipeline stages, and sync account representatives.',
    category: 'crm',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '☁️',
    accentColor: 'text-sky-400',
    bgTint: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    badge: 'Enterprise',
    isEnterprise: true,
    actions: [
      {
        id: 'update_opportunity',
        name: 'Update Opportunity Stage',
        description: 'Modify sales stage and expected close date on Salesforce',
        type: 'write',
        samplePrompt: 'Update the Salesforce opportunity "Bhubaneswar Smart City Project" to Stage "Negotiation/Review".'
      }
    ],
    mockLatencyMs: 120
  },
  {
    id: 'leadsquared',
    name: 'LeadSquared',
    tagline: 'High-velocity sales execution, education & healthcare CRM',
    description: 'Leading Indian sales execution platform. Capture student admissions, track loan lead verifications, and route calls.',
    category: 'crm',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '📐',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    actions: [
      {
        id: 'capture_lead',
        name: 'Capture LeadSquared Lead',
        description: 'Push lead with custom sub-status and telecalling attributes',
        type: 'write',
        samplePrompt: 'Add new coaching aspirant lead into LeadSquared with exam preference "OSSC CGL 2026".'
      }
    ],
    mockLatencyMs: 95
  },

  // ================= 4. FINANCE, BILLING & ERP =================
  {
    id: 'razorpay',
    name: 'Razorpay',
    tagline: 'Instant payment links, subscriptions, refunds & GST invoices',
    description: 'India\'s leading payment gateway. Generate instant UPI/Card payment links, create subscription plans, and verify transaction statuses.',
    category: 'finance',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '💳',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'create_payment_link',
        name: 'Generate Razorpay Payment Link',
        description: 'Create a direct payment link with amount, description, and SMS alert',
        type: 'action',
        samplePrompt: 'Generate a Razorpay payment link for ₹2,499 for client "Prakash Enterprises" for Consulting Services.'
      },
      {
        id: 'check_payment_status',
        name: 'Verify Payment Status',
        description: 'Check whether a specific payment ID or order was captured successfully',
        type: 'read',
        samplePrompt: 'Check if Razorpay order id "order_P19x982" has been successfully paid.'
      }
    ],
    mockLatencyMs: 50
  },
  {
    id: 'tally_prime',
    name: 'Tally Prime / ERP 9',
    tagline: 'Sync ledger vouchers, sales invoices & balance sheets',
    description: 'Connect to local or cloud-hosted Tally XML/ODBC gateways. Push GST sales vouchers, extract trial balance, and generate stock reports.',
    category: 'finance',
    supportedProtocols: ['custom_api', 'webhook', 'api_key'],
    defaultProtocol: 'custom_api',
    logoText: '🪙',
    accentColor: 'text-amber-400',
    bgTint: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badge: 'India Standard',
    isPopular: true,
    actions: [
      {
        id: 'push_sales_voucher',
        name: 'Push Sales Voucher to Tally',
        description: 'Create an XML sales voucher with CGST, SGST, and item inventory',
        type: 'write',
        samplePrompt: 'Push an accounting sales voucher into Tally for ₹12,500 with 18% GST to debtor "Sunil Traders".'
      }
    ],
    mockLatencyMs: 130
  },
  {
    id: 'zoho_books',
    name: 'Zoho Books',
    tagline: 'GST-compliant invoicing, expense tracking & banking reconciliation',
    description: 'Cloud accounting for Indian businesses. Generate e-Invoices with IRN QR codes, log bill expenses, and send customer statements.',
    category: 'finance',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📚',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    actions: [
      {
        id: 'generate_invoice',
        name: 'Create Zoho Books Invoice',
        description: 'Generate customer tax invoice with item line items and HSN codes',
        type: 'write',
        samplePrompt: 'Create a GST tax invoice in Zoho Books for client "Odisha Crafts" for ₹8,000.'
      }
    ],
    mockLatencyMs: 75
  },
  {
    id: 'stripe',
    name: 'Stripe',
    tagline: 'Global card processing, invoices & international subscriptions',
    description: 'Accept payments in 135+ currencies. Manage SaaS subscriptions, process USD/EUR payouts, and prevent chargeback fraud.',
    category: 'finance',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '💲',
    accentColor: 'text-indigo-400',
    bgTint: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    actions: [
      {
        id: 'create_checkout_session',
        name: 'Create Stripe Checkout',
        description: 'Generate international hosted checkout session for USD/EUR',
        type: 'action',
        samplePrompt: 'Create a Stripe checkout link for $49 for our global Career Accelerator package.'
      }
    ],
    mockLatencyMs: 55
  },
  {
    id: 'cashfree',
    name: 'Cashfree Payments',
    tagline: 'Fast UPI payouts, bulk vendor disbursements & collections',
    description: 'Instant bank transfer payouts to vendors, auto-collect virtual UPI IDs, and automated reconciliation.',
    category: 'finance',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '💸',
    accentColor: 'text-violet-400',
    bgTint: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    actions: [
      {
        id: 'trigger_payout',
        name: 'Trigger Vendor Payout',
        description: 'Send instant IMPS/NEFT/UPI transfer to vendor bank account',
        type: 'action',
        samplePrompt: 'Initiate an instant UPI payout of ₹4,500 via Cashfree to vendor@okaxis for content work.'
      }
    ],
    mockLatencyMs: 65
  },

  // ================= 5. DEVOPS & DATABASE =================
  {
    id: 'github',
    name: 'GitHub',
    tagline: 'Manage repositories, create pull requests, issues & commits',
    description: 'Developer workspace integration. Search codebase, open bug issues, review pull requests, and trigger GitHub Actions workflows.',
    category: 'developer',
    supportedProtocols: ['oauth', 'api_key', 'webhook'],
    defaultProtocol: 'oauth',
    logoText: '🐙',
    accentColor: 'text-neutral-200',
    bgTint: 'bg-neutral-500/10',
    borderColor: 'border-neutral-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    actions: [
      {
        id: 'create_issue',
        name: 'Create Issue',
        description: 'Open a tracked bug or task issue in a GitHub repository',
        type: 'write',
        samplePrompt: 'Open an issue on my repository "arohi-frontend" titled "Fix mobile drawer animation lag" with detailed steps.'
      },
      {
        id: 'list_prs',
        name: 'List Pull Requests',
        description: 'Fetch open pull requests awaiting review',
        type: 'read',
        samplePrompt: 'List all open PRs on our repo that are currently awaiting code review.'
      }
    ],
    mockLatencyMs: 45
  },
  {
    id: 'supabase',
    name: 'Supabase / PostgreSQL',
    tagline: 'Query SQL tables, run migrations and manage database records',
    description: 'Direct SQL execution and REST querying on your Supabase Postgres tables with Row Level Security (RLS).',
    category: 'developer',
    supportedProtocols: ['api_key', 'custom_api'],
    defaultProtocol: 'api_key',
    logoText: '⚡',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'query_table',
        name: 'Execute Safe Select Query',
        description: 'Query database records with filters, order, and limits',
        type: 'read',
        samplePrompt: 'Query the "subscribers" table in Supabase for users who signed up in the last 7 days.'
      }
    ],
    mockLatencyMs: 35
  },
  {
    id: 'jira',
    name: 'Jira Software',
    tagline: 'Sprint planning, ticket creation and bug lifecycle tracking',
    description: 'Atlassian Jira integration. Create sprint user stories, assign developers, update story points, and transition bug tickets.',
    category: 'developer',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📋',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    actions: [
      {
        id: 'create_jira_ticket',
        name: 'Create Jira Ticket',
        description: 'Log a new bug or story under an active Jira project key',
        type: 'write',
        samplePrompt: 'Create a high-priority bug ticket in Jira project "DEV" for payment webhook timeout.'
      }
    ],
    mockLatencyMs: 90
  },
  {
    id: 'linear',
    name: 'Linear',
    tagline: 'High-speed issue tracking for modern product teams',
    description: 'Sync Linear cycles, track roadmaps, create issues, and manage engineering priorities with keyboard shortcuts.',
    category: 'developer',
    supportedProtocols: ['api_key', 'oauth'],
    defaultProtocol: 'api_key',
    logoText: '🔺',
    accentColor: 'text-indigo-400',
    bgTint: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    actions: [
      {
        id: 'create_linear_issue',
        name: 'Create Linear Issue',
        description: 'Add an issue with team, assignee, and priority label',
        type: 'write',
        samplePrompt: 'Add an urgent issue in Linear: "Optimize database indexes on quiz_attempts table".'
      }
    ],
    mockLatencyMs: 40
  },
  {
    id: 'aws_s3',
    name: 'Amazon S3',
    tagline: 'Secure object storage, file uploads & pre-signed URLs',
    description: 'Direct bucket integration. Store user uploads, generate secure pre-signed download links, and manage asset lifecycles.',
    category: 'developer',
    supportedProtocols: ['api_key'],
    defaultProtocol: 'api_key',
    logoText: '🪣',
    accentColor: 'text-amber-400',
    bgTint: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    actions: [
      {
        id: 'generate_presigned_url',
        name: 'Generate S3 Download Link',
        description: 'Generate temporary secure URL to download an asset',
        type: 'action',
        samplePrompt: 'Generate a 1-hour secure download URL for the quarterly report in our S3 bucket.'
      }
    ],
    mockLatencyMs: 50
  },

  // ================= 6. COMMERCE & LOGISTICS =================
  {
    id: 'shopify',
    name: 'Shopify',
    tagline: 'Manage store orders, customer lookup, inventory & fulfillment',
    description: 'Global e-commerce platform. Look up order statuses, modify product pricing, draft customer refunds, and view sales metrics.',
    category: 'ecommerce',
    supportedProtocols: ['oauth', 'api_key', 'webhook'],
    defaultProtocol: 'oauth',
    logoText: '🛍️',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'lookup_order',
        name: 'Look Up Shopify Order',
        description: 'Retrieve order tracking number, line items, and fulfillment state',
        type: 'read',
        samplePrompt: 'Look up Shopify order #1042 for customer "Ananya Mohapatra" and check shipment status.'
      }
    ],
    mockLatencyMs: 65
  },
  {
    id: 'shiprocket',
    name: 'Shiprocket',
    tagline: 'Automated courier booking, AWB tracking & NDR management',
    description: 'India\'s #1 shipping platform. Generate shipping labels, calculate courier rates (Delhivery, Bluedart, DTDC), and track live parcels.',
    category: 'ecommerce',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '🚀',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: 'Logistics',
    actions: [
      {
        id: 'track_awb',
        name: 'Track Live Shipment (AWB)',
        description: 'Fetch current location and estimated delivery date for AWB',
        type: 'read',
        samplePrompt: 'Track Shiprocket AWB number "1432890123" and tell me current location.'
      }
    ],
    mockLatencyMs: 85
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    tagline: 'WordPress online store, product catalog & checkout data',
    description: 'Sync WordPress stores. Retrieve order histories, update stock quantities, and view pending bank transfers.',
    category: 'ecommerce',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '🛒',
    accentColor: 'text-purple-400',
    bgTint: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    actions: [
      {
        id: 'get_pending_orders',
        name: 'Get Pending Orders',
        description: 'Fetch orders requiring packing and processing',
        type: 'read',
        samplePrompt: 'Fetch all WooCommerce orders currently in "Processing" status.'
      }
    ],
    mockLatencyMs: 75
  },
  {
    id: 'amazon_india',
    name: 'Amazon India',
    tagline: 'Search verified products, compare ratings & 1-click cart checkout',
    description: 'Instant product search and real-time deal discovery across Amazon India. Arohi finds the top deals, lowest prices, and Prime eligibility, handing off to Amazon for verified 2FA checkout.',
    category: 'ecommerce',
    supportedProtocols: ['direct_intent', 'custom_api'],
    defaultProtocol: 'direct_intent',
    logoText: '📦',
    accentColor: 'text-amber-400',
    bgTint: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badge: '1-Click Ready',
    isPopular: true,
    actions: [
      {
        id: 'search_amazon',
        name: 'Search Products & Deals',
        description: 'Find products with price filters, Prime shipping, and customer reviews',
        type: 'action',
        samplePrompt: 'Find the best noise-cancelling headphones under ₹3,000 on Amazon with 4+ star rating.'
      }
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tagline: 'SuperCoin deals, electronics comparison & festival discounts',
    description: 'Direct deep-link integration with Flipkart. Search mobiles, appliances, and fashion with instant bank offer detection and secure payment.',
    category: 'ecommerce',
    supportedProtocols: ['direct_intent', 'custom_api'],
    defaultProtocol: 'direct_intent',
    logoText: '🛍️',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: 'Popular',
    isPopular: true,
    actions: [
      {
        id: 'search_flipkart',
        name: 'Explore Flipkart Deals',
        description: 'Deep-link directly to top products, bank offers, and exchange value',
        type: 'action',
        samplePrompt: 'Find 5G smartphones under ₹15,000 on Flipkart with exchange offers.'
      }
    ]
  },

  // ================= 7. MOBILITY & TRAVEL =================
  {
    id: 'uber_rides',
    name: 'Uber Rides',
    tagline: 'Instant ride dispatch with pre-filled destination coordinates',
    description: 'Official Uber Universal Link protocol. Arohi geocodes your pickup and destination, locking them directly into the Uber app for 1-tap ride confirmation.',
    category: 'mobility_travel',
    supportedProtocols: ['direct_intent', 'webhook'],
    defaultProtocol: 'direct_intent',
    logoText: '🚗',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Universal Link',
    isPopular: true,
    actions: [
      {
        id: 'book_uber',
        name: 'Dispatch Cab to Destination',
        description: 'Pre-fills destination coordinates into Uber app for instant booking',
        type: 'action',
        samplePrompt: 'Book an Uber cab from my location to Bhubaneswar Airport (BBI).'
      }
    ]
  },
  {
    id: 'google_flights',
    name: 'Google Flights & Airfare',
    tagline: 'Live airline schedules, cheapest date matrix & seat booking',
    description: 'Real-time airfare comparison across IndiGo, Air India, Akasa Air, and international carriers. Generates live route links with pre-set dates and passenger counts.',
    category: 'mobility_travel',
    supportedProtocols: ['direct_intent', 'custom_api'],
    defaultProtocol: 'direct_intent',
    logoText: '✈️',
    accentColor: 'text-sky-400',
    bgTint: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    badge: 'Real-Time',
    isPopular: true,
    actions: [
      {
        id: 'search_flights',
        name: 'Find Lowest Airfare',
        description: 'Compare non-stop flights and baggage allowances across all airlines',
        type: 'read',
        samplePrompt: 'Find the cheapest flight from Delhi (DEL) to Mumbai (BOM) this Friday evening.'
      }
    ]
  },
  {
    id: 'irctc_trains',
    name: 'IRCTC Indian Railways',
    tagline: 'PNR status, Tatkal reservation & seat availability portal',
    description: 'Indian Railways e-ticketing integration. Prepares train searches between railway stations, Vande Bharat expresses, and direct IRCTC handoff.',
    category: 'mobility_travel',
    supportedProtocols: ['direct_intent', 'webhook'],
    defaultProtocol: 'direct_intent',
    logoText: '🚆',
    accentColor: 'text-amber-500',
    bgTint: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badge: 'Indian Railways',
    actions: [
      {
        id: 'search_trains',
        name: 'Search Train Berths',
        description: 'Check Vande Bharat and express train timings and Tatkal quotas',
        type: 'read',
        samplePrompt: 'Search Vande Bharat trains from Sambalpur to Puri on IRCTC.'
      }
    ]
  },

  // ================= 8. FOOD & DINING =================
  {
    id: 'zomato',
    name: 'Zomato',
    tagline: 'Discover top restaurants, live menus & dining discounts',
    description: 'Find top-rated nearby restaurants, authentic regional cuisines, and delivery menus. Arohi organizes your dish choices and hands off to Zomato for delivery.',
    category: 'food_delivery',
    supportedProtocols: ['direct_intent', 'webhook'],
    defaultProtocol: 'direct_intent',
    logoText: '🍽️',
    accentColor: 'text-rose-400',
    bgTint: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    badge: 'Food Delivery',
    isPopular: true,
    actions: [
      {
        id: 'order_zomato',
        name: 'Find Dishes & Restaurants',
        description: 'Deep-link to top-rated nearby restaurants and pre-filled food search',
        type: 'action',
        samplePrompt: 'Order Biryani and Butter Naan from the best-rated restaurant on Zomato.'
      }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy & Instamart',
    tagline: 'Order restaurant meals & 10-minute grocery delivery',
    description: 'Seamless integration with Swiggy Food and Instamart. Search dishes, pantry essentials, and household items with instant delivery handoff.',
    category: 'food_delivery',
    supportedProtocols: ['direct_intent', 'webhook'],
    defaultProtocol: 'direct_intent',
    logoText: '🍛',
    accentColor: 'text-orange-400',
    bgTint: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    badge: '10-Min Ready',
    actions: [
      {
        id: 'order_swiggy',
        name: 'Order Meals or Groceries',
        description: 'Search restaurants or Instamart items and open ready-to-order menu',
        type: 'action',
        samplePrompt: 'Order Paneer Tikka on Swiggy from top-rated kitchen near me.'
      }
    ]
  },

  // ================= 9. MARKETING & SOCIAL =================
  {
    id: 'linkedin',
    name: 'LinkedIn Professional API',
    tagline: 'Publish executive articles, company updates & read analytics',
    description: 'Professional social presence. Draft and publish company thought-leadership posts, monitor impression analytics, and reply to comments.',
    category: 'marketing',
    supportedProtocols: ['oauth'],
    defaultProtocol: 'oauth',
    logoText: '💼',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: 'Professional',
    actions: [
      {
        id: 'publish_linkedin_post',
        name: 'Publish LinkedIn Update',
        description: 'Publish text post or article to company page or personal profile',
        type: 'action',
        samplePrompt: 'Publish this 200-word thought leadership update on our company LinkedIn page.'
      }
    ],
    mockLatencyMs: 95
  },
  {
    id: 'meta_graph',
    name: 'Instagram & Facebook Pages',
    tagline: 'Publish social media posts, reply to DMs & track engagement',
    description: 'Meta Graph API. Schedule Instagram reels captions, post to Facebook business pages, and manage customer inquiries.',
    category: 'marketing',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '📸',
    accentColor: 'text-pink-400',
    bgTint: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    actions: [
      {
        id: 'post_to_facebook',
        name: 'Post to Facebook Page',
        description: 'Publish announcement or campaign image to Facebook page',
        type: 'action',
        samplePrompt: 'Post our new educational scholarship announcement on our official Facebook page.'
      }
    ],
    mockLatencyMs: 110
  },
  {
    id: 'brevo',
    name: 'Brevo (formerly Sendinblue)',
    tagline: 'Marketing email campaigns, transactional SMTP & SMS',
    description: 'Bulk email and SMS marketing. Trigger personalized onboarding sequences, monitor open rates, and sync contact lists.',
    category: 'marketing',
    supportedProtocols: ['api_key', 'webhook'],
    defaultProtocol: 'api_key',
    logoText: '📧',
    accentColor: 'text-green-400',
    bgTint: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    actions: [
      {
        id: 'send_transactional_email',
        name: 'Send Transactional Email',
        description: 'Dispatch branded HTML email template to user email',
        type: 'action',
        samplePrompt: 'Send our welcome brochure email via Brevo to new subscriber arpita@example.com.'
      }
    ],
    mockLatencyMs: 60
  },

  // ================= 8. SOVEREIGN INDIA & PUBLIC =================
  {
    id: 'gem_portal',
    name: 'GeM (Govt e-Marketplace)',
    tagline: 'Public tender discovery, bids monitoring & product catalog',
    description: 'National public procurement portal. Monitor active tenders matching your MSME category, track bid deadlines, and format compliance bids.',
    category: 'sovereign_india',
    supportedProtocols: ['custom_api', 'api_key'],
    defaultProtocol: 'custom_api',
    logoText: '🇮🇳',
    accentColor: 'text-amber-400',
    bgTint: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badge: 'National Hub',
    isEnterprise: true,
    actions: [
      {
        id: 'search_tenders',
        name: 'Search GeM Active Bids',
        description: 'Query open tenders by category, ministry, and minimum order value',
        type: 'read',
        samplePrompt: 'Search GeM for active IT training and software bids published by Odisha State departments.'
      }
    ],
    mockLatencyMs: 140
  },
  {
    id: 'gstn_einvoice',
    name: 'GSTN e-Invoicing & e-Way Bill',
    tagline: 'Verify GSTIN numbers, generate e-Way bills & validate HSN',
    description: 'Direct GST portal integration. Verify vendor GST registration, check active filing status, and validate 6-digit HSN codes.',
    category: 'sovereign_india',
    supportedProtocols: ['api_key', 'custom_api'],
    defaultProtocol: 'api_key',
    logoText: '🏛️',
    accentColor: 'text-blue-400',
    bgTint: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badge: 'GST Verified',
    actions: [
      {
        id: 'verify_gstin',
        name: 'Verify GSTIN Number',
        description: 'Validate active taxpayer name, trade name, and return filing track record',
        type: 'read',
        samplePrompt: 'Verify GSTIN 21AAACB1234F1Z5 and return the official trade name and active status.'
      }
    ],
    mockLatencyMs: 85
  },
  {
    id: 'digilocker_partner',
    name: 'DigiLocker Partner API',
    tagline: 'Paperless document verification (Aadhaar, PAN, Marksheets)',
    description: 'Government of India DigiLocker integration. Fetch verified certificates, caste certificates, and marksheets for verification.',
    category: 'sovereign_india',
    supportedProtocols: ['oauth', 'api_key'],
    defaultProtocol: 'oauth',
    logoText: '🔐',
    accentColor: 'text-emerald-400',
    bgTint: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Govt of India',
    actions: [
      {
        id: 'request_verified_doc',
        name: 'Verify Document Authenticity',
        description: 'Verify digital signature and authenticity of educational marksheets',
        type: 'read',
        samplePrompt: 'Verify the digital signature on this Odisha CHSE Plus Two certificate.'
      }
    ],
    mockLatencyMs: 95
  },

  // ================= 9. UNIVERSAL CUSTOM CONNECTORS =================
  {
    id: 'custom_rest_api',
    name: 'Universal Custom REST API',
    tagline: 'Connect ANY private software, database or internal server in the world',
    description: 'Enterprise custom bridge. Enter any Base URL, set custom authentication headers (Bearer, API-Key, Basic Auth), and expose custom endpoints to Arohi AI.',
    category: 'custom',
    supportedProtocols: ['custom_api'],
    defaultProtocol: 'custom_api',
    logoText: '🌐',
    accentColor: 'text-cyan-400',
    bgTint: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    badge: 'Infinite Range',
    isEnterprise: true,
    actions: [
      {
        id: 'execute_custom_endpoint',
        name: 'Execute Custom Endpoint',
        description: 'Make an authenticated GET/POST/PUT call to any private system',
        type: 'action',
        samplePrompt: 'Query our hospital internal patient API at https://api.hospital.internal/v1/admissions.'
      }
    ],
    mockLatencyMs: 40
  },
  {
    id: 'webhook_zapier_make',
    name: 'Webhooks (Zapier / Make / n8n)',
    tagline: 'Trigger workflows across 5,000+ apps with a simple webhook URL',
    description: 'Paste any webhook URL from Zapier, Make.com, or n8n. Arohi will push real-time payloads, AI summaries, or customer leads automatically.',
    category: 'custom',
    supportedProtocols: ['webhook'],
    defaultProtocol: 'webhook',
    logoText: '🔗',
    accentColor: 'text-purple-400',
    bgTint: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    badge: 'No-Code',
    actions: [
      {
        id: 'dispatch_webhook',
        name: 'Trigger Webhook Event',
        description: 'Send formatted JSON payload to your automation pipeline',
        type: 'action',
        samplePrompt: 'Send this candidate evaluation report as JSON to my Zapier webhook URL.'
      }
    ],
    mockLatencyMs: 30
  }
];

// LocalStorage helpers for user connector states
const STORAGE_KEY = 'arohi_active_connectors_vault_v1';

export function getStoredActiveConnectors(): ActiveConnectorConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: ActiveConnectorConfig[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Purge any legacy placeholder/mock data
    const cleaned = parsed.filter(c => {
      const email = c.authData?.accountEmail || '';
      const key = c.authData?.apiKeyMasked || '';
      return !email.includes('arohiai.com') && !key.includes('wh_live_••••••••9841');
    });

    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (err) {
    console.error('Failed reading active connectors from storage', err);
    return [];
  }
}

export function saveActiveConnector(config: ActiveConnectorConfig): void {
  try {
    const current = getStoredActiveConnectors();
    const existingIndex = current.findIndex(c => c.connectorId === config.connectorId);
    if (existingIndex >= 0) {
      current[existingIndex] = config;
    } else {
      current.push(config);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed saving connector', err);
  }
}

export function removeActiveConnector(connectorId: string): void {
  try {
    const current = getStoredActiveConnectors();
    const updated = current.filter(c => c.connectorId !== connectorId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed removing connector', err);
  }
}
