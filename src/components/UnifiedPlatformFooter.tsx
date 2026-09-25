import React from 'react';
import { 
  ShieldCheck, 
  Share2, 
  MessageCircle, 
  Globe, 
  Sparkles, 
  ExternalLink,
  Lock,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

interface UnifiedPlatformFooterProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenShare: () => void;
  onOpenRegionModal: () => void;
  isDarkMode?: boolean;
}

/**
 * Clean & Professional Unified Footer Architecture
 * Modeled after big-tech standards (Google, OpenAI/ChatGPT, Anthropic/Claude, Kimi):
 * 1. Dedicated interactive product workspaces (VanaVeda, Saksham, VetMitra, Voice Studio)
 *    are kept clean, uncluttered, and distraction-free.
 * 2. Platform hub / marketing / discovery pages receive a clean, structured, high-trust 4-column footer.
 */
export const UnifiedPlatformFooter: React.FC<UnifiedPlatformFooterProps> = ({
  activeTab,
  onNavigateTab,
  onOpenShare,
  onOpenRegionModal,
  isDarkMode = true,
}) => {
  // Determine if active view is a specialized product workspace where heavy footers are suppressed
  const isDedicatedWorkspace = [
    'arohi',
    'chat',
    'aitutor',
    'tutor',
    'mocktests',
    'resume',
    'business-os',
    'businessos',
    'admin',
    'vetmitra',
    'vet-mitra',
    'vet',
    'dairy',
    'animalcare',
    'vanaveda',
    'vana-veda',
    'ayurveda',
    'botanical',
    'saksham',
    'divyangjan',
    'saksham-marketplace',
    'arohi-care',
    'oditree',
    'voice-studio',
    'voice-labs',
    'tts-studio',
    'audio-studio',
    'radio',
    'arohi-radio',
    'arohiradio',
    'mission87',
    'cadet',
  ].includes(activeTab);

  // If in a dedicated workspace, we do not disturb the individual product canvas
  if (isDedicatedWorkspace) {
    return null;
  }

  const navigateTo = (tab: string) => {
    onNavigateTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 mb-10 space-y-6 scroll-mt-20">
      {/* Main 4-Column Structured Hub Grid */}
      <div className="bg-white/80 dark:bg-[#0c1224]/90 rounded-3xl border border-slate-200/90 dark:border-blue-950/60 p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left shadow-sm backdrop-blur-md">
        
        {/* Col 1: Platform Identity & Vision */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Arohi AI</span>
              <span className="block text-[10px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider uppercase">
                LLM cum LMM Ecosystem
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            <strong>Built by Bharat, Built for Bharat 🇮🇳</strong> — India’s unified sovereign AI ecosystem powered by multimodal intelligence, 150+ multilingual voice synthesis, and specialized task agents for youth, entrepreneurs, and institutions.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Systems Operational · 99.98%</span>
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 hover:border-blue-400/60 text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-white rounded-xl transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm w-full justify-center"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
              <span>Share Platform</span>
            </button>
          </div>
        </div>

        {/* Col 2: Ecosystem & Innovation Hubs */}
        <div className="space-y-3.5">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Ecosystem Hubs
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('saksham')} 
                className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">♿ Arohi Saksham (Divyangjan)</span>
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">ODITREE</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('vanaveda')} 
                className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">🌿 VanaVeda Ayurvedic AI</span>
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">Ayush</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('voice-studio')} 
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">🎙️ Regional Voice Labs</span>
                <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">150+ Lang</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('vetmitra')} 
                className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">🐾 VetMitra Animal Care</span>
                <span className="bg-teal-500/15 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">Clinical</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('partner')} 
                className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">🤝 Partner & Influencer Hub</span>
                <span className="bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">15% Comm.</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('solutions')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">⚡ 100+ Solutions Directory</span>
                <span className="text-[10px] text-slate-400">23 Audiences</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('franchise')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">🏢 AECN Franchise Centers</span>
                <span className="bg-blue-600/15 border border-blue-500/30 text-blue-600 dark:text-cyan-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md">Pan-India</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Trust, Compliance & Security */}
        <div className="space-y-3.5">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Trust & Compliance
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('payments')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
                <span>Pricing & RBI Guidelines</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('payments')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>PCI-DSS 256-bit Encryption</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('privacy')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('terms')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('refunds')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                Refund & Cancellation Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Help Desk & Global Settings */}
        <div className="space-y-3.5">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Help Desk & Contact
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('faqs')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                Frequently Asked Questions (FAQs)
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => navigateTo('contact')} 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                Contact & Grievance Redressal
              </button>
            </li>
            <li>
              <span className="text-slate-400 dark:text-slate-500 text-[11px] block">
                Support Email: <a href="mailto:support@arohiai.com" className="text-blue-600 dark:text-cyan-400 hover:underline">support@arohiai.com</a>
              </span>
            </li>
            <li className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2">
              <a 
                href="https://wa.me/919090455555" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>24/7 WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={onOpenRegionModal}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/20 hover:to-indigo-600/20 text-blue-700 dark:text-blue-300 border border-blue-500/20 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                title="Select Country, State or Regional Language"
              >
                <Globe className="w-4 h-4 shrink-0 text-blue-500 dark:text-blue-400" />
                <span>Language & Region</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Ecosystem Attribution Ribbon */}
      <div className="bg-white/80 dark:bg-[#0c1224]/90 rounded-2xl border border-slate-200/90 dark:border-blue-950/60 px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Verified Sovereign AI Platform · Bharat
          </span>
        </div>

        <div className="text-center md:text-right space-y-0.5">
          <p className="text-slate-700 dark:text-slate-300 font-semibold">
            Copyright © 2026 Arohi AI (Arohiai.com). All Rights Reserved.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Developed &amp; Maintained by <span className="text-slate-600 dark:text-slate-400 font-semibold">BRAGA TECHNOLOGIES PRIVATE LIMITED</span> in association with <span className="text-slate-600 dark:text-slate-400 font-semibold">ODITREE SERVICES</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
