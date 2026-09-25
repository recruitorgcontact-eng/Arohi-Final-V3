import React, { useState, useMemo, useEffect } from 'react';
import { 
  SAKSHAM_PRODUCTS, 
  ODITREE_PARTNER_INFO, 
  SakshamProduct 
} from '../../data/saksham-products';
import { SakshamProductArt } from './SakshamProductArt';
import { ArohiSakshamCompanion } from './ArohiSakshamCompanion';
import { DivyangjanSchemesExplorer } from './DivyangjanSchemesExplorer';
import { ScribeAndRightsAssistant } from './ScribeAndRightsAssistant';
import { playArohiVoice, stopArohiVoice, sanitizeSpeechText } from '../../utils/arohiVoicePlayer';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  FileText, 
  HeartHandshake, 
  ShoppingBag, 
  Eye, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  Send, 
  HelpCircle, 
  Share2,
  X,
  Compass
} from 'lucide-react';

interface SakshamMarketplaceProps {
  onNavigateTab?: (tab: string) => void;
  isDarkMode?: boolean;
}

export const SakshamMarketplace: React.FC<SakshamMarketplaceProps> = ({
  onNavigateTab,
  isDarkMode = false
}) => {
  // Portal active view mode: 'ai-companion' | 'products' | 'schemes' | 'rights'
  const [portalMode, setPortalMode] = useState<'ai-companion' | 'products' | 'schemes' | 'rights'>('ai-companion');
  const [prefillPromptForAI, setPrefillPromptForAI] = useState<string>('');

  // Category state (for products tab)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<SakshamProduct | null>(null);
  
  // Order checkout modal
  const [checkoutProduct, setCheckoutProduct] = useState<SakshamProduct | null>(null);
  const [selectedVariantCode, setSelectedVariantCode] = useState<string>('');
  
  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCityState, setCustomerCityState] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [hasUdidCard, setHasUdidCard] = useState<'yes' | 'no' | 'in-progress'>('no');
  const [udidNumber, setUdidNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Bulk inquiry modal state
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkOrgName, setBulkOrgName] = useState('');
  const [bulkContactPerson, setBulkContactPerson] = useState('');
  const [bulkPhone, setBulkPhone] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkQuantity, setBulkQuantity] = useState('25');
  const [bulkProductType, setBulkProductType] = useState('All Products (Mixed Kit)');
  const [bulkNotes, setBulkNotes] = useState('');
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  // Audio Speech state
  const [speakingProductId, setSpeakingProductId] = useState<string | null>(null);

  // High contrast mode toggle for low vision
  const [highContrast, setHighContrast] = useState(false);

  // ADIP Guidance drawer
  const [showAdipGuide, setShowAdipGuide] = useState(false);

  // Flyer view modal
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return SAKSHAM_PRODUCTS;
    return SAKSHAM_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Cleanup active voice playback on unmount
  useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  // Arohi Sovereign 24kHz Studio HD Neural Voice Reader for Divyangjan Visitors
  const handleToggleSpeech = (product: SakshamProduct) => {
    if (speakingProductId === product.id) {
      stopArohiVoice();
      setSpeakingProductId(null);
      return;
    }

    stopArohiVoice();
    setSpeakingProductId(product.id);

    const discount = Math.round(((product.mrp - product.subsidizedPrice) / product.mrp) * 100);
    const script = `Namaste! I am Arohi. Here are the official specifications for ${product.name}, model code ${product.modelCode}. The Divyangjan subsidized price is ${product.subsidizedPrice} Rupees, with a maximum retail price of ${product.mrp} Rupees, saving you ${discount} percent. Key highlights include: ${product.keyFeatures.join('. ')}. This assistive mobility aid is provided in association with ODITREE SERVICES and Arohi Care, with one hundred percent ADIP government scheme assistance. For immediate support or inquiries, call helpline 9 0 9 0 4 5 5 5 5 5.`;

    const cleanSpeech = sanitizeSpeechText(script);

    playArohiVoice(cleanSpeech, {
      voice: 'Aoede', // Signature warm neural studio voice of Arohi
      language: 'en-IN',
      onStart: () => setSpeakingProductId(product.id),
      onEnd: () => setSpeakingProductId(null),
      onError: (err) => {
        console.warn('Arohi Voice notice:', err);
        setSpeakingProductId(null);
      }
    });
  };

  // WhatsApp pre-filled order trigger
  const handleWhatsAppOrder = (product: SakshamProduct, variant?: any) => {
    const pPrice = variant ? variant.price : product.subsidizedPrice;
    const pCode = variant ? variant.code : product.modelCode;
    const pName = variant ? `${product.name} (${variant.name})` : product.name;

    const message = `Namaste ODITREE SERVICES & Arohi Care Team,\n\nI want to place an order for the Divyangjan Assistive Product:\n\n*Product:* ${pName}\n*Model Code:* ${pCode}\n*Subsidized Price:* ₹${pPrice.toLocaleString('en-IN')}\n\n*Customer Details:*\nName: \nDelivery Address: \nCity & Pincode: \nContact Number: \nUDID Card Holder (Yes/No): \n\nPlease confirm availability and dispatch timeline. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ODITREE_PARTNER_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  // Quick Open Checkout
  const handleOpenCheckout = (product: SakshamProduct) => {
    setCheckoutProduct(product);
    if (product.variants && product.variants.length > 0) {
      setSelectedVariantCode(product.variants[0].code);
    } else {
      setSelectedVariantCode(product.modelCode);
    }
    setOrderConfirmed(false);
  };

  // Submit checkout order
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerPincode) {
      alert('Please fill in your complete delivery name, phone number, address, and pincode.');
      return;
    }

    const orderId = `ODT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setOrderConfirmed(true);

    // Also offer WhatsApp auto-confirmation
    const activePrice = checkoutProduct?.variants?.find(v => v.code === selectedVariantCode)?.price || checkoutProduct?.subsidizedPrice || 0;
    const summaryMsg = `*Arohi Care & ODITREE Order #${orderId}*\n\nProduct: ${checkoutProduct?.name}\nModel: ${selectedVariantCode}\nAmount: ₹${activePrice.toLocaleString('en-IN')}\nPayment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online / UPI'}\n\nRecipient: ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}, ${customerCityState} - ${customerPincode}\nUDID: ${hasUdidCard === 'yes' ? udidNumber : 'None'}`;
    
    console.log('Order submitted:', summaryMsg);
  };

  // Submit Institutional / Bulk Inquiry
  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkOrgName || !bulkPhone) {
      alert('Please provide Organization Name and Phone Number.');
      return;
    }

    setBulkSubmitted(true);
    const bulkMsg = `*Institutional Bulk Inquiry for Arohi Care & ODITREE SERVICES*\n\nOrganization: ${bulkOrgName}\nContact Person: ${bulkContactPerson}\nPhone: ${bulkPhone}\nEmail: ${bulkEmail}\nEstimated Quantity: ${bulkQuantity}\nRequirement: ${bulkProductType}\nNotes: ${bulkNotes}\n\nPlease email official quotation to ${bulkEmail || 'provided contact'}.`;
    
    const encoded = encodeURIComponent(bulkMsg);
    window.open(`https://wa.me/${ODITREE_PARTNER_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-amber-300 font-sans' 
        : isDarkMode 
          ? 'bg-[#090b10] text-slate-100' 
          : 'bg-[#fcfbf9] text-slate-900'
    }`}>
      {/* Top Notification / Partnership Bar */}
      <section className="w-full bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white border-b border-emerald-500/30 px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
              Empowerment Hub
            </span>
            <span className="font-semibold text-emerald-200">
              Innovative Assistive Solutions for Divyangjan — In Association with <strong className="text-white font-black underline decoration-emerald-400">ODITREE SERVICES</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100 font-medium">
            <a 
              href={`tel:${ODITREE_PARTNER_INFO.helplinePhone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Helpline: <strong className="font-mono text-white">{ODITREE_PARTNER_INFO.helplinePhoneDisplay}</strong></span>
            </a>
            <span className="text-emerald-500/60">|</span>
            <a 
              href={`mailto:${ODITREE_PARTNER_INFO.email}`}
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{ODITREE_PARTNER_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Arohi Saksham Unified Portal Navigation */}
        <div className={`p-3 sm:p-4 rounded-3xl border shadow-lg backdrop-blur-md transition-all ${
          highContrast
            ? 'bg-zinc-950 border-amber-500 text-amber-300'
            : isDarkMode
              ? 'bg-[#0f151e]/90 border-white/8 text-white'
              : 'bg-white/95 border-emerald-100 text-slate-900'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              <button
                type="button"
                onClick={() => setPortalMode('ai-companion')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm ${
                  portalMode === 'ai-companion'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <span className="text-base">💬</span>
                <span>Arohi Saksham AI Voice Companion</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono">
                  Persona
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPortalMode('products')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm ${
                  portalMode === 'products'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <span className="text-base">♿</span>
                <span>Assistive Products &amp; IoT ({SAKSHAM_PRODUCTS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setPortalMode('schemes')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm ${
                  portalMode === 'schemes'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <span className="text-base">🏛️</span>
                <span>Government Schemes &amp; Welfare</span>
              </button>

              <button
                type="button"
                onClick={() => setPortalMode('rights')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm ${
                  portalMode === 'rights'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <span className="text-base">📝</span>
                <span>Scribe &amp; 4% Rights Toolkit</span>
              </button>
            </div>

            {/* Accessibility Options */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  highContrast
                    ? 'bg-amber-400 text-black border-amber-300 font-black shadow-md'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Toggle High Contrast for low-vision accessibility"
              >
                <span>👁️</span>
                <span>{highContrast ? 'High Contrast ON' : 'High Contrast'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* VIEW 1: DEDICATED DIVYANGJAN AI PERSONA COMPANION */}
        {portalMode === 'ai-companion' && (
          <ArohiSakshamCompanion
            isDarkMode={isDarkMode}
            highContrast={highContrast}
            onSelectProduct={() => {
              setSelectedCategory('all');
              setPortalMode('products');
            }}
            onViewSchemes={() => setPortalMode('schemes')}
            prefillPrompt={prefillPromptForAI}
          />
        )}

        {/* VIEW 3: GOVERNMENT WELFARE & SCHEMES DIRECTORY */}
        {portalMode === 'schemes' && (
          <DivyangjanSchemesExplorer
            isDarkMode={isDarkMode}
            highContrast={highContrast}
            onConsultSchemeInAI={(schemeTitle) => {
              setPrefillPromptForAI(`Please guide me step-by-step on the "${schemeTitle}" scheme: eligibility, exact documents required, application portals, and rights.`);
              setPortalMode('ai-companion');
            }}
          />
        )}

        {/* VIEW 4: SCRIBE DECLARATION & 4% RPwD RIGHTS TOOLKIT */}
        {portalMode === 'rights' && (
          <ScribeAndRightsAssistant
            isDarkMode={isDarkMode}
            highContrast={highContrast}
            onAskArohi={(query) => {
              setPrefillPromptForAI(query);
              setPortalMode('ai-companion');
            }}
          />
        )}

        {/* VIEW 2: ASSISTIVE LIVING PRODUCTS & SMART IOT */}
        {portalMode === 'products' && (
          <>
        {/* Hero Section */}
        <header className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-[#0c1f17] via-[#091512] to-[#040907] text-white p-6 sm:p-10 shadow-2xl">
          {/* Subtle Ambient Radar Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Partner Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ODITREE SERVICES</span>
                  <span className="text-emerald-300 font-mono text-[10px]">· The Bridge Of Services</span>
                </div>

                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-red-600/30 border border-red-500/40 text-xs font-bold text-red-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Arohi Care Assistive Series</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFlyerModal(true)}
                  className="px-3 py-1 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-xs font-semibold text-blue-200 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-300" />
                  <span>View Official Flyer</span>
                </button>
              </div>

              {/* Title & Taglines */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Arohi Saksham
                <span className="block text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                  Assistive Living &amp; Smart Sonar Mobility for Divyangjan
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                Empowering blind, visually impaired, and mobility-challenged citizens with high-precision ultrasonic sonar navigators, ionized bush-joint white canes, and multi-terrain roller companions. Backed by <strong className="text-white">ODITREE SERVICES</strong> with pan-India delivery and 100% ADIP scheme reimbursement paperwork.
              </p>

              {/* Call to Actions & Helpline */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${ODITREE_PARTNER_INFO.whatsappNumber}?text=${encodeURIComponent('Hello ODITREE SERVICES & Arohi Care team, I want to inquire about Divyangjan Assistive mobility products on arohiai.com/saksham.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Order on WhatsApp (9090455555)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Schools &amp; NGO Bulk Orders</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAdipGuide(true)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>ADIP Scheme / UDID Subsidy</span>
                </button>
              </div>

              {/* Four Value Pillars from Flyer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cutting-Edge Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>User-Centric Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Reliable &amp; Durable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pan-India Support</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Featured DLI010 Showcase Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-black/90 rounded-2xl border border-emerald-500/30 p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-emerald-400 font-mono font-bold tracking-wider">FEATURED ASSISTIVE IOT</span>
                <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-mono">
                  MODEL: DLI010
                </span>
              </div>

              <SakshamProductArt category="smart-iot" modelCode="DLI010" className="w-full h-48 sm:h-56 mb-4" />

              <div className="space-y-2 text-left">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Arohi Care Sonar-Based IoT Device</span>
                  <span className="text-emerald-400 font-mono text-sm">₹2,499</span>
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Sonar-based recognition senses obstacles up to 3m ahead with multi-mode vibration alerts and 100-hour battery life.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400">
                    <span className="line-through text-slate-500">₹4,999</span>
                    <span className="text-emerald-400 font-bold ml-1.5">50% Subsidized</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenCheckout(SAKSHAM_PRODUCTS[0])}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Accessibility & Filter Bar */}
        <section className={`rounded-2xl p-4 border transition-all ${
          isDarkMode 
            ? 'bg-slate-900/60 border-slate-800' 
            : 'bg-white border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Assistive Aids
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('smart-iot')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'smart-iot'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sonar IoT (DLI010)
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('classic-cane')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'classic-cane'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Classic White Cane (DLC010)
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('premium-cane')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'premium-cane'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Premium Series (DLC02)
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('all-in-one')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all-in-one'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All-in-One (KIT010)
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('bulk-kit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'bulk-kit'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ADIP Institutional Kits
              </button>
            </div>

            {/* Accessibility Controls: Audio Assist & Contrast */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  highContrast
                    ? 'bg-amber-400 text-black border-amber-500 shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
                title="Toggle High-Contrast Visual Mode for Low Vision"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{highContrast ? 'High Contrast: ON' : 'High Contrast'}</span>
              </button>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                Showing {filteredProducts.length} certified products
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Assistive Mobility Catalog</span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  Subsidized Rates for Divyangjan
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Every unit is inspected for durability, high-tension elastic strength, and RPwD Act 2016 assistive standards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const discountPercent = Math.round(((product.mrp - product.subsidizedPrice) / product.mrp) * 100);
              const isSpeaking = speakingProductId === product.id;

              return (
                <div
                  key={product.id}
                  className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                    isDarkMode
                      ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
                      : 'bg-white border-slate-200/90 hover:border-emerald-500/50'
                  }`}
                >
                  {/* Card Header & Artwork */}
                  <div>
                    {/* Visual Art Box */}
                    <div className="p-3">
                      <SakshamProductArt
                        category={product.category}
                        modelCode={product.modelCode}
                        className="w-full h-52"
                      />
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      {/* Sub-series and Model Code */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-mono uppercase text-[11px] font-semibold">
                          {product.series}
                        </span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                          {product.modelCode}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {product.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        "{product.tagline}"
                      </p>

                      {/* Pricing Block */}
                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Divyangjan Subsidized Price:
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                              ₹{product.subsidizedPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 line-through font-mono">
                              MRP ₹{product.mrp.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-lg">
                          Save {discountPercent}%
                        </span>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                        {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0 space-y-2">
                    {/* Arohi Sovereign HD Neural Voice Specs Reader Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleSpeech(product)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md animate-pulse font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`}
                      title="Listen to product specifications in Arohi's authentic voice"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-slate-950" />
                          <span>Stop Arohi's Voice</span>
                          <span className="text-[9px] bg-black/20 text-black px-1.5 py-0.5 rounded-full font-mono font-black uppercase">Speaking</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Listen in Arohi's Voice</span>
                          <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Arohi HD</span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Full Specs
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenCheckout(product)}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Instant Order</span>
                      </button>
                    </div>

                    {/* Direct WhatsApp Action */}
                    <button
                      type="button"
                      onClick={() => handleWhatsAppOrder(product)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Order on WhatsApp (9090455555)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Official Flyer Showcase Section */}
        <section className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isDarkMode 
            ? 'bg-[#0e131d] border-emerald-500/30' 
            : 'bg-emerald-50/60 border-emerald-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span>Official Partner Flyer</span>
                <span>·</span>
                <span>ODITREE SERVICES &amp; Arohi Care</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Assistive Daily Living Canes &amp; IoT Sonar Navigator
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${ODITREE_PARTNER_INFO.helplinePhone}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 9090455555</span>
              </a>
              <button
                type="button"
                onClick={() => setShowFlyerModal(true)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
                <span>Open Flyer Fullscreen</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: IoT Device */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-500 uppercase">Arohi Care</span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">DLI010</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Portable Sonar-Based IoT Device
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <li>• Sonar-Based Recognition with precision detection</li>
                <li>• Lightweight &amp; pocket-friendly lanyard carry</li>
                <li>• 100-Hour long battery backup</li>
                <li>• Multiple vibration alert patterns</li>
                <li>• 3 Different environmental modes</li>
              </ul>
            </div>

            {/* Column 2: White Canes */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-500 uppercase">Classic &amp; Premium</span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">DLC010 / DLC02</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Assistive Daily Living White Canes
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <li>• Industrial grade aluminium alloy</li>
                <li>• Double elastic 3mm cord for high strength</li>
                <li>• Joint bushes for smooth functioning &amp; stability</li>
                <li>• Ionized coating &amp; red reflective guide tape</li>
                <li>• Child (90cm), Adult (115cm), Long (140cm), Ultra (120cm + Pouch)</li>
              </ul>
            </div>

            {/* Column 3: All-in-One Mobility */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-500 uppercase">All-in-One Companion</span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">KIT010</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Premium All-in-One Cane
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <li>• 4 distinct mobility types unified in 1 cane</li>
                <li>• Foldable &amp; ultra-lightweight chassis</li>
                <li>• Built-in forward high-lumen LED night light</li>
                <li>• Multi-terrain continuous rolling ball base</li>
                <li>• Heavy duty reinforced joint locks</li>
              </ul>
            </div>
          </div>
        </section>
        </>
        )}

        {/* ADIP Scheme & Government Welfare Section */}
        <section className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isDarkMode 
            ? 'bg-slate-900/90 border-cyan-500/30' 
            : 'bg-cyan-50/50 border-cyan-200'
        }`}>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Government Welfare &amp; Divyangjan Rights</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Get Up to 100% Aid Reimbursement Under the ADIP Scheme
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Under the <strong>ADIP Scheme (Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances)</strong> run by the Ministry of Social Justice and Empowerment, Government of India, eligible Divyangjan citizens can receive assistive devices completely free or at heavily subsidized government reimbursement rates.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  🏛️ Ministry of Social Justice &amp; Empowerment
                </span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  🪪 UDID Portal (swavlambancard.gov.in)
                </span>
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  📜 RPwD Act 2016 Certified
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setShowAdipGuide(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>How to Claim ADIP Subsidy</span>
              </button>

              <a
                href="https://www.swavlambancard.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Visit Official UDID Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Institutional & Bulk Inquiry Banner */}
        <section className={`rounded-3xl border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/30' 
            : 'bg-indigo-50/70 border-indigo-200'
        }`}>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
              <Building2 className="w-4 h-4" />
              <span>Institutions, NGOs &amp; CSR Foundations</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Procure in Bulk with Tax Invoices &amp; Pan-India Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Are you a Blind School, District Social Welfare department, Hospital, or CSR Partner? <strong className="text-indigo-600 dark:text-indigo-400">ODITREE SERVICES</strong> supplies custom packages, user orientation guides, and official paperwork for government audits.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Request Institutional Quote</span>
          </button>
        </section>

        {/* Assistive Hardware Fulfillment & Compliance Strip (Clean Big-Tech Standard) */}
        <footer className="pt-8 pb-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-2xl mx-auto leading-relaxed space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Arohi Saksham &amp; Arohi Care · Dedicated to Divyangjan Empowerment
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Part of the unified Arohi AI ecosystem. Assistive hardware supply, manufacturing standards, and pan-India fulfillment are executed by <strong>ODITREE SERVICES</strong> in association with <strong>BRAGA TECHNOLOGIES PRIVATE LIMITED</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <a href="tel:+919090455555" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Helpline: +91 90904 55555
            </a>
            <span>·</span>
            <a href="mailto:oditree.contact@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Email: oditree.contact@gmail.com
            </a>
            <span>·</span>
            <span>Portal: www.arohiai.com/saksham</span>
          </div>
        </footer>
      </div>

      {/* MODAL 1: Product Details / Variants Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-700' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  MODEL: {selectedProduct.modelCode}
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  {selectedProduct.series}
                </span>
              </div>

              <h2 className="text-2xl font-black">{selectedProduct.name}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Visual artwork */}
              <SakshamProductArt
                category={selectedProduct.category}
                modelCode={selectedProduct.modelCode}
                className="w-full h-48 sm:h-56"
              />

              {/* Price comparison */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                    Subsidized Divyangjan Price
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    ₹{selectedProduct.subsidizedPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 line-through font-mono">
                    MRP ₹{selectedProduct.mrp.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    Official ODITREE Warranty Included
                  </div>
                </div>
              </div>

              {/* Arohi Voice Reader in Modal */}
              <button
                type="button"
                onClick={() => handleToggleSpeech(selectedProduct)}
                className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  speakingProductId === selectedProduct.id
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md animate-pulse font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                {speakingProductId === selectedProduct.id ? (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-950" />
                    <span>Stop Arohi's Voice</span>
                    <span className="text-[9px] bg-black/20 text-black px-1.5 py-0.5 rounded-full font-mono font-black uppercase">Speaking</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                    <span>Listen to Specs in Arohi's Voice</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Arohi HD</span>
                  </>
                )}
              </button>

              {/* Variants if available (e.g. DLC02 series) */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Available Length &amp; Fold Variants:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.variants.map((v) => (
                      <div
                        key={v.code}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{v.name}</div>
                          <div className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                            {v.size} · {v.folds} · {v.code}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-emerald-500">₹{v.price}</div>
                          <button
                            type="button"
                            onClick={() => handleWhatsAppOrder(selectedProduct, v)}
                            className="text-[10px] text-emerald-600 dark:text-emerald-400 underline font-bold"
                          >
                            Order Variant
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProduct.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-white text-right ml-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions inside modal */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(null);
                    handleOpenCheckout(selectedProduct);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Proceed to Book Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppOrder(selectedProduct)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Direct Checkout Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-700' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setCheckoutProduct(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderConfirmed ? (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold tracking-wider">
                    ODITREE SERVICES Direct Booking
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Order Assistive Aid
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {checkoutProduct.name} ({selectedVariantCode})
                  </p>
                </div>

                {/* Variant selector if multiple */}
                {checkoutProduct.variants && checkoutProduct.variants.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Choose Length &amp; Segment Variant:
                    </label>
                    <select
                      value={selectedVariantCode}
                      onChange={(e) => setSelectedVariantCode(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                    >
                      {checkoutProduct.variants.map((v) => (
                        <option key={v.code} value={v.code}>
                          {v.name} ({v.size}, {v.folds}) — ₹{v.price}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Amount to pay */}
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Payable:</span>
                  <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{((checkoutProduct.variants?.find(v => v.code === selectedVariantCode)?.price) || checkoutProduct.subsidizedPrice).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Recipient details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name of Beneficiary / Buyer *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 751001"
                        value={customerPincode}
                        onChange={(e) => setCustomerPincode(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House No., Street, Landmark"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City, District &amp; State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bhubaneswar, Odisha"
                      value={customerCityState}
                      onChange={(e) => setCustomerCityState(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* UDID Card question */}
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Do you have a Government UDID Card? (For subsidy paperwork)
                    </label>
                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="udid"
                          checked={hasUdidCard === 'yes'}
                          onChange={() => setHasUdidCard('yes')}
                        />
                        <span>Yes, I have UDID</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="udid"
                          checked={hasUdidCard === 'no'}
                          onChange={() => setHasUdidCard('no')}
                        />
                        <span>No UDID</span>
                      </label>
                    </div>

                    {hasUdidCard === 'yes' && (
                      <input
                        type="text"
                        placeholder="Enter UDID Number (e.g. OD01...)"
                        value={udidNumber}
                        onChange={(e) => setUdidNumber(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-mono bg-white dark:bg-slate-900"
                      />
                    )}
                  </div>

                  {/* Payment method */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Payment Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-xl border font-bold text-left transition-colors cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        🚚 Cash on Delivery (COD)
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2.5 rounded-xl border font-bold text-left transition-colors cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        ⚡ Online / UPI / QR Code
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    Confirm Order Booking
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Order Successfully Booked!
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Order Tracking ID: <strong className="text-emerald-500">{confirmedOrderId}</strong>
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5">
                  <div><strong>Beneficiary:</strong> {customerName}</div>
                  <div><strong>Phone:</strong> {customerPhone}</div>
                  <div><strong>Item:</strong> {checkoutProduct.name} ({selectedVariantCode})</div>
                  <div><strong>Delivery Address:</strong> {customerAddress}, {customerCityState} - {customerPincode}</div>
                  <div><strong>Payment Mode:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online / UPI QR'}</div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our dispatch coordinator from <strong>ODITREE SERVICES</strong> will call you shortly on <strong>{customerPhone}</strong> to verify the address and dispatch your package.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Namaste ODITREE SERVICES,\nI just confirmed Order #${confirmedOrderId} for ${checkoutProduct.name} (${selectedVariantCode}) on arohiai.com/saksham.\nName: ${customerName}\nPhone: ${customerPhone}`;
                      window.open(`https://wa.me/${ODITREE_PARTNER_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send to WhatsApp (9090455555)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutProduct(null)}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Institutional / NGO Bulk Inquiries */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-700' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bulkSubmitted ? (
              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-500 font-mono text-xs font-bold uppercase">
                  <Building2 className="w-4 h-4" />
                  <span>Institutional Procurement</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Blind Schools, NGOs &amp; CSR Bulk Orders
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Request an official tax quotation and institutional subsidy breakdown from ODITREE SERVICES.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Organization / School / Foundation Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Odisha Blind Welfare Association"
                      value={bulkOrgName}
                      onChange={(e) => setBulkOrgName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Secretary / Principal"
                        value={bulkContactPerson}
                        onChange={(e) => setBulkContactPerson(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={bulkPhone}
                        onChange={(e) => setBulkPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="ngo@example.org"
                        value={bulkEmail}
                        onChange={(e) => setBulkEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Est. Units Needed
                      </label>
                      <input
                        type="number"
                        min="5"
                        value={bulkQuantity}
                        onChange={(e) => setBulkQuantity(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Product Series Required
                    </label>
                    <select
                      value={bulkProductType}
                      onChange={(e) => setBulkProductType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                    >
                      <option value="All Products (Mixed Kit)">All Products (Mixed Kit)</option>
                      <option value="Arohi Care Sonar IoT Device (DLI010)">Arohi Care Sonar IoT Device (DLI010)</option>
                      <option value="Classic White Canes (DLC010)">Classic White Canes (DLC010)</option>
                      <option value="Premium Canes DLC02 Series">Premium Canes DLC02 Series</option>
                      <option value="All-in-One Canes with Roller + Light (KIT010)">All-in-One Canes with Roller + Light (KIT010)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Special Requirements or CSR notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need ADIP reimbursement bills, custom braille markings, delivery location"
                      value={bulkNotes}
                      onChange={(e) => setBulkNotes(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    Submit Quotation Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Inquiry Dispatched to ODITREE SERVICES
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thank you, <strong>{bulkOrgName}</strong>. Our institutional supplies manager will reach out via WhatsApp / Email with your custom quotation and tax paperwork within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsBulkModalOpen(false);
                    setBulkSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: ADIP Scheme Guidance Modal */}
      {showAdipGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 text-white border-slate-700' 
              : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setShowAdipGuide(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>ADIP Scheme Official Guidance</span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                How Divyangjan Can Avail Free Aids &amp; Subsidies
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  The <strong>ADIP Scheme</strong> (Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances) is implemented by <strong>ALIMCO</strong> (Artificial Limbs Manufacturing Corporation of India) and the Ministry of Social Justice and Empowerment.
                </p>

                <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-2">
                  <h4 className="font-bold text-cyan-900 dark:text-cyan-200 text-xs uppercase tracking-wider">
                    Eligibility Criteria:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>An Indian citizen of any age holding a valid Disability Certificate / UDID Card showing 40% or more disability.</li>
                    <li>Monthly income from all sources not exceeding ₹20,000/month (100% aid aid granted) or ₹20,001 to ₹30,000/month (50% aid aid granted).</li>
                    <li>Has not received the same aid during the last 3 years from any government source.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                    3 Easy Steps to Submit Your Bill:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs">
                    <li><strong>Order with Tax Invoice:</strong> Book any assistive aid on this page. ODITREE SERVICES will issue a GST-compliant tax invoice mentioning the RPwD category and model code.</li>
                    <li><strong>Apply on Swavlamban Portal:</strong> Visit <a href="https://www.swavlambancard.gov.in/" target="_blank" rel="noreferrer" className="text-cyan-500 underline font-bold">swavlambancard.gov.in</a> or visit your District Social Welfare Officer (DSWO).</li>
                    <li><strong>Receive Direct Subsidy:</strong> Present your UDID card, Aadhaar, and our ODITREE invoice to receive up to 100% reimbursement directly into your bank account.</li>
                  </ol>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${ODITREE_PARTNER_INFO.helplinePhone}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call ODITREE ADIP Helpdesk (9090455555)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowAdipGuide(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Official Flyer View Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl p-6 bg-slate-950 text-white border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-emerald-400 font-mono font-bold">ODITREE SERVICES &amp; Arohi Care</span>
                <h3 className="text-lg font-black text-white">Official Assistive Solutions Flyer</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFlyerModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flyer Structured Showcase */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0a2318] via-[#091512] to-[#040907] p-6 border border-emerald-500/30 space-y-6">
              {/* Flyer Top Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-2xl font-black text-emerald-400">Oditree</div>
                  <div className="text-xs text-slate-300 italic">The Bridge Of Services</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm font-semibold text-white">Innovative Assistive Solutions</div>
                  <div className="text-xs text-emerald-300 italic">for a Safer, Smarter &amp; More Independent Tomorrow</div>
                  <div className="text-xs text-amber-300 font-bold">Together We Empower</div>
                </div>
              </div>

              {/* Flyer Body Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Arohi Care IoT Box */}
                <div className="bg-black/60 rounded-xl p-4 border border-red-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 font-black text-sm">Arohi Care</span>
                    <span className="text-amber-400 text-xs font-bold">★★★ Premium Quality</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Smart Technology | Greater Independence | A Brighter Tomorrow
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Portable Sonar-Based IoT Device for Safe Navigation (Model: DLI010)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Designed for a safer, smarter and more independent journey — especially for the visually impaired and those with mobility challenges.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                    <div className="bg-white/5 p-2 rounded">📡 Sonar Recognition</div>
                    <div className="bg-white/5 p-2 rounded">🪶 Pocket-Friendly</div>
                    <div className="bg-white/5 p-2 rounded">🔋 100-Hr Battery</div>
                    <div className="bg-white/5 p-2 rounded">📳 Vibration Alerts</div>
                    <div className="bg-white/5 p-2 rounded">🔄 3 Adaptable Modes</div>
                    <div className="bg-white/5 p-2 rounded">🛡️ ADIP Eligible</div>
                  </div>
                  <div className="text-center italic text-cyan-300 text-xs font-bold pt-1">
                    "See More. Live Freer."
                  </div>
                </div>

                {/* Right: Assistive Daily Living Canes */}
                <div className="bg-black/60 rounded-xl p-4 border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-sm">Assistive Daily Living Canes</span>
                    <span className="text-slate-400 text-xs">Simple Tools. Greater Independence.</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <strong className="text-white">White Cane (DLC010):</strong> 120cm, 12.7mm, 170g, 4-fold aluminium, double 3mm elastic, powder coating.
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <strong className="text-amber-300">Premium White Cane (DLC02):</strong> Precision bush joints, ionized coating, reflective tape. Child (90cm), Adult (115cm), Long (140cm), Ultra with Pouch (120cm).
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <strong className="text-indigo-300">Premium All-in-One Cane (KIT010):</strong> 4-in-1 mobility companion, forward LED night light, multi-terrain rolling ball tip.
                    </div>
                  </div>
                </div>
              </div>

              {/* Flyer Bottom Contact */}
              <div className="bg-black/80 rounded-xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Us Today: <strong className="text-white font-mono text-sm">9090455555</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Email: <strong className="text-white">oditree.contact@gmail.com</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Website: <strong className="text-white">www.arohiai.com/saksham</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
