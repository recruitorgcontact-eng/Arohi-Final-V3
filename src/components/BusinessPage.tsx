import { useState } from 'react';
import { Sparkles, Landmark, Rocket, CheckSquare, Plus, DollarSign, ArrowRight, HelpCircle, FileCheck, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FundingOption {
  schemeName: string;
  limit: string;
  subsidy: string;
  bestFor: string;
}

interface Validation {
  marketScore: number;
  feasibility: string;
  fundingSchemes: FundingOption[];
  msmeCategory: string;
  checklist: string[];
  growthMilestones: string[];
}

export default function BusinessPage({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { user } = useAuth();
  const [idea, setIdea] = useState('');
  const [sector, setSector] = useState('Agri-Tech / Farming');
  const [investment, setInvestment] = useState('₹50,000 - ₹5,000,000');
  const [locationType, setLocationType] = useState('Rural Area');
  const [isValidating, setIsValidating] = useState(false);
  const [validation, setValidation] = useState<Validation | null>(null);

  // Cost calculator states
  const [monthlyRent, setMonthlyRent] = useState(15000);
  const [monthlyInventory, setMonthlyInventory] = useState(25000);
  const [marketingCost, setMarketingCost] = useState(5000);

  const handleValidateIdea = () => {
    if (!idea.trim()) return;
    setIsValidating(true);
    setValidation(null);

    setTimeout(() => {
      // Dynamic simulated business validations based on sector
      let isAgri = sector.toLowerCase().includes('agri');
      let isRetail = sector.toLowerCase().includes('retail');

      setValidation({
        marketScore: 84,
        feasibility: `Your business idea targeting **"${sector}"** in a **"${locationType}"** is highly feasible with low-to-medium capital entry thresholds. Traditional and digital integration will expand local demand.`,
        msmeCategory: isAgri ? 'Primary Agriculture / Allied MSME micro-enterprise' : 'Services / Trading micro-enterprise',
        fundingSchemes: [
          {
            schemeName: 'Pradhan Mantri Mudra Yojana (PMMY) - Shishu Category',
            limit: 'Loans up to ₹50,000',
            subsidy: 'No collateral required. 2% interest subvention for timely payments.',
            bestFor: 'Initial inventory acquisition or local shop equipment setup.'
          },
          {
            schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
            limit: 'Up to ₹50 Lakhs (Manufacturing) | ₹20 Lakhs (Services)',
            subsidy: 'Rural Subsidy: 35% of project cost | Urban Subsidy: 25% of project cost.',
            bestFor: 'Higher capital machinery or local factory building.'
          },
          {
            schemeName: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
            limit: 'Collateral-free loans up to ₹2 Crores',
            subsidy: 'Guaranteed by SIDBI/Govt. with zero asset collateral.',
            bestFor: 'Scalable service platforms or retail agencies.'
          }
        ],
        checklist: [
          'Register on Udyam Registration Portal (100% Free, provides MSME certificate).',
          'Apply for a Business PAN Card and local Municipal Trade license.',
          'Open a Business Current Account with an authorized Public/Private Bank.',
          'Apply for GSTIN (Goods and Services Tax Identification Number) if turnover exceeds ₹40 Lakhs (or ₹20 Lakhs in hill states).'
        ],
        growthMilestones: [
          'Month 1: Prototype launch / local market testing with a micro-budget.',
          'Month 3: Secure initial Mudra Shishu funding & expand logistics.',
          'Month 6: Onboard 500+ local customers and apply for PMEGP rural subsidy.',
          'Month 12: Hire secondary employees and scale state-wide trading channels.'
        ]
      });
      setIsValidating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-gradient-to-br from-[#0a0718] via-[#0d0922] to-[#06040e] border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -top-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#091515] border border-teal-500/30 text-teal-300 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse"></span>
            AROHI Business Advisor
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            MSME & Startup <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Idea Validator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed mt-2">
            Validate local business concepts. Assess market viability, map immediate MSME registration pathways, check CGTMSE or Mudra funding eligibility, and draft project launch frameworks.
          </p>
        </div>
      </div>

      {/* SECURITY REGISTRATION NOTICE BANNER FOR STARTUP CHECKS */}
      {!user && (
        <div className="bg-gradient-to-r from-blue-950/40 via-[#0e163d]/40 to-blue-950/40 border border-blue-500/30 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-lg">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-blue-400 font-mono tracking-widest block">💼 MSME STARTUP REGISTRY</span>
            <h4 className="text-xs font-black text-white">
              Backup Your Mudra Loan Eligibility & Business Roadmaps
            </h4>
            <p className="text-[11px] text-slate-300 font-medium max-w-2xl">
              Currently generating checklists as a Guest. Connect with Google Sign-In to secure your business feasibility reports, export drafts directly, and link your credentials with local state microfinance schemes permanently.
            </p>
          </div>
          <button 
            onClick={onOpenAuth}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shrink-0 active:scale-95 hover:scale-[1.02]"
          >
            Create Entrepreneur Profile
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input parameters left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0c091f]/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4 text-slate-100">
            
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-2 border-b border-slate-800/80 pb-2.5 flex items-center gap-2">
              <Rocket className="w-4.5 h-4.5 text-purple-400" /> Startup Idea Specification
            </h3>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Sector Classification</label>
              <select
                value={sector}
                onChange={(e) => setSector(e?.target?.value ?? "")}
                className="w-full bg-[#080614]/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Agri-Tech / Farming">Agri-Tech / Allied Farming</option>
                <option value="Food Processing / Bakery">Food Processing & Local Bakery</option>
                <option value="Handloom / Textiles">Handloom, Handicrafts & Textiles</option>
                <option value="Retail shop / Trading">Retail Stores & Local Trading</option>
                <option value="IT platform / Software service">Software / App Platforms</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Proposed Capital Range</label>
              <select
                value={investment}
                onChange={(e) => setInvestment(e?.target?.value ?? "")}
                className="w-full bg-[#080614]/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Under ₹50,000">Micro-budget (Under ₹50,000)</option>
                <option value="₹50,000 - ₹5,000,000">Seed-capital (₹50,000 - ₹5 Lakhs)</option>
                <option value="₹500,000 - ₹2,000,000">Medium manufacturing (₹5 Lakhs - ₹20 Lakhs)</option>
                <option value="Above ₹2,000,000">Scalable enterprise (Above ₹20 Lakhs)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Launch Location Segment</label>
              <div className="grid grid-cols-2 gap-2">
                {['Rural Area', 'Urban Center'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocationType(l)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      locationType === l
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/50 shadow-md'
                        : 'bg-[#080614]/80 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Detail Business Description</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e?.target?.value ?? "")}
                placeholder="e.g. Starting an organic honey and beeswax retail store sourcing directly from local rural bee keepers in Karnataka."
                rows={4}
                className="w-full bg-[#080614]/90 border border-slate-700/80 rounded-xl p-3.5 text-xs md:text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleValidateIdea}
              disabled={isValidating || !idea.trim()}
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-[0_4px_25px_rgba(124,58,237,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isValidating ? 'AROHI Analysis running...' : 'Validate Business Framework'}
            </button>
          </div>

          {/* Quick interactive MSME Cost calculator */}
          <div className="bg-[#0c091f]/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-4 text-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#00e676] mb-2 border-b border-slate-800/80 pb-2.5 flex items-center gap-2">
              <DollarSign className="w-4.5 h-4.5 text-[#00e676]" /> Micro-Business Cost Planner
            </h3>

            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>Monthly Store Rent / Cloud costs</span>
                  <span className="font-extrabold text-white">₹{monthlyRent}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e?.target?.value ?? ""))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>Initial Inventory / Raw Materials</span>
                  <span className="font-extrabold text-white">₹{monthlyInventory}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={monthlyInventory}
                  onChange={(e) => setMonthlyInventory(Number(e?.target?.value ?? ""))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>Marketing & Local Listing cost</span>
                  <span className="font-extrabold text-white">₹{marketingCost}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="1000"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(Number(e?.target?.value ?? ""))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="bg-[#080614] p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase font-black tracking-wider leading-none">Total Run Capital Req.</span>
                  <span className="block text-base font-black text-white mt-1">₹{monthlyRent + monthlyInventory + marketingCost}</span>
                </div>
                <div className="bg-emerald-950/60 text-[#00e676] border border-emerald-500/30 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                  Mudra eligible
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Validation Results Right */}
        <div className="lg:col-span-7">
          {validation ? (
            <div className="bg-[#0c091f]/80 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl p-6 space-y-6 text-slate-100">
              
              {/* Score card */}
              <div className="bg-[#080614] border border-slate-800 p-4.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Market Feasibility index</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-purple-400">{validation.marketScore}%</span>
                    <span className="text-xs font-extrabold text-[#00e676] uppercase">Highly Profitable</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed mt-2">
                    {validation.feasibility}
                  </p>
                </div>
                <div className="bg-purple-950/60 text-purple-200 border border-purple-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0">
                  {validation.msmeCategory}
                </div>
              </div>

              {/* Funding suggestions */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3.5 flex items-center gap-2">
                  <Landmark className="w-4.5 h-4.5 text-purple-400" /> AROHI Government Loan Matching
                </h4>
                <div className="space-y-3">
                  {validation.fundingSchemes.map((item, idx) => (
                    <div key={idx} className="border border-slate-800 bg-[#080614]/80 rounded-xl p-4 hover:border-purple-500/40 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <span className="text-xs font-black text-white">{item.schemeName}</span>
                        <span className="bg-emerald-950/60 text-[#00e676] border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded leading-none shrink-0 uppercase">
                          {item.limit}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium mt-1 leading-normal">
                        **Feature details:** {item.subsidy}
                      </p>
                      <div className="mt-2 text-[10px] text-purple-200 font-bold bg-purple-950/40 border border-purple-500/20 py-1.5 px-2.5 rounded-lg">
                        💡 Best used for: {item.bestFor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Registration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-[#080614] p-4 rounded-xl border border-slate-800">
                  <h5 className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5 mb-2.5">
                    <FileCheck className="w-4 h-4 text-purple-400" /> Licensing Requirements
                  </h5>
                  <div className="space-y-2">
                    {validation.checklist.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-300 font-medium leading-normal">
                        <CheckSquare className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#080614] p-4 rounded-xl border border-slate-800">
                  <h5 className="text-[10px] font-black uppercase tracking-wider text-[#00e676] flex items-center gap-1.5 mb-2.5">
                    <Info className="w-4 h-4 text-[#00e676]" /> AROHI Launch Roadmap
                  </h5>
                  <div className="space-y-2">
                    {validation.growthMilestones.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-300 font-medium leading-normal">
                        <span className="text-[9px] font-extrabold bg-purple-950 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded-md leading-none shrink-0 mt-0.5">STEP</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-[#0c091f]/60 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2.5">
              <Landmark className="w-8 h-8 text-purple-400 animate-pulse" />
              <h4 className="font-extrabold text-white text-xs md:text-sm">No Active Business Plan Analyzed</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Draft your entrepreneurial concept description in the left configuration container to calculate feasibility and pull central registration requirements.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
