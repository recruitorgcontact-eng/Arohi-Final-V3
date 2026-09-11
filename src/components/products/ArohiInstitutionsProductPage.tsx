import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Landmark, 
  ShieldCheck, 
  GraduationCap, 
  Activity, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Globe, 
  Send, 
  Award,
  Sparkles,
  Lock
} from 'lucide-react';

interface ArohiInstitutionsProductPageProps {
  onNavigateTab: (tab: string) => void;
  onQuickChat: (prompt: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiInstitutionsProductPage({
  onNavigateTab,
  onQuickChat,
  isDarkMode = true
}: ArohiInstitutionsProductPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    type: 'Government Department'
  });

  const sectors = [
    {
      title: 'Higher Education & Universities',
      desc: 'Smart campus assistance, automated grading support, accreditation analytics (NAAC/NIRF), and multilingual student helpdesks.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Government Departments & Civic Bodies',
      desc: 'Citizen grievance routing, vernacular policy queries, public welfare scheme delivery, and municipal document verification.',
      icon: Landmark,
      color: 'from-rose-600 to-red-600'
    },
    {
      title: 'Public Sector Undertakings (PSUs)',
      desc: 'Tender document summarization, compliance tracking, vendor evaluation, and internal enterprise knowledge retrieval.',
      icon: Building,
      color: 'from-amber-600 to-orange-600'
    },
    {
      title: 'Healthcare & Civil Hospitals',
      desc: 'Multilingual patient triage, Ayushman Bharat scheme validation, OPD queue management, and automated discharge instructions.',
      icon: Activity,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Skill & ITI Training Centers',
      desc: 'Mission 87 vocational modules, decentralized practical training guides, and automated apprentice skill certification.',
      icon: Users,
      color: 'from-purple-600 to-violet-600'
    }
  ];

  const flagshipUseCases = [
    {
      title: 'Welfare Schemes Navigator',
      badge: 'Civic Reach',
      desc: 'Helps citizens find and apply for Central and State government subsidies, pensions, and educational aid with vernacular voice guidance.'
    },
    {
      title: 'Citizen Grievance Copilot',
      badge: 'Grievance Redressal',
      desc: 'Automates intake of citizen complaints in 150+ languages, routes to appropriate district magistrates, and generates tracking IDs.'
    },
    {
      title: 'Institutional Exam & Test Hub',
      badge: 'Academic Standard',
      desc: 'Secure digital assessment platform for university midterms, competitive mock drives, and national talent screenings.'
    },
    {
      title: 'Decentralized District Administration',
      badge: 'Mission 87',
      desc: 'Enables Collectorates and Block Development Offices to coordinate local youth employment, PMEGP loans, and MSME clusters.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest mb-4">
          <Landmark className="w-3.5 h-3.5" />
          <span>FOR INSTITUTIONS &amp; GOVERNMENT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Smarter Institutions. A Stronger India.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          AI for people-centric governance and academic excellence. Efficient. Inclusive. Sovereign. Impactful.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ 100% In-Country Sovereign Hosting
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ MeitY AI Compliance Alignment
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ 150+ Vernacular Language Inclusivity
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => {
              const el = document.getElementById('pilot-request-form');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Request Institutional Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onQuickChat('Provide details on Arohi AI government and institutional deployment architecture.')}
            className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Consult Institutional AI</span>
          </button>
        </div>
      </section>

      {/* 2. Key Sectors */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Transforming Critical Public &amp; Academic Pillars
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Built to scale smoothly across municipal corporations, state secretariats, and premier universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-rose-500/40' : 'bg-white border-black/8 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sec.color} text-white flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{sec.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Flagship Citizen Applications */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-950/20 via-red-950/20 to-slate-950/30 rounded-3xl border border-rose-500/20 p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
              CITIZEN-FIRST IMPACT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              Flagship Governance &amp; Public Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flagshipUseCases.map((uc, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#12141c]/80 rounded-2xl p-4 border border-black/6 dark:border-white/8"
              >
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/20">
                  {uc.badge}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2">{uc.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Request Pilot Form */}
      <section id="pilot-request-form" className="max-w-3xl mx-auto px-4">
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#15171e] border border-black/8 dark:border-white/10 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-2 rounded-xl bg-rose-500/10 text-rose-500 mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              Request Institutional Pilot or Consultation
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Connect directly with Arohi Enterprise Architects for pilot integration timelines.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-emerald-500">Pilot Request Received!</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Our Institutional Directorate will contact your office within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Officer / Representative Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none text-zinc-900 dark:text-white focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Institution / Department
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Directorate of Higher Education"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none text-zinc-900 dark:text-white focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="officer@gov.in or registrar@univ.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none text-zinc-900 dark:text-white focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none text-zinc-900 dark:text-white focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Institutional Request</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
