import React, { useState } from 'react';
import { 
  Factory, 
  Search, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  TrendingUp, 
  Layers, 
  Download,
  Landmark,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_MANUFACTURING_PROFILES, ManufacturingProfile } from '../../data/mission87Data';

interface ManufacturingExplorerProps {
  onOpenChatWithPrompt?: (prompt: string) => void;
}

export default function ManufacturingExplorer({ onOpenChatWithPrompt }: ManufacturingExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<ManufacturingProfile | null>(SAMPLE_MANUFACTURING_PROFILES[0]);

  const categories = ['All', 'Biodegradable Products', 'Food Processing', 'Clean Tech & Green Energy', 'Industrial Packaging', 'Nutri-Cereals & Health Food'];

  const filteredProfiles = SAMPLE_MANUFACTURING_PROFILES.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.targetMarket.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-[#120d2c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏭</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Decentralized Production Engine
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              "I Want to Manufacture" Explorer
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-0.5 max-w-2xl">
              Turn local agricultural waste, natural materials, and regional consumer demand into high-margin physical products. Leverage PMEGP up to 35% subsidy and MUDRA credit.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#1a123f] px-3 py-1.5 rounded-xl border border-purple-500/30 text-amber-300 font-black">
              🇮🇳 ODOP & MSME Aligned
            </span>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, category, or target market..."
              className="w-full bg-[#090618] border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow'
                    : 'bg-[#090618] border-purple-500/20 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Profiles List */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider">
            Verified Project Profiles ({filteredProfiles.length})
          </h4>

          {filteredProfiles.length === 0 ? (
            <div className="p-8 text-center bg-[#100b2a] rounded-2xl border border-purple-500/20 text-slate-400 text-xs">
              No matching manufacturing blueprints found. Try clearing your search.
            </div>
          ) : (
            filteredProfiles.map((p, idx) => {
              const isSelected = selectedProfile?.productName === p.productName;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedProfile(p)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-500/20 via-purple-600/20 to-[#1b1246] border-amber-400 text-white shadow-lg'
                      : 'bg-[#100b2a] border-purple-500/20 text-slate-300 hover:border-purple-400/50 hover:bg-[#150f38]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-black text-amber-300">
                        {p.investmentRange}
                      </span>
                    </div>
                    <h5 className="text-sm font-black text-white group-hover:text-amber-300 mt-2 leading-snug">
                      {p.productName}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium">
                      Market: {p.targetMarket}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-purple-500/10 flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                    <span>Est. Margin: {p.projectedMonthlyMargin.split(' ')[0]}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Blueprint →
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Blueprint View */}
        <div className="lg:col-span-7">
          {selectedProfile ? (
            <div className="bg-[#120d2c]/95 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {selectedProfile.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {selectedProfile.productName}
                  </h3>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-right shrink-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Required Capital</span>
                  <span className="text-xs sm:text-sm font-black text-amber-300">{selectedProfile.investmentRange}</span>
                </div>
              </div>

              {/* Machinery & Equipment */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-amber-400" />
                  Required Machinery & Setup
                </h4>
                <div className="bg-[#090618] rounded-xl p-3.5 border border-purple-500/20 space-y-1.5">
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc font-medium">
                    {selectedProfile.machineryRequired.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Raw Materials */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Raw Material Sourcing
                </h4>
                <div className="bg-[#090618] rounded-xl p-3.5 border border-purple-500/20 space-y-1.5">
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc font-medium">
                    {selectedProfile.rawMaterials.map((rm, i) => (
                      <li key={i}>{rm}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Government Subsidies & Schemes */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  Government Subsidies & Loan Schemes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProfile.subsidySchemes.map((sch, i) => (
                    <div key={i} className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{sch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Market & Margins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#090618] border border-purple-500/20 rounded-xl space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Target Market / Buyers</span>
                  <p className="text-xs text-slate-200 font-semibold">{selectedProfile.targetMarket}</p>
                </div>
                <div className="p-3.5 bg-[#090618] border border-purple-500/20 rounded-xl space-y-1">
                  <span className="text-[9px] font-black uppercase text-emerald-400 block">Projected Profit Margin</span>
                  <p className="text-xs text-emerald-300 font-black">{selectedProfile.projectedMonthlyMargin}</p>
                </div>
              </div>

              {/* Compliance & Approvals */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Key Compliance & Licensing (Zero Bribery / Fast Track)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfile.keyCompliance.map((comp, i) => (
                    <span key={i} className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      ✓ {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Project Report Generator CTA */}
              <div className="pt-2 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-400 font-medium">
                  Need a Detailed Project Report (DPR) for a bank loan or PMEGP application?
                </p>
                <button
                  onClick={() => {
                    if (onOpenChatWithPrompt) {
                      onOpenChatWithPrompt(`Hi Arohi, I want to start a ${selectedProfile.productName} manufacturing unit with an estimated budget of ${selectedProfile.investmentRange}. Please prepare a complete Detailed Project Report (DPR) including unit economics, raw material suppliers, machine specifications, PMEGP subsidy breakdown, and a 3-year cashflow projection.`);
                    }
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Bank Project Report ✨</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[#100b2a] rounded-3xl border border-purple-500/20 text-slate-400 text-sm">
              Select a manufacturing profile on the left to view complete machine, subsidy, and margin blueprints.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
