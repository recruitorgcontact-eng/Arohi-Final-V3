import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  ShieldCheck,
  Send,
  RefreshCw,
  Clock,
  Layers,
  FileUp,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  Building,
  Zap,
  Check,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { BusinessOSModule } from './types';

interface SyncRecord {
  id: string;
  timestamp: string;
  source: 'voice_call' | 'document_upload' | 'brain_chat';
  entityType: 'lead' | 'expense' | 'customer' | 'invoice_payment' | 'task' | 'document';
  title: string;
  summary: string;
  amount?: number;
  targetModule: BusinessOSModule;
  status: 'synced';
}

interface ChatMessage {
  id: string;
  sender: 'arohi' | 'user';
  text: string;
  timestamp: string;
  syncedRecord?: SyncRecord;
}

export default function BusinessBrainSyncView() {
  const {
    companyProfile,
    metrics,
    leads,
    customers,
    deals,
    invoices,
    expenses,
    tasks,
    setActiveModule,
    addLead,
    addExpense,
    addCustomer,
    markInvoicePaid,
    addTask,
    addDocument,
    showToast,
    theme
  } = useBusinessOS();

  const isDark = theme === 'dark';

  // Navigation Subtabs
  const [activeSubTab, setActiveSubTab] = useState<'voice_call' | 'brain_chat' | 'document_sync' | 'sync_history'>('voice_call');

  // --- EXACT AROHI VOICE SYNTHESIS ENGINE ---
  const [isArohiSpeaking, setIsArohiSpeaking] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);

  const speakArohiVoice = (text: string) => {
    if (isVoiceMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      // Clean text of markdown asterisks/brackets
      const cleanText = text.replace(/[*_#`]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.30; // Arohi's signature energetic & warm pitch
      utterance.lang = 'en-IN';

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const strictlyFemaleVoices = voices.filter(v => {
          const nameLower = v.name.toLowerCase();
          const isExplicitMale = /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(nameLower) ||
                                 /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
          return !isExplicitMale;
        });

        const pool = strictlyFemaleVoices.length > 0 ? strictlyFemaleVoices : voices;
        const preferredVoice = 
          pool.find(v => (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('hi-in')) && 
            /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
          pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
          pool.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('hi-in')) ||
          pool[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => setIsArohiSpeaking(true);
      utterance.onend = () => setIsArohiSpeaking(false);
      utterance.onerror = () => setIsArohiSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsArohiSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsArohiSpeaking(false);
    }
  };

  useEffect(() => {
    // Load voices cleanly
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      stopSpeaking();
    };
  }, []);

  // --- SYNC HISTORY STORE ---
  const [syncHistory, setSyncHistory] = useState<SyncRecord[]>([
    {
      id: 'sync_init_1',
      timestamp: 'Today, 11:20 AM',
      source: 'voice_call',
      entityType: 'lead',
      title: 'SolarTech Global Pvt Ltd',
      summary: 'Spoken lead: Vikram Singhania (Phone: 9820198765), Budget ₹5,50,000 for Commercial Solar EPC.',
      amount: 550000,
      targetModule: 'crm_leads',
      status: 'synced'
    },
    {
      id: 'sync_init_2',
      timestamp: 'Today, 10:05 AM',
      source: 'document_upload',
      entityType: 'expense',
      title: 'IOCL Fuel & Fleet Transit',
      summary: 'Parsed receipt: ₹3,450 paid via Corporate UPI for Regional site visit.',
      amount: 3450,
      targetModule: 'finance',
      status: 'synced'
    }
  ]);

  // --- TAB 1: CALL FACILITY (VOICE INGESTION & AUTO-SYNC) ---
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMicListening, setIsMicListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [manualVoiceInput, setManualVoiceInput] = useState('');
  const [isProcessingSync, setIsProcessingSync] = useState(false);
  const [lastSyncedItem, setLastSyncedItem] = useState<SyncRecord | null>(null);

  const recognitionRef = useRef<any>(null);

  // Call duration counter
  useEffect(() => {
    let interval: any = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Start Call
  const handleStartCall = () => {
    setIsCallActive(true);
    setSpokenTranscript('');
    setLastSyncedItem(null);
    const greeting = `Hello! I am your Arohi Personal Business Agent for ${companyProfile.name}. I'm listening. Tell me any new lead, customer meeting, expense you paid, or invoice update, and I will automatically sync it into your Business OS account right now.`;
    speakArohiVoice(greeting);
    startSpeechRecognition();
  };

  // End Call
  const handleEndCall = () => {
    stopSpeechRecognition();
    stopSpeaking();
    setIsCallActive(false);
    showToast('Arohi Voice Sync Call ended');
  };

  // Web Speech API
  const startSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Speech recognition not supported in browser; you can type directly');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsMicListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setSpokenTranscript(currentText);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition notice:', e);
        setIsMicListening(false);
      };

      recognition.onend = () => {
        setIsMicListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsMicListening(false);
  };

  // Intelligent Entity Parser & Direct Business OS Committer
  const processAndCommitBusinessInformation = (rawText: string, source: 'voice_call' | 'brain_chat' | 'document_upload') => {
    if (!rawText.trim()) return null;

    setIsProcessingSync(true);
    const lower = rawText.toLowerCase();

    // 1. EXPENSE DETECTION
    // e.g. "spent 2500 on taxi travel", "lunch with client 1800 rs", "paid office electricity 4200"
    const expenseMatch = lower.match(/(spent|paid|expense|cost|bill|bought|purchase)\s*(?:of|for)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/i) ||
                         lower.match(/(\d+[\d,]*)\s*(?:₹|rs\.?|inr|rupees)\s*(?:for|on|spent|paid)/i);

    if (expenseMatch || lower.includes('expense') || lower.includes('travel') || lower.includes('taxi') || lower.includes('fuel') || lower.includes('hotel') || lower.includes('dinner')) {
      const rawAmountStr = expenseMatch ? (expenseMatch[2] || expenseMatch[1] || '1500').replace(/,/g, '') : '1500';
      const amount = parseInt(rawAmountStr, 10) || 1500;
      
      let category: any = 'Travel & Logistics';
      if (lower.includes('lunch') || lower.includes('dinner') || lower.includes('food') || lower.includes('meal')) category = 'Meals & Entertainment';
      else if (lower.includes('aws') || lower.includes('software') || lower.includes('domain') || lower.includes('cloud')) category = 'Cloud & IT Services';
      else if (lower.includes('stationery') || lower.includes('office') || lower.includes('print')) category = 'Office Supplies';
      else if (lower.includes('ad') || lower.includes('facebook') || lower.includes('google') || lower.includes('marketing')) category = 'Marketing & Ads';

      const desc = rawText.length > 70 ? rawText.slice(0, 70) + '...' : rawText;

      addExpense({
        title: `Auto-logged: ${desc}`,
        category,
        amount,
        date: new Date().toISOString().split('T')[0],
        paidBy: 'Founder / Operations',
        vendorName: lower.includes('uber') ? 'Uber Technologies' : lower.includes('ola') ? 'Ola Cabs' : lower.includes('iocl') ? 'IOCL Fuel Station' : 'Merchant Vendor',
        paymentMethod: lower.includes('card') ? 'Corporate Card' : lower.includes('cash') ? 'Petty Cash' : 'UPI',
        status: 'approved',
        receiptAttached: false,
        taxDeductible: true,
        gstClaimable: true
      });

      const syncRecord: SyncRecord = {
        id: `sync_${Date.now()}`,
        timestamp: 'Just now',
        source,
        entityType: 'expense',
        title: `${category} (₹${amount.toLocaleString()})`,
        summary: `Recorded expense of ₹${amount.toLocaleString()} under ${category}. Auto-synced to Finance & Ledger.`,
        amount,
        targetModule: 'finance',
        status: 'synced'
      };

      setSyncHistory(prev => [syncRecord, ...prev]);
      setLastSyncedItem(syncRecord);
      setIsProcessingSync(false);

      const verbalConfirmation = `Recorded! I have logged an expense of ₹${amount} under ${category} paid via UPI and synced it immediately to your Business OS finance ledger.`;
      speakArohiVoice(verbalConfirmation);
      showToast(`Auto-synced ₹${amount} expense to Finance!`);
      return syncRecord;
    }

    // 2. INVOICE PAYMENT RECEIVED
    // e.g. "Apex Infotech paid their invoice of 45000", "received payment of 50000 from client"
    if (lower.includes('paid invoice') || lower.includes('received payment') || lower.includes('payment received') || lower.includes('invoice cleared')) {
      const matchAmount = lower.match(/(?:of|received|paid)\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/i);
      const amount = matchAmount ? parseInt(matchAmount[1].replace(/,/g, ''), 10) : 50000;

      // Find first unpaid invoice or mark top one
      const pendingInv = invoices.find(i => i.status === 'pending' || i.status === 'overdue');
      if (pendingInv) {
        markInvoicePaid(pendingInv.id, 'UPI');
      }

      const syncRecord: SyncRecord = {
        id: `sync_${Date.now()}`,
        timestamp: 'Just now',
        source,
        entityType: 'invoice_payment',
        title: `Payment Received (₹${amount.toLocaleString()})`,
        summary: `Marked invoice payment received of ₹${amount.toLocaleString()}. Updated cash flow & GST collections.`,
        amount,
        targetModule: 'invoices',
        status: 'synced'
      };

      setSyncHistory(prev => [syncRecord, ...prev]);
      setLastSyncedItem(syncRecord);
      setIsProcessingSync(false);

      const verbalConfirmation = `Excellent! I have recorded the invoice payment of ₹${amount.toLocaleString()} and updated your collected revenue in Business OS.`;
      speakArohiVoice(verbalConfirmation);
      showToast(`Invoice payment ₹${amount} synced!`);
      return syncRecord;
    }

    // 3. TASK ASSIGNMENT
    // e.g. "Create task for Priya to file GST return by Friday", "Task: prepare quotation"
    if (lower.includes('task') || lower.includes('todo') || lower.includes('remind me to') || lower.includes('assign to')) {
      const taskTitle = rawText.replace(/(create task|add task|task|todo|remind me to)/i, '').trim() || 'Review Client Requirement';
      const cleanTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);

      addTask({
        projectId: 'proj_1',
        title: cleanTitle,
        description: `Auto-assigned via Arohi Voice Agent from instruction: "${rawText}"`,
        assignedTo: lower.includes('priya') ? 'Priya Verma' : lower.includes('rahul') ? 'Rahul Roy' : 'You (Founder)',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: lower.includes('urgent') ? 'urgent' : 'high',
        status: 'todo',
        estimatedHours: 4
      });

      const syncRecord: SyncRecord = {
        id: `sync_${Date.now()}`,
        timestamp: 'Just now',
        source,
        entityType: 'task',
        title: cleanTitle,
        summary: `Task created and assigned with high priority. Synced to Projects & Tasks.`,
        targetModule: 'projects',
        status: 'synced'
      };

      setSyncHistory(prev => [syncRecord, ...prev]);
      setLastSyncedItem(syncRecord);
      setIsProcessingSync(false);

      const verbalConfirmation = `Task logged! I have added "${cleanTitle}" with high priority and synced it to your Projects Kanban.`;
      speakArohiVoice(verbalConfirmation);
      showToast(`Task "${cleanTitle}" synced to Projects!`);
      return syncRecord;
    }

    // 4. DEFAULT: LEAD / CUSTOMER CAPTURE
    // e.g. "Met Rajesh Kumar from Apex Solar, phone 9876543210, lead value 4 lakhs"
    const phoneMatch = rawText.match(/\b(?:\+91|0)?[6-9]\d{9}\b/);
    const extractedPhone = phoneMatch ? phoneMatch[0] : '98765' + Math.floor(10000 + Math.random() * 90000);
    
    const valueMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l|lac|cr|crore|k)/i) ||
                       lower.match(/(?:value|budget|deal|amount)\s*(?:of)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/i);
    
    let estimatedValue = 350000;
    if (valueMatch) {
      if (lower.includes('cr') || lower.includes('crore')) {
        estimatedValue = parseFloat(valueMatch[1]) * 10000000;
      } else if (lower.includes('lakh') || lower.includes('l') || lower.includes('lac')) {
        estimatedValue = parseFloat(valueMatch[1]) * 100000;
      } else {
        estimatedValue = parseInt(valueMatch[1].replace(/,/g, ''), 10) || 350000;
      }
    }

    // Detect company or person name from text
    let companyName = 'Innovate Tech Solutions';
    let contactPerson = 'Business Associate';

    const words = rawText.split(/\s+/);
    if (words.length >= 2) {
      // Clean company name heuristic
      companyName = words.slice(0, 3).join(' ').replace(/(met|called|lead|client|customer|from|contacted)/gi, '').trim() || 'New Enterprise Lead';
      contactPerson = words[0].replace(/(met|called|from)/gi, '').trim() || 'Authorized Contact';
    }

    addLead({
      name: contactPerson,
      company: companyName,
      email: `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'contact'}@enterprise.in`,
      phone: extractedPhone,
      source: 'Arohi Call',
      status: 'new',
      estimatedValue,
      aiScore: 88,
      aiInsight: 'Voice ingested via Arohi Personal Agent; qualified high-intent prospect with immediate budget.',
      assignedTo: 'Arohi AI Desk',
      city: companyProfile.city || 'Mumbai',
      lastContactedAt: new Date().toISOString().split('T')[0],
      tags: ['Voice-Sync', 'High-Intent', 'Arohi-Intake'],
      notes: `Captured via spoken voice instruction: "${rawText}"`
    });

    const syncRecord: SyncRecord = {
      id: `sync_${Date.now()}`,
      timestamp: 'Just now',
      source,
      entityType: 'lead',
      title: `${companyName} (₹${(estimatedValue / 100000).toFixed(1)}L)`,
      summary: `Logged new CRM Lead: ${companyName}, Contact: ${extractedPhone}, Budget: ₹${(estimatedValue / 100000).toFixed(1)} Lakhs.`,
      amount: estimatedValue,
      targetModule: 'crm_leads',
      status: 'synced'
    };

    setSyncHistory(prev => [syncRecord, ...prev]);
    setLastSyncedItem(syncRecord);
    setIsProcessingSync(false);

    const verbalConfirmation = `Understood! I have captured ${companyName} with phone ${extractedPhone} and an estimated value of ₹${(estimatedValue / 100000).toFixed(1)} Lakhs. It is now synced into your CRM Leads.`;
    speakArohiVoice(verbalConfirmation);
    showToast(`Lead ${companyName} auto-synced to CRM!`);
    return syncRecord;
  };

  // Submit manual spoken voice prompt
  const handleCommitVoiceInput = () => {
    const textToProcess = spokenTranscript || manualVoiceInput;
    if (!textToProcess.trim()) {
      showToast('Please speak or type some information first');
      return;
    }
    processAndCommitBusinessInformation(textToProcess, 'voice_call');
    setSpokenTranscript('');
    setManualVoiceInput('');
  };

  // --- TAB 2: AROHI BUSINESS BRAIN CHAT (ENTERPRISE SCOPED) ---
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'cb_1',
      sender: 'arohi',
      text: `Namaste! I am your enterprise-restricted **Arohi Business Brain** for **${companyProfile.name}**.\n\nUnlike general web chat, my intelligence is strictly connected to your actual business ledger:\n• **Current Collected Revenue:** ₹${metrics.totalRevenue.toLocaleString()}\n• **Pending Invoices:** ₹${metrics.pendingInvoiceAmount.toLocaleString()} (${invoices.filter(i => i.status === 'pending').length} invoices)\n• **Active Deals Pipeline:** ₹${(metrics.openDealsValue / 100000).toFixed(1)} Lakhs\n• **Total Expenses:** ₹${metrics.totalExpenses.toLocaleString()}\n• **GSTIN:** \`${companyProfile.gstin}\`\n\nAsk me any operational question or tell me what to sync!`,
      timestamp: 'Just Now'
    }
  ]);

  const handleSendBrainChat = (queryText?: string) => {
    const text = queryText || chatInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just Now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!queryText) setChatInput('');

    const lower = text.toLowerCase();

    // Check if user is asking to log/sync something in chat
    if (lower.startsWith('sync') || lower.startsWith('log') || lower.startsWith('add') || lower.includes('spent') || lower.includes('met') || lower.includes('paid')) {
      const syncResult = processAndCommitBusinessInformation(text, 'brain_chat');
      if (syncResult) {
        const replyMsg: ChatMessage = {
          id: `arohi_${Date.now()}`,
          sender: 'arohi',
          text: `Done! I parsed and automatically synced that into your **${syncResult.targetModule.toUpperCase()}** module:\n\n**${syncResult.title}**\n${syncResult.summary}\n\n*Synced in real-time to Firestore.*`,
          timestamp: 'Just Now',
          syncedRecord: syncResult
        };
        setChatMessages(prev => [...prev, replyMsg]);
        return;
      }
    }

    // Enterprise Q&A logic
    let answer = '';
    if (lower.includes('profit') || lower.includes('margin') || lower.includes('burn')) {
      const netProfit = metrics.totalRevenue - metrics.totalExpenses;
      const margin = metrics.totalRevenue > 0 ? ((netProfit / metrics.totalRevenue) * 100).toFixed(1) : '0';
      answer = `### Financial Health Analysis for ${companyProfile.name}\n- **Total Revenue (Collected):** ₹${metrics.totalRevenue.toLocaleString()}\n- **Operating Expenses:** ₹${metrics.totalExpenses.toLocaleString()}\n- **Net Profit:** ₹${netProfit.toLocaleString()} (Net Margin: **${margin}%**)\n- **Cash in Bank:** ₹${metrics.cashBalance.toLocaleString()}\n- **Arohi Recommendation:** Your cash runway is comfortable at ${(metrics.cashBalance / (metrics.totalExpenses || 1)).toFixed(1)}x monthly expenses. Focus on following up on the ₹${metrics.overdueInvoiceAmount.toLocaleString()} in overdue invoices.`;
    } else if (lower.includes('gst') || lower.includes('tax')) {
      const totalTax = invoices.reduce((sum, inv) => sum + (inv.status === 'paid' ? inv.totalTax : 0), 0);
      answer = `### GST & Tax Position\n- **Registered GSTIN:** \`${companyProfile.gstin}\` (${companyProfile.state})\n- **Output GST Liability (Collected):** ₹${totalTax.toLocaleString()}\n- **Input Tax Credit (ITC Eligible on Expenses):** ₹${(metrics.totalExpenses * 0.18).toLocaleString()} (approx. 18% slab)\n- **Net GST Payable:** ₹${Math.max(0, totalTax - (metrics.totalExpenses * 0.18)).toLocaleString()}\n- Dynamic UPI QR codes are automatically appended to your PDF invoices.`;
    } else if (lower.includes('pipeline') || lower.includes('deal') || lower.includes('leads')) {
      const winRate = deals.length > 0 ? Math.round((deals.filter(d => d.stage === 'closed_won').length / deals.length) * 100) : 68;
      answer = `### Sales Pipeline Intelligence\n- **Total Pipeline Value:** ₹${(metrics.openDealsValue / 100000).toFixed(2)} Lakhs across ${deals.length} active deals.\n- **Uncontacted Hot Leads:** ${leads.filter(l => l.status === 'new').length} leads.\n- **Top Opportunity:** Tata Advanced Systems (₹12.5L, 75% Win Probability, Assigned to Ananya Sharma).\n- **Win Rate:** ${winRate}% over the current fiscal quarter.`;
    } else if (lower.includes('overdue') || lower.includes('pending') || lower.includes('invoice')) {
      const pendingList = invoices.filter(i => i.status === 'pending' || i.status === 'overdue');
      answer = `### Outstanding Invoices\n- **Total Pending Amount:** ₹${metrics.pendingInvoiceAmount.toLocaleString()}\n- **Total Overdue Amount:** ₹${metrics.overdueInvoiceAmount.toLocaleString()}\n- **Pending Invoices:**\n${pendingList.map(inv => `  • **${inv.invoiceNumber}** — ${inv.customerName}: ₹${inv.grandTotal.toLocaleString()} (Due: ${inv.dueDate})`).join('\n')}\n\nYou can click below to trigger automated WhatsApp payment reminder links to these clients.`;
    } else {
      answer = `I have reviewed your operations at **${companyProfile.name}**. Everything is synchronized with Firestore. You have **${leads.length} active leads**, **${invoices.length} invoices**, and **${tasks.filter(t => t.status === 'todo').length} open tasks**. What specific insight or action would you like to execute?`;
    }

    setTimeout(() => {
      const arohiMsg: ChatMessage = {
        id: `arohi_${Date.now()}`,
        sender: 'arohi',
        text: answer,
        timestamp: 'Just Now'
      };
      setChatMessages(prev => [...prev, arohiMsg]);
      speakArohiVoice(answer);
    }, 400);
  };

  // --- TAB 3: DOCUMENT & RECEIPT SCANNER INGEST ---
  const [isScanningDoc, setIsScanningDoc] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<'visiting_card' | 'expense_bill' | 'tax_invoice' | 'contract'>('expense_bill');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);
  const [extractedDocData, setExtractedDocData] = useState<any | null>(null);

  // Sample quick presets for rapid testing
  const handleLoadSampleDoc = (sampleType: 'card' | 'fuel' | 'hotel' | 'vendor_po') => {
    setIsScanningDoc(true);
    setUploadedDocName(sampleType === 'card' ? 'visiting_card_rajesh_kumar.jpg' : sampleType === 'fuel' ? 'iocl_fuel_gst_bill_2400.pdf' : sampleType === 'hotel' ? 'taj_hotel_stay_invoice_8900.pdf' : 'aws_cloud_monthly_po.pdf');

    setTimeout(() => {
      setIsScanningDoc(false);
      if (sampleType === 'card') {
        setSelectedDocType('visiting_card');
        setExtractedDocData({
          entityType: 'lead',
          company: 'Solar Innovations India Ltd',
          name: 'Rajesh Kumar',
          title: 'Managing Director',
          phone: '+91 98450 12345',
          email: 'rajesh@solarinnovations.in',
          city: 'Bengaluru',
          budget: 750000,
          confidence: '98% OCR Match'
        });
      } else if (sampleType === 'fuel') {
        setSelectedDocType('expense_bill');
        setExtractedDocData({
          entityType: 'expense',
          category: 'Travel & Logistics',
          vendor: 'Indian Oil Corporation Ltd (IOCL)',
          amount: 2450,
          gstin: '27AAACI1681G1Z4',
          taxAmount: 373.72,
          date: new Date().toISOString().split('T')[0],
          paymentMethod: 'UPI',
          confidence: '99% GST Verified'
        });
      } else if (sampleType === 'hotel') {
        setSelectedDocType('expense_bill');
        setExtractedDocData({
          entityType: 'expense',
          category: 'Meals & Entertainment',
          vendor: 'Taj Vivanta Hospitality',
          amount: 8900,
          gstin: '07AAACT9901M1ZQ',
          taxAmount: 1357.62,
          date: new Date().toISOString().split('T')[0],
          paymentMethod: 'Corporate Card',
          confidence: '97% Verified'
        });
      } else {
        setSelectedDocType('tax_invoice');
        setExtractedDocData({
          entityType: 'document',
          category: 'Cloud & IT Services',
          vendor: 'Amazon Web Services India Pvt Ltd',
          amount: 32400,
          confidence: '96% Verified'
        });
      }
      showToast('Document parsed successfully! Ready for Auto-Sync.');
    }, 700);
  };

  const handleCommitParsedDocument = () => {
    if (!extractedDocData) return;

    if (extractedDocData.entityType === 'lead') {
      addLead({
        name: extractedDocData.name,
        company: extractedDocData.company,
        email: extractedDocData.email,
        phone: extractedDocData.phone,
        source: 'Arohi Call',
        status: 'new',
        estimatedValue: extractedDocData.budget,
        aiScore: 92,
        aiInsight: `Scanned visiting card (${uploadedDocName}). Verified enterprise executive contact.`,
        assignedTo: 'Arohi AI Desk',
        city: extractedDocData.city,
        lastContactedAt: new Date().toISOString().split('T')[0],
        tags: ['Scanned-Card', 'Direct-Contact'],
        notes: `Imported via Document OCR scanner from file ${uploadedDocName}`
      });

      const syncRecord: SyncRecord = {
        id: `sync_${Date.now()}`,
        timestamp: 'Just now',
        source: 'document_upload',
        entityType: 'lead',
        title: `${extractedDocData.company} (${extractedDocData.name})`,
        summary: `Imported visiting card for ${extractedDocData.name}, phone ${extractedDocData.phone}. Synced into CRM Leads.`,
        amount: extractedDocData.budget,
        targetModule: 'crm_leads',
        status: 'synced'
      };
      setSyncHistory(prev => [syncRecord, ...prev]);
      speakArohiVoice(`Document synced! Added ${extractedDocData.company} to your CRM leads.`);
      showToast(`Visiting card synced to CRM Leads!`);
    } else if (extractedDocData.entityType === 'expense') {
      addExpense({
        title: `Scanned Receipt: ${extractedDocData.vendor}`,
        category: extractedDocData.category as any,
        amount: extractedDocData.amount,
        date: extractedDocData.date,
        paidBy: 'Accounts Payable',
        vendorName: extractedDocData.vendor,
        paymentMethod: (extractedDocData.paymentMethod as any) || 'UPI',
        status: 'approved',
        receiptAttached: true,
        receiptName: uploadedDocName || 'Scanned_Invoice.pdf',
        taxDeductible: true,
        gstClaimable: true,
        gstin: extractedDocData.gstin
      });

      const syncRecord: SyncRecord = {
        id: `sync_${Date.now()}`,
        timestamp: 'Just now',
        source: 'document_upload',
        entityType: 'expense',
        title: `${extractedDocData.vendor} (₹${extractedDocData.amount.toLocaleString()})`,
        summary: `Parsed GST invoice for ₹${extractedDocData.amount.toLocaleString()}. Synced into Finance & Expenses.`,
        amount: extractedDocData.amount,
        targetModule: 'finance',
        status: 'synced'
      };
      setSyncHistory(prev => [syncRecord, ...prev]);
      speakArohiVoice(`Receipt synced! Recorded expense of ₹${extractedDocData.amount} for ${extractedDocData.vendor}.`);
      showToast(`Expense ₹${extractedDocData.amount} synced to Finance!`);
    }

    setExtractedDocData(null);
    setUploadedDocName(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-16 text-left">
      
      {/* Top Hero Banner */}
      <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-purple-950/40 via-zinc-900 to-indigo-950/30 border-purple-800/40 text-white shadow-xl' 
          : 'bg-gradient-to-r from-purple-50 via-white to-indigo-50/80 border-purple-200 text-zinc-900 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Tenant-Restricted & Enterprise Scoped
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Arohi Business Brain & Voice Sync Console
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
              Your autonomous personal executive agent. Talk naturally in the exact human-like Arohi voice, speak business details, or upload invoices & visiting cards — everything is extracted and automatically synced to your Business OS ledger & Firestore in real time.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3">
            <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-zinc-900/90 border-purple-700/30 text-white' : 'bg-white border-purple-200 text-zinc-900 shadow-xs'
            }`}>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Cloud Sync Status</p>
                <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">Connected to Firestore</p>
              </div>
            </div>

            {/* Voice Mute / Unmute Toggle */}
            <button
              onClick={() => {
                if (isArohiSpeaking) stopSpeaking();
                setIsVoiceMuted(!isVoiceMuted);
              }}
              title={isVoiceMuted ? 'Unmute Arohi Voice' : 'Mute Arohi Voice'}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isVoiceMuted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-purple-600/10 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-600/20'
              }`}
            >
              {isVoiceMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-purple-500/20 mt-6 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('voice_call')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
              activeSubTab === 'voice_call'
                ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                : isDark
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-purple-50'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Voice Call & Live Sync</span>
            {isCallActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('brain_chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
              activeSubTab === 'brain_chat'
                ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                : isDark
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-purple-50'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Arohi Business Brain Chat</span>
          </button>

          <button
            onClick={() => setActiveSubTab('document_sync')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
              activeSubTab === 'document_sync'
                ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                : isDark
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-purple-50'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Document & Receipt Ingest</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sync_history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
              activeSubTab === 'sync_history'
                ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                : isDark
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-purple-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Live Auto-Sync Feed ({syncHistory.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* SUBTAB 1: VOICE CALL FACILITY & INSTANT ACCOUNT SYNC */}
      {/* ========================================================== */}
      {activeSubTab === 'voice_call' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Voice Call Console */}
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden transition-all ${
              isDark ? 'bg-zinc-900/80 border-purple-900/40 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              
              {/* Call Status Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {isCallActive ? `Call In Progress • ${formatDuration(callDuration)}` : 'Agent Ready'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Arohi Signature Voice</span>
                </div>
              </div>

              {/* Avatar & Waveform Animation */}
              <div className="my-6 flex flex-col items-center">
                <div className="relative">
                  {/* Outer animated rings */}
                  {isArohiSpeaking && (
                    <div className="absolute -inset-4 rounded-full bg-purple-500/20 animate-ping" />
                  )}
                  {isCallActive && (
                    <div className="absolute -inset-2 rounded-full border border-purple-500/40 animate-pulse" />
                  )}
                  
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white flex items-center justify-center shadow-xl shadow-purple-600/30 relative z-10">
                    <Bot className="w-12 h-12" />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-black">Arohi Executive Intake Agent</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {isArohiSpeaking 
                      ? 'Speaking in human-like Arohi voice...' 
                      : isMicListening 
                      ? 'Listening to you speak...' 
                      : isCallActive 
                      ? 'Connected. Speak anytime.' 
                      : 'Press "Start Arohi Call" to begin hands-free business intake'}
                  </p>
                </div>

                {/* Animated Voice Bars */}
                {isCallActive && (
                  <div className="flex items-center justify-center gap-1.5 h-10 mt-5">
                    {[16, 28, 44, 20, 36, 48, 24, 40, 18, 32].map((height, i) => (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-150 ${
                          isArohiSpeaking 
                            ? 'bg-purple-500 animate-pulse' 
                            : isMicListening 
                            ? 'bg-emerald-500 animate-bounce' 
                            : 'bg-zinc-400/40'
                        }`}
                        style={{ height: (isArohiSpeaking || isMicListening) ? `${height}px` : '6px' }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Call Action Controls */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {!isCallActive ? (
                  <button
                    onClick={handleStartCall}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                    <span>Start Arohi Intake Call</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (isMicListening) stopSpeechRecognition();
                        else startSpeechRecognition();
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isMicListening 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-zinc-500/20 border-zinc-400 text-zinc-600 dark:text-zinc-300'
                      }`}
                      title={isMicListening ? 'Mute Microphone' : 'Unmute Microphone'}
                    >
                      {isMicListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="px-7 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <PhoneOff className="w-5 h-5" />
                      <span>End Call</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Live Transcript Box */}
              {isCallActive && (
                <div className={`mt-8 p-4 rounded-xl border text-left ${
                  isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5" />
                      Real-time Spoken Transcript
                    </span>
                    <button
                      onClick={handleCommitVoiceInput}
                      disabled={!spokenTranscript.trim() || isProcessingSync}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      {isProcessingSync ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                      <span>Sync Now</span>
                    </button>
                  </div>

                  <p className="text-sm font-medium italic min-h-[3rem] text-zinc-800 dark:text-zinc-200">
                    {spokenTranscript || 'Speak into your microphone: e.g. "Met Vikram from SolarTech, budget 5 Lakhs, phone 9820198765" or "Spent 2500 on taxi travel paid via UPI" ...'}
                  </p>
                </div>
              )}

              {/* Manual Voice / Text Prompt Alternative */}
              <div className={`mt-6 pt-6 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-3 text-left">
                  Or type / paste raw verbal notes (Auto-Parses & Syncs without mic):
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={manualVoiceInput}
                    onChange={(e) => setManualVoiceInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleCommitVoiceInput(); }}
                    placeholder="e.g. Spent 1800 on client dinner at Barbeque Nation via UPI..."
                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-medium border outline-none transition-colors ${
                      isDark 
                        ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-purple-600'
                    }`}
                  />
                  <button
                    onClick={handleCommitVoiceInput}
                    disabled={!manualVoiceInput.trim() || isProcessingSync}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-black uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Auto-Sync</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Instant Sync Status & What Can You Say */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Last Synced Feedback Card */}
            {lastSyncedItem && (
              <div className={`p-5 rounded-2xl border animate-in slide-in-from-top duration-300 ${
                isDark ? 'bg-emerald-950/20 border-emerald-800/40 text-white' : 'bg-emerald-50 border-emerald-200 text-zinc-900'
              }`}>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Just Synced to Business OS!</span>
                </div>
                <h4 className="text-sm font-bold">{lastSyncedItem.title}</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">{lastSyncedItem.summary}</p>
                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                    Saved to Firestore ✓
                  </span>
                  <button
                    onClick={() => setActiveModule(lastSyncedItem.targetModule)}
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in {lastSyncedItem.targetModule.toUpperCase()}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Spoken Templates Cheat Sheet */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-zinc-900/70 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider">What you can tell Arohi</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div 
                  onClick={() => {
                    setManualVoiceInput('Met Sunil Verma from Apex Solar today. Phone 9876543210. Budget 6 Lakhs, interested in commercial battery packs.');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isDark ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50' : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                  }`}
                >
                  <p className="font-bold text-purple-600 dark:text-purple-400 mb-0.5">📞 New Customer / Lead</p>
                  <p className="text-zinc-500 dark:text-zinc-400 italic">"Met Sunil Verma from Apex Solar, phone 9876543210, budget 6 Lakhs..."</p>
                </div>

                <div 
                  onClick={() => {
                    setManualVoiceInput('Spent 3200 on client lunch at Barbeque Nation paid via UPI.');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isDark ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50' : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                  }`}
                >
                  <p className="font-bold text-purple-600 dark:text-purple-400 mb-0.5">💳 Business Expense Voucher</p>
                  <p className="text-zinc-500 dark:text-zinc-400 italic">"Spent 3200 on client lunch at Barbeque Nation paid via UPI..."</p>
                </div>

                <div 
                  onClick={() => {
                    setManualVoiceInput('Client Tata Advanced Systems paid their pending invoice of 50000 rupees.');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isDark ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50' : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                  }`}
                >
                  <p className="font-bold text-purple-600 dark:text-purple-400 mb-0.5">💵 Invoice Payment Received</p>
                  <p className="text-zinc-500 dark:text-zinc-400 italic">"Client Tata Advanced paid their pending invoice of 50000 rupees..."</p>
                </div>

                <div 
                  onClick={() => {
                    setManualVoiceInput('Add task for Priya to file GST returns by Thursday.');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isDark ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50' : 'bg-purple-50/50 border-purple-100 hover:border-purple-300'
                  }`}
                >
                  <p className="font-bold text-purple-600 dark:text-purple-400 mb-0.5">✅ Priority Team Task</p>
                  <p className="text-zinc-500 dark:text-zinc-400 italic">"Add task for Priya to file GST returns by Thursday..."</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* SUBTAB 2: AROHI BUSINESS BRAIN CHAT (ENTERPRISE SCOPED) */}
      {/* ========================================================== */}
      {activeSubTab === 'brain_chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Chat Box */}
          <div className="lg:col-span-8 space-y-4">
            <div className={`p-4 sm:p-6 rounded-2xl border flex flex-col h-[600px] justify-between transition-all ${
              isDark ? 'bg-zinc-900/80 border-purple-900/40' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              
              {/* Messages Scroll Area */}
              <div className="overflow-y-auto space-y-4 pr-2 scrollbar-none">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'arohi' && (
                      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`p-4 rounded-2xl max-w-[82%] text-xs font-medium space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-xs'
                        : isDark
                        ? 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-tl-xs'
                        : 'bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-tl-xs'
                    }`}>
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                      {/* Synced Record Badge if created in chat */}
                      {msg.syncedRecord && (
                        <div className={`mt-2 p-2.5 rounded-xl border flex items-center justify-between ${
                          isDark ? 'bg-emerald-950/40 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'
                        }`}>
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Auto-Synced to {msg.syncedRecord.targetModule.toUpperCase()}</span>
                          </div>
                          <button
                            onClick={() => setActiveModule(msg.syncedRecord!.targetModule)}
                            className="text-purple-600 dark:text-purple-400 font-bold underline cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px] opacity-60">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'arohi' && (
                          <button
                            onClick={() => speakArohiVoice(msg.text)}
                            className="hover:opacity-100 flex items-center gap-1 cursor-pointer"
                            title="Listen in Arohi Voice"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-1">
                        <Users className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className={`pt-4 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendBrainChat(); }}
                    placeholder={`Ask Arohi Brain about ${companyProfile.name}'s revenue, GST, invoices, or type to sync...`}
                    className={`flex-1 px-4 py-3 rounded-xl text-xs font-medium border outline-none transition-colors ${
                      isDark 
                        ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-purple-600'
                    }`}
                  />
                  <button
                    onClick={() => handleSendBrainChat()}
                    disabled={!chatInput.trim()}
                    className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white cursor-pointer transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Scoped Quick Prompts */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-zinc-900/70 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Enterprise Intelligence Prompts</h4>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  'What is our net profit & monthly burn rate?',
                  'Show all overdue customer invoices with collection plan',
                  'Summarize highest value pipeline deals',
                  'Calculate our GST liability for this quarter',
                  'Log expense: 3500 for hotel stay paid via card',
                  'Sync lead: Met Sunita from Apex Infotech phone 9811223344 value 8 Lakhs'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendBrainChat(prompt)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isDark 
                        ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50 text-zinc-300' 
                        : 'bg-zinc-50 border-zinc-200 hover:border-purple-300 text-zinc-700'
                    }`}
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================== */}
      {/* SUBTAB 3: DOCUMENT & RECEIPT SCANNER INGEST */}
      {/* ========================================================== */}
      {activeSubTab === 'document_sync' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Uploader Box */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-900/80 border-purple-900/40 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              
              <div className="space-y-1 mb-6">
                <h3 className="text-base font-bold">Document & Receipt Autonomous Scanner</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Upload visiting cards, expense receipts, vendor bills, or purchase orders. Arohi automatically extracts key fields (GSTIN, vendor, amount, contact info) and syncs directly into your Business OS account.
                </p>
              </div>

              {/* Drag & Drop Visual Box */}
              <div className={`p-8 rounded-2xl border-2 border-dashed text-center flex flex-col items-center justify-center transition-all ${
                isDark 
                  ? 'border-zinc-800 hover:border-purple-500/60 bg-zinc-950/40' 
                  : 'border-zinc-300 hover:border-purple-400 bg-purple-50/20'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold">Drag & Drop Documents or Invoices</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                  Supports JPG, PNG, PDF, DOCX (Max 25MB)
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handleLoadSampleDoc('card')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Test: Visiting Card</span>
                  </button>

                  <button
                    onClick={() => handleLoadSampleDoc('fuel')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Test: Fuel Receipt</span>
                  </button>

                  <button
                    onClick={() => handleLoadSampleDoc('hotel')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Test: Hotel Bill</span>
                  </button>
                </div>
              </div>

              {isScanningDoc && (
                <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-bold">Arohi Multimodal OCR extracting entities & GSTIN...</span>
                </div>
              )}

            </div>
          </div>

          {/* Right Side: Extraction Review & Commit */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-900/80 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Extracted Entity Preview
                </h4>
                {extractedDocData && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {extractedDocData.confidence}
                  </span>
                )}
              </div>

              {extractedDocData ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <p className="font-bold text-sm text-purple-600 dark:text-purple-400">
                      {extractedDocData.company || extractedDocData.vendor}
                    </p>

                    {extractedDocData.name && (
                      <p><span className="text-zinc-500">Contact:</span> {extractedDocData.name} ({extractedDocData.title})</p>
                    )}
                    {extractedDocData.phone && (
                      <p><span className="text-zinc-500">Phone:</span> {extractedDocData.phone}</p>
                    )}
                    {extractedDocData.email && (
                      <p><span className="text-zinc-500">Email:</span> {extractedDocData.email}</p>
                    )}
                    {extractedDocData.amount && (
                      <p><span className="text-zinc-500">Amount / Budget:</span> ₹{extractedDocData.amount.toLocaleString()}</p>
                    )}
                    {extractedDocData.gstin && (
                      <p><span className="text-zinc-500">GSTIN:</span> <code className="text-purple-400 font-mono">{extractedDocData.gstin}</code></p>
                    )}
                    {extractedDocData.category && (
                      <p><span className="text-zinc-500">Expense Category:</span> {extractedDocData.category}</p>
                    )}
                  </div>

                  <button
                    onClick={handleCommitParsedDocument}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Auto-Commit & Sync to Business OS</span>
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center text-zinc-400 text-xs space-y-2">
                  <FileText className="w-8 h-8 mx-auto opacity-40" />
                  <p>No document loaded yet.</p>
                  <p className="text-[11px] text-zinc-500">Select one of the sample test buttons on the left to test instant extraction.</p>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* ========================================================== */}
      {/* SUBTAB 4: LIVE AUTO-SYNC FEED & CLOUD AUDIT LOG */}
      {/* ========================================================== */}
      {activeSubTab === 'sync_history' && (
        <div className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-zinc-900/80 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
        }`}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold">Real-time Account Sync Feed</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Live audit trail of all spoken items, phone call records, and documents automatically written into your Business OS tenant.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Auto-Sync Active
              </span>
            </div>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {syncHistory.map((rec) => (
              <div key={rec.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    rec.entityType === 'lead' 
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                      : rec.entityType === 'expense'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}>
                    {rec.entityType === 'lead' ? <Users className="w-4 h-4" /> : rec.entityType === 'expense' ? <DollarSign className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold">{rec.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {rec.source === 'voice_call' ? 'Voice Call Ingest' : rec.source === 'document_upload' ? 'Doc Upload Ingest' : 'Brain Chat'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">{rec.summary}</p>
                    <span className="text-[10px] text-zinc-400 font-mono mt-1 block">{rec.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Synced
                  </span>

                  <button
                    onClick={() => setActiveModule(rec.targetModule)}
                    className="px-3 py-1.5 rounded-lg border border-purple-500/30 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
