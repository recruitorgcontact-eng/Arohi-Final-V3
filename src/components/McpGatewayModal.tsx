import React, { useState } from 'react';
import { 
  X, Zap, ShoppingBag, Utensils, Car, Plane, Stethoscope, Flame, Mail, 
  CheckCircle, ChevronRight, ShieldCheck, Sparkles, MapPin, Search,
  ArrowRight, Clock, ExternalLink, Send, Check, Code, FileText, Layers,
  Calendar, Folder, MessageSquare, Database, Globe, CreditCard, Briefcase,
  Cloud, Terminal, Building
} from 'lucide-react';
import { AROHI_REGISTERED_MCP_TOOLS } from '../lib/mcpSchema';

interface McpGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPromptToChat: (promptText: string) => void;
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortLabel: string;
  icon: any;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentGradient: string;
  description: string;
  badge?: string;
  providers: {
    name: string;
    logoText: string;
    tagline: string;
    status: 'Connected' | 'Ready' | 'Beta';
    badgeBg: string;
  }[];
  samplePrompts: {
    title: string;
    prompt: string;
    estTime: string;
    tag: string;
    priceEst?: string;
  }[];
}

export const MCP_CATEGORIES: ServiceCategory[] = [
  {
    id: 'email',
    name: 'Email & Messaging',
    shortLabel: 'Email',
    icon: Mail,
    emoji: '✉️',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    accentGradient: 'from-rose-500/20 via-pink-500/20 to-purple-600/20',
    description: 'Draft, read inbox, search emails & send formal messages via Gmail & Outlook.',
    badge: 'Gmail & Outlook',
    providers: [
      { name: 'Gmail', logoText: '✉️', tagline: 'Draft, read inbox & send emails', status: 'Connected', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
      { name: 'Microsoft Outlook', logoText: '📬', tagline: 'Enterprise email & inbox search', status: 'Connected', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
    ],
    samplePrompts: [
      { title: 'Draft Email in Gmail', prompt: 'Arohi, draft a formal follow-up email in English and Hindi to my client about project completion and save as draft in Gmail.', estTime: 'Instant', tag: 'Gmail', priceEst: 'Free' },
      { title: 'Search Outlook Unread Mail', prompt: 'Arohi, search my Outlook inbox for unread urgent messages from management and summarize them.', estTime: 'Instant', tag: 'Outlook', priceEst: 'Free' }
    ]
  },
  {
    id: 'calendar',
    name: 'Calendar & Scheduling',
    shortLabel: 'Calendar',
    icon: Calendar,
    emoji: '📅',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    accentGradient: 'from-blue-500/20 via-cyan-500/20 to-indigo-500/20',
    description: 'Schedule meetings, check free slots & sync events across Google Calendar & Outlook.',
    badge: 'Google & Outlook',
    providers: [
      { name: 'Google Calendar', logoText: '📅', tagline: 'Schedule meetings & set reminders', status: 'Connected', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'Outlook Calendar', logoText: '📆', tagline: 'Corporate schedule & invite sync', status: 'Connected', badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' }
    ],
    samplePrompts: [
      { title: 'Schedule Team Sync Call', prompt: 'Arohi, find a free 30-minute slot on my Google Calendar tomorrow afternoon and schedule a project review call.', estTime: 'Instant', tag: 'Google Calendar', priceEst: 'Free' },
      { title: 'Check Today\'s Agenda', prompt: 'Arohi, check my Google Calendar & Outlook events for today and list all my scheduled meetings.', estTime: 'Instant', tag: 'Agenda', priceEst: 'Free' }
    ]
  },
  {
    id: 'cloud_files',
    name: 'Cloud Files & Storage',
    shortLabel: 'Cloud Files',
    icon: Cloud,
    emoji: '📁',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    accentGradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    description: 'Search, upload, organize and retrieve documents across Google Drive, Dropbox & OneDrive.',
    badge: 'Drive & Dropbox',
    providers: [
      { name: 'Google Drive', logoText: '📁', tagline: 'Cloud doc search, upload & permissions', status: 'Connected', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { name: 'Dropbox', logoText: '📦', tagline: 'File sync, sharing & archive access', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'Microsoft OneDrive', logoText: '☁️', tagline: 'Office document cloud storage', status: 'Ready', badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' }
    ],
    samplePrompts: [
      { title: 'Search Q3 Project Proposal PDF', prompt: 'Arohi, search my Google Drive for "Q3 Project Proposal.pdf" and generate a 3-bullet executive summary.', estTime: 'Instant', tag: 'Google Drive', priceEst: 'Free' },
      { title: 'Organize Dropbox Folder', prompt: 'Arohi, list the top 5 largest files in my Dropbox folder and organize them into an archive subfolder.', estTime: 'Instant', tag: 'Dropbox', priceEst: 'Free' }
    ]
  },
  {
    id: 'communication',
    name: 'Communication & Chat',
    shortLabel: 'Communication',
    icon: MessageSquare,
    emoji: '💬',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    accentGradient: 'from-indigo-500/20 via-purple-500/20 to-blue-500/20',
    description: 'Dispatch team messages, channel updates & alerts to Slack, Microsoft Teams & Discord.',
    badge: 'Slack & Teams',
    providers: [
      { name: 'Slack', logoText: '💬', tagline: 'Send channel messages & team alerts', status: 'Connected', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      { name: 'Microsoft Teams', logoText: '👥', tagline: 'Enterprise team chat & announcement', status: 'Ready', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
    ],
    samplePrompts: [
      { title: 'Send Release Update to Slack', prompt: 'Arohi, send a release notification message to our #engineering channel on Slack summarizing v2.1 deployment.', estTime: 'Instant', tag: 'Slack', priceEst: 'Free' },
      { title: 'Post Announcement on Teams', prompt: 'Arohi, draft and post a general announcement on MS Teams regarding the upcoming holiday schedule.', estTime: 'Instant', tag: 'MS Teams', priceEst: 'Free' }
    ]
  },
  {
    id: 'development',
    name: 'Software Development & Code',
    shortLabel: 'Development',
    icon: Code,
    emoji: '💻',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    description: 'Issue tracking, pull request reviews & workflow automation via GitHub, GitLab & Linear.',
    badge: 'GitHub & Linear',
    providers: [
      { name: 'GitHub', logoText: '🐙', tagline: 'PR reviews, issue creation & commit logs', status: 'Connected', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { name: 'GitLab', logoText: '🦊', tagline: 'DevOps pipeline & repo management', status: 'Ready', badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      { name: 'Linear', logoText: '📐', tagline: 'High-speed issue & sprint planning', status: 'Ready', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
    ],
    samplePrompts: [
      { title: 'Create GitHub Bug Issue', prompt: 'Arohi, create a GitHub issue titled "Fix null pointer in Auth handler" with step-by-step reproduction steps.', estTime: 'Instant', tag: 'GitHub', priceEst: 'Free' },
      { title: 'Check Open Pull Requests', prompt: 'Arohi, fetch all open pull requests on our GitHub repository and highlight those waiting for review.', estTime: 'Instant', tag: 'GitHub PR', priceEst: 'Free' }
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity & Work Management',
    shortLabel: 'Productivity',
    icon: Layers,
    emoji: '📁',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    accentGradient: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    description: 'Manage tasks, sprint boards & workspace docs in Notion, Asana, Jira & Trello.',
    badge: 'Notion & Jira',
    providers: [
      { name: 'Notion', logoText: '📓', tagline: 'Database queries, page creation & notes', status: 'Connected', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      { name: 'Jira', logoText: '🔷', tagline: 'Agile story points & sprint board updates', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'Asana / Trello', logoText: '📋', tagline: 'Task assignments & project tracking', status: 'Ready', badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30' }
    ],
    samplePrompts: [
      { title: 'Add Page in Notion', prompt: 'Arohi, create a new page in my Notion workspace titled "Weekly Sprint Goals" and add 5 starter checkboxes.', estTime: 'Instant', tag: 'Notion', priceEst: 'Free' },
      { title: 'Update Jira Ticket Status', prompt: 'Arohi, find Jira ticket PROJ-104 and update its status to "In Code Review".', estTime: 'Instant', tag: 'Jira', priceEst: 'Free' }
    ]
  },
  {
    id: 'data',
    name: 'Databases & Analytics',
    shortLabel: 'Data & SQL',
    icon: Database,
    emoji: '📊',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    accentGradient: 'from-cyan-500/20 via-blue-500/20 to-teal-500/20',
    description: 'Execute natural language analytics queries on PostgreSQL, MySQL, Snowflake & BigQuery.',
    badge: 'PostgreSQL & BigQuery',
    providers: [
      { name: 'PostgreSQL', logoText: '🐘', tagline: 'Relational DB queries & schema inspection', status: 'Connected', badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
      { name: 'Google BigQuery', logoText: '🔍', tagline: 'Serverless petabyte warehouse analytics', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'Snowflake', logoText: '❄️', tagline: 'Cloud data warehouse query execution', status: 'Ready', badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30' }
    ],
    samplePrompts: [
      { title: 'Query Active Users Count', prompt: 'Arohi, run a PostgreSQL query to count total active users who signed up in the last 30 days.', estTime: 'Instant', tag: 'PostgreSQL', priceEst: 'Free' },
      { title: 'BigQuery Revenue Analytics', prompt: 'Arohi, execute a BigQuery sql query on sales dataset to show monthly revenue broken down by product category.', estTime: 'Instant', tag: 'BigQuery', priceEst: 'Free' }
    ]
  },
  {
    id: 'web',
    name: 'Web, Live APIs & Search Engine',
    shortLabel: 'Web & APIs',
    icon: Globe,
    emoji: '🌐',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    accentGradient: 'from-teal-500/20 via-emerald-500/20 to-cyan-500/20',
    description: 'Live web scraping, real-time search engines, news feeds & external REST API calls.',
    badge: 'Live Search',
    providers: [
      { name: 'Arohi Web Search Engine', logoText: '🔍', tagline: 'Real-time multi-engine live search', status: 'Connected', badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
      { name: 'REST API Connector', logoText: '⚡', tagline: 'Custom HTTP GET/POST API invocation', status: 'Connected', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
    ],
    samplePrompts: [
      { title: 'Live Stock Market News', prompt: 'Arohi, fetch the latest live stock market news for Nifty 50 and Sensex today from real-time web search.', estTime: 'Instant', tag: 'Live News', priceEst: 'Free' },
      { title: 'Fetch Public Weather API', prompt: 'Arohi, query open weather API for Delhi current temperature and 3-day forecast.', estTime: 'Instant', tag: 'API Fetch', priceEst: 'Free' }
    ]
  },
  {
    id: 'commerce',
    name: 'Quick Commerce & Grocery',
    shortLabel: 'Groceries',
    icon: ShoppingBag,
    emoji: '🛒',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    accentGradient: 'from-amber-500/20 via-orange-500/20 to-purple-600/20',
    description: '10-minute instant delivery for fresh milk, vegetables, snacks & daily essentials.',
    badge: '10 Mins',
    providers: [
      { name: 'Blinkit', logoText: '💛', tagline: '10-minute grocery & essentials', status: 'Connected', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { name: 'Zepto', logoText: '💜', tagline: 'Instant quick commerce delivery', status: 'Connected', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      { name: 'Swiggy Instamart', logoText: '🧡', tagline: 'Grocery & snacks delivered fast', status: 'Ready', badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      { name: 'BigBasket Now', logoText: '💚', tagline: 'Tata fresh produce & groceries', status: 'Ready', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
    ],
    samplePrompts: [
      { title: 'Milk & Brown Bread', prompt: 'Arohi, order 2 packets of Amul Taaza Milk and 1 loaf of brown bread on Blinkit to my address.', estTime: '8-10 mins', tag: 'Blinkit', priceEst: '₹124' },
      { title: 'Fresh Onions & Tomatoes', prompt: 'Arohi, order 1 kg fresh onions, 1 kg tomatoes, and coriander on Zepto.', estTime: '10 mins', tag: 'Zepto', priceEst: '₹95' },
      { title: 'Party Snacks & Beverages', prompt: 'Arohi, add 2 bottles of Coca-Cola and 2 packs of Lays Chips to cart on Swiggy Instamart.', estTime: '12 mins', tag: 'Instamart', priceEst: '₹160' }
    ]
  },
  {
    id: 'food',
    name: 'Food & Dining Delivery',
    shortLabel: 'Food',
    icon: Utensils,
    emoji: '🍔',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    accentGradient: 'from-orange-500/20 via-rose-500/20 to-amber-500/20',
    description: 'Restaurant food ordering, instant price comparison & ONDC food deals.',
    badge: 'Best Deals',
    providers: [
      { name: 'Zomato', logoText: '🔴', tagline: 'Food delivery & restaurant dining', status: 'Connected', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
      { name: 'Swiggy', logoText: '🧡', tagline: 'Delivering happiness to doorstep', status: 'Connected', badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      { name: 'ONDC Food', logoText: '🔵', tagline: 'Direct restaurant network lowest price', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
    ],
    samplePrompts: [
      { title: 'Paneer Masala & Naan', prompt: 'Arohi, compare price for Paneer Butter Masala & 4 Butter Naans on Zomato and Swiggy from Haldiram\'s and order from whichever is cheaper.', estTime: '25-30 mins', tag: 'Zomato/Swiggy', priceEst: '₹390' },
      { title: 'Healthy Protein Bowl', prompt: 'Arohi, find top-rated healthy protein bowls near me on Zomato with 4+ rating and place order.', estTime: '20 mins', tag: 'Zomato', priceEst: '₹240' },
      { title: 'Pizza Buy-1-Get-1 Deal', prompt: 'Arohi, check Domino\'s buy-1-get-1 pizza deals on Swiggy and order to my address.', estTime: '25 mins', tag: 'Swiggy', priceEst: '₹450' }
    ]
  },
  {
    id: 'mobility',
    name: 'Mobility, Cabs & Rides',
    shortLabel: 'Mobility',
    icon: Car,
    emoji: '🚖',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    accentGradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    description: 'Instant ride hailing, live fare comparison across Uber, Ola, Rapido & Namma Yatri.',
    badge: 'Live Fares',
    providers: [
      { name: 'Uber India', logoText: '⬛', tagline: 'UberGo, Premier & Auto booking', status: 'Connected', badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
      { name: 'Ola Cabs', logoText: '🟨', tagline: 'Ola Mini, Prime & Outstation', status: 'Connected', badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      { name: 'Rapido', logoText: '🛵', tagline: 'Fast bike taxis & affordable autos', status: 'Ready', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { name: 'Namma Yatri', logoText: '🚕', tagline: 'Zero commission direct auto rides', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
    ],
    samplePrompts: [
      { title: 'Airport Taxi Comparison', prompt: 'Arohi, compare cab fares to Indira Gandhi International Airport T3 right now on Uber and Ola.', estTime: '3 mins pickup', tag: 'Uber/Ola', priceEst: '₹420' },
      { title: 'Quick Rapido Auto Ride', prompt: 'Arohi, book a Rapido Auto from my current location to Connaught Place Delhi.', estTime: '2 mins pickup', tag: 'Rapido', priceEst: '₹85' }
    ]
  },
  {
    id: 'payments',
    name: 'Payments & Financial Transactions',
    shortLabel: 'Payments',
    icon: CreditCard,
    emoji: '💳',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    description: 'UPI QR payment authorization, Razorpay checkout, bill payments & FASTag recharges.',
    badge: 'UPI & Razorpay',
    providers: [
      { name: 'Arohi UPI Pay', logoText: '💳', tagline: 'Instant UPI & Razorpay modal checkout', status: 'Connected', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { name: 'BBPS Bill Pay', logoText: '🏛️', tagline: 'Electricity, Water & FASTag recharge', status: 'Connected', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
    ],
    samplePrompts: [
      { title: 'Pay Electricity Bill', prompt: 'Arohi, fetch my latest state electricity bill amount and help me pay via UPI.', estTime: '1 min', tag: 'BBPS', priceEst: 'Fetch Bill' },
      { title: 'Recharge FASTag Balance', prompt: 'Arohi, check my ICICI Bank FASTag balance and recharge with ₹500.', estTime: 'Instant', tag: 'FASTag', priceEst: '₹500' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel, Flights & Railways',
    shortLabel: 'Travel',
    icon: Plane,
    emoji: '🏨',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    accentGradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    description: 'IRCTC train Tatkal/seat check, flight ticket booking & holiday tour packages.',
    badge: 'IRCTC Sync',
    providers: [
      { name: 'IRCTC Rail', logoText: '🚂', tagline: 'Official train ticket booking & Tatkal', status: 'Connected', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      { name: 'MakeMyTrip', logoText: '✈️', tagline: 'Flight, hotel & holiday packages', status: 'Connected', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
    ],
    samplePrompts: [
      { title: 'IRCTC 2AC Seat Search', prompt: 'Arohi, check 2AC train seat availability on IRCTC for Rajdhani Express from New Delhi to Mumbai Central for this Friday.', estTime: 'Instant', tag: 'IRCTC', priceEst: '₹2,450' },
      { title: 'Cheapest Flight Search', prompt: 'Arohi, find the cheapest flight ticket from Bangalore to Delhi for next Tuesday under ₹5,000.', estTime: 'Instant', tag: 'MakeMyTrip', priceEst: '₹4,200' }
    ]
  },
  {
    id: 'documents',
    name: 'Documents, PDFs & Spreadsheets',
    shortLabel: 'Documents',
    icon: FileText,
    emoji: '📄',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    accentGradient: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    description: 'PDF text extraction, Word document creation, Google Sheets live sync & data export.',
    badge: 'PDF & Sheets',
    providers: [
      { name: 'PDF & Doc Engine', logoText: '📄', tagline: 'Extract text, split, merge & convert PDFs', status: 'Connected', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { name: 'Google Sheets MCP', logoText: '📊', tagline: 'Live spreadsheet append & calculation', status: 'Connected', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
    ],
    samplePrompts: [
      { title: 'Append Rows to Google Sheet', prompt: 'Arohi, add today\'s 5 customer review feedback items directly into my Google Sheet named "Customer Feedback 2026".', estTime: 'Instant', tag: 'Sheets', priceEst: 'Free' },
      { title: 'Summarize Attached PDF', prompt: 'Arohi, extract and summarize key terms from the attached agreement PDF file.', estTime: 'Instant', tag: 'PDF Engine', priceEst: 'Free' }
    ]
  },
  {
    id: 'business',
    name: 'Business, CRM & ERP Systems',
    shortLabel: 'Business',
    icon: Briefcase,
    emoji: '🧑‍💼',
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/10',
    borderColor: 'border-fuchsia-500/30',
    accentGradient: 'from-fuchsia-500/20 via-purple-500/20 to-rose-500/20',
    description: 'Manage sales leads, CRM contacts, ERP inventory & accounting invoices in Zoho, Salesforce & Tally.',
    badge: 'CRM & Accounting',
    providers: [
      { name: 'Zoho CRM & Books', logoText: '💼', tagline: 'Lead pipeline & GST invoice management', status: 'Connected', badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' },
      { name: 'Salesforce MCP', logoText: '☁️', tagline: 'Enterprise customer relationship management', status: 'Ready', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'Tally Prime ERP', logoText: '📊', tagline: 'Accounting voucher entry & GST returns', status: 'Ready', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' }
    ],
    samplePrompts: [
      { title: 'Create Lead in Zoho CRM', prompt: 'Arohi, create a new high-priority sales lead in Zoho CRM for client "TechCorp India" with budget ₹5,00,000.', estTime: 'Instant', tag: 'Zoho CRM', priceEst: 'Free' },
      { title: 'Generate GST Sales Invoice', prompt: 'Arohi, generate a draft GST sales invoice in Zoho Books for 10 consulting hours at ₹2,500/hr.', estTime: 'Instant', tag: 'Zoho Books', priceEst: 'Free' }
    ]
  },
  {
    id: 'health',
    name: 'Healthcare, Hospitals & Emergency',
    shortLabel: 'Health & Doctors',
    icon: Stethoscope,
    emoji: '🏥',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    accentGradient: 'from-rose-500/20 via-red-500/20 to-orange-500/20',
    description: 'Hospital doctor appointment scheduling, 24/7 pharmacy refills, lab tests & emergency SOS.',
    badge: 'Appointments & SOS',
    providers: [
      { name: 'Apollo Hospitals', logoText: '🏥', tagline: 'Specialist doctor appointment booking', status: 'Connected', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
      { name: 'Fortis / Max Health', logoText: '👨‍⚕️', tagline: 'Top multispecialty clinic appointments', status: 'Connected', badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30' },
      { name: 'Tata 1mg', logoText: '💊', tagline: 'Prescription medicines & home lab tests', status: 'Connected', badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      { name: 'Emergency SOS', logoText: '🚨', tagline: 'Instant ambulance dispatch & hospital alert', status: 'Connected', badgeBg: 'bg-red-600/30 text-red-200 border-red-500/40 animate-pulse' }
    ],
    samplePrompts: [
      { title: 'Schedule Doctor Appointment', prompt: 'Arohi, schedule a hospital appointment at Apollo Specialty Hospital with Dr. Sharma for a cardiology consultation tomorrow at 10:30 AM.', estTime: 'Instant Slot', tag: 'Apollo Hospitals', priceEst: '₹850' },
      { title: 'Refill Monthly Medicines', prompt: 'Arohi, re-order my monthly medicine on Tata 1mg using my saved prescription.', estTime: 'Same day', tag: 'Tata 1mg', priceEst: '₹350' },
      { title: '🚨 Emergency Ambulance SOS', prompt: 'Arohi, emergency SOS! Book an emergency ambulance immediately to my GPS location and notify nearby hospital.', estTime: 'Immediate', tag: 'SOS Dispatch', priceEst: 'Free Alert' }
    ]
  },
  {
    id: 'utility',
    name: 'LPG Gas, Bills & Recharge',
    shortLabel: 'Bills & Gas',
    icon: Flame,
    emoji: '🔥',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    description: 'LPG gas cylinder refill, BBPS electricity, water & FASTag bill payments.',
    badge: 'BBPS Pay',
    providers: [
      { name: 'Indane Gas', logoText: '🔥', tagline: 'LPG refill booking & online payment', status: 'Connected', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { name: 'Bharat Gas', logoText: '🔵', tagline: 'Bharat Petroleum LPG cylinder booking', status: 'Connected', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { name: 'BBPS Bill Pay', logoText: '🏛️', tagline: 'Electricity, Water & FASTag recharge', status: 'Connected', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
    ],
    samplePrompts: [
      { title: 'Refill LPG Gas Cylinder', prompt: 'Arohi, book my Indane LPG gas cylinder refill for my registered consumer number and confirm booking status.', estTime: '1 min', tag: 'Indane', priceEst: '₹803' }
    ]
  }
];

export default function McpGatewayModal({ isOpen, onClose, onSendPromptToChat }: McpGatewayModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('email');
  const [userAddress, setUserAddress] = useState<string>('MG Road, Connaught Place, New Delhi 110001');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customCommand, setCustomCommand] = useState<string>('');
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeCategory = MCP_CATEGORIES.find(c => c.id === selectedCatId) || MCP_CATEGORIES[0];

  const filteredCategories = MCP_CATEGORIES.filter(cat => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return cat.name.toLowerCase().includes(q) || 
           cat.description.toLowerCase().includes(q) ||
           cat.samplePrompts.some(p => p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q)) ||
           cat.providers.some(pr => pr.name.toLowerCase().includes(q));
  });

  const handleExecutePrompt = (promptText: string) => {
    const fullPrompt = `${promptText}\n\n[Delivery Address: ${userAddress}]`;
    onSendPromptToChat(fullPrompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-[#090618] border-t sm:border border-[#2d1e5e] rounded-t-3xl sm:rounded-3xl w-full max-w-4xl h-[94vh] sm:h-[88vh] flex flex-col overflow-hidden shadow-2xl text-white font-sans relative">
        
        {/* Top Sticky Header */}
        <div className="bg-gradient-to-r from-[#110a2d] via-[#1a1040] to-[#0e0726] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#291a52] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#090618] flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                  Apps & Everyday Tasks
                </h3>
                <span className="hidden sm:inline-flex text-[9px] bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-amber-500/30 items-center gap-1 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                Order groceries, book rides, schedule appointments & draft emails with Arohi AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              onClick={() => setShowSpecModal(true)}
              className="bg-[#1b123d] hover:bg-[#271a54] text-amber-300 border border-amber-500/30 text-[11px] font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="How connected apps work"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">How it works</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl bg-[#160f33] hover:bg-[#23184d] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Address Bar & Search Row */}
        <div className="bg-[#100a2a] px-3.5 sm:px-6 py-2.5 border-b border-[#221647] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          
          {/* Address Input */}
          <div className="flex items-center gap-2 bg-[#170e3b] border border-[#2e1d61] rounded-xl px-3 py-1.5 flex-1 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-[10px] font-bold text-amber-300 shrink-0 uppercase tracking-wider">Address:</span>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full truncate font-medium"
              placeholder="Enter delivery address..."
            />
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs min-w-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., milk, cab, food)..."
              className="w-full bg-[#170e3b] border border-[#2e1d61] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>
        </div>

        {/* Horizontal Swipable Category Pills Bar */}
        <div className="bg-[#0c0822] px-3 sm:px-6 py-2.5 border-b border-[#211545] overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          {(filteredCategories.length > 0 ? filteredCategories : MCP_CATEGORIES).map((cat) => {
            const isSelected = selectedCatId === cat.id;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-slate-950 border-amber-300 shadow-lg scale-105'
                    : 'bg-[#150e33] text-slate-300 border-[#281b52] hover:bg-[#1d1345] hover:text-white'
                }`}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span>{cat.shortLabel}</span>
                {cat.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-5">
          
          {/* Active Category Banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${activeCategory.accentGradient} border ${activeCategory.borderColor} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${activeCategory.bgColor} ${activeCategory.borderColor} border shrink-0`}>
                <activeCategory.icon className={`w-6 h-6 ${activeCategory.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-extrabold text-white">{activeCategory.name}</h2>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                    Ready
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{activeCategory.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-300 bg-[#090618]/60 border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human Approval Enforced</span>
            </div>
          </div>

          {/* Connected Provider Badges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                Connected Services ({activeCategory.providers.length})
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> All APIs Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeCategory.providers.map((pr, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-[#120b2e] border border-[#271954] p-2.5 rounded-xl flex items-center gap-2 hover:border-purple-500/40 transition-all"
                >
                  <span className="text-base shrink-0">{pr.logoText}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">{pr.name}</p>
                    <p className="text-[9px] text-slate-400 truncate">{pr.tagline}</p>
                  </div>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border shrink-0 ${pr.badgeBg}`}>
                    {pr.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pure Actionable Prompts List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Tap Action Execution Cards
              </span>
              <span className="text-[10px] text-amber-300 font-bold">
                Tap any card to order / book directly
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeCategory.samplePrompts.map((sp, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => handleExecutePrompt(sp.prompt)}
                  className="bg-gradient-to-b from-[#160d38] to-[#12092e] hover:from-[#221352] hover:to-[#1b0d45] border border-[#311f6e] hover:border-amber-400 p-4 rounded-2xl cursor-pointer transition-all flex flex-col justify-between gap-3 group shadow-md hover:shadow-amber-500/10 hover:scale-[1.02]"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        {sp.tag}
                      </span>
                      {sp.priceEst && (
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          Est. {sp.priceEst}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors pt-1">
                      {sp.title}
                    </h4>
                    
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                      "{sp.prompt}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#251752] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-amber-400" /> {sp.estTime}
                    </span>

                    <button
                      type="button"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md transition-all group-hover:scale-105 cursor-pointer"
                    >
                      <span>Execute</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Custom Direct Command Input */}
        <div className="bg-[#0b071a] p-3 sm:p-4 border-t border-[#251752] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customCommand.trim()) {
                handleExecutePrompt(customCommand.trim());
              }
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Sparkles className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="Type custom command (e.g. Arohi, order 1 packet bread on Blinkit & book Uber cab)..."
                className="w-full bg-[#150d38] border border-[#311f6e] focus:border-amber-400 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={!customCommand.trim()}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 hover:opacity-90 disabled:opacity-40 text-slate-950 font-black text-xs px-4 py-2.5 rounded-2xl flex items-center gap-1.5 transition-all shadow-lg shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Launch Action</span>
            </button>
          </form>
        </div>

        {/* How It Works Explainer Drawer */}
        {showSpecModal && (
          <div className="absolute inset-0 z-30 bg-[#090618]/95 backdrop-blur-md p-4 sm:p-6 flex flex-col overflow-hidden text-white animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#291a52] pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-extrabold text-white">
                  How Arohi AI Executes Tasks
                </h3>
              </div>
              <button
                onClick={() => setShowSpecModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-[#180e3b] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              
              <div className="bg-[#120a2e] border border-[#2e1d5e] p-3.5 rounded-2xl text-slate-300">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  🔒 Safe, User-Controlled AI Actions
                </h4>
                <p className="leading-relaxed text-[11px]">
                  When you ask Arohi AI to order groceries, book a cab, schedule an appointment, or draft an email, Arohi automatically prepares the request with all items and details filled in. Arohi will <strong>always show you the details first</strong> so you can review and confirm with a single tap.
                </p>
              </div>

              {/* 3 Simple Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0e0824] border border-[#25174f] p-3.5 rounded-xl space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xs">
                    1
                  </div>
                  <h5 className="font-extrabold text-white text-xs">Ask in Plain Words</h5>
                  <p className="text-[11px] text-slate-400">
                    Simply tell Arohi what you want (e.g. "Order 2 packets of milk on Blinkit" or "Book a cab to Airport").
                  </p>
                </div>

                <div className="bg-[#0e0824] border border-[#25174f] p-3.5 rounded-xl space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-black text-xs">
                    2
                  </div>
                  <h5 className="font-extrabold text-white text-xs">Review Details</h5>
                  <p className="text-[11px] text-slate-400">
                    Arohi creates an easy-to-read summary with prices, estimated time, and addresses.
                  </p>
                </div>

                <div className="bg-[#0e0824] border border-[#25174f] p-3.5 rounded-xl space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xs">
                    3
                  </div>
                  <h5 className="font-extrabold text-white text-xs">Confirm & Open</h5>
                  <p className="text-[11px] text-slate-400">
                    Tap to open your app directly or confirm instantly with complete safety and transparency.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

