import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  MessageSquare, 
  FileText, 
  Layers, 
  TrendingUp, 
  Calendar, 
  Zap, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  Check
} from 'lucide-react';
import { FutureMapResult, Mission87Enrollment } from '../../types/mission87';
import { MISSION_87_TRACKS } from '../../data/mission87Data';

interface FutureMapDiagnosticProps {
  enrollment?: Mission87Enrollment | null;
  onOpenChatWithPrompt?: (prompt: string) => void;
  onSaveFutureMap?: (futureMap: FutureMapResult) => void;
}

export default function FutureMapDiagnostic({ 
  enrollment, 
  onOpenChatWithPrompt,
  onSaveFutureMap 
}: FutureMapDiagnosticProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [generatedMap, setGeneratedMap] = useState<FutureMapResult | null>(enrollment?.futureMap || null);

  // Diagnostic Answers State
  const [userLocationState, setUserLocationState] = useState(enrollment?.state || 'Odisha');
  const [userDistrict, setUserDistrict] = useState(enrollment?.district || '');
  const [userStanding, setUserStanding] = useState(enrollment?.educationStatus || 'seeking_work');
  const [userTrack, setUserTrack] = useState(enrollment?.primaryTrack || 'digital_business');
  const [primaryGoal, setPrimaryGoal] = useState<'earn_first_5k' | 'launch_local_manufacturing' | 'freelance_digital' | 'secure_apprenticeship'>('earn_first_5k');
  const [availableDailyHours, setAvailableDailyHours] = useState('3-4 hours');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDiagnosticFutureMap = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const selectedTrackObj = MISSION_87_TRACKS.find(t => t.id === userTrack) || MISSION_87_TRACKS[0];

      const locationStr = userDistrict ? `${userDistrict}, ${userLocationState}` : userLocationState;

      const newMap: FutureMapResult = {
        cadetTitle: `Mission 87 Specialist (${selectedTrackObj.title})`,
        trackName: selectedTrackObj.title,
        summaryVision: `A dedicated 90-day execution roadmap for ${locationStr} to build tangible skills, complete a verified prototype, connect with paying buyers, and unlock the first ₹5,000 milestone.`,
        geographicScope: {
          local: `Identify 5 immediate retail or micro-enterprises within 5km radius in ${locationStr}.`,
          district: `Expand service / product delivery across ${userDistrict || 'district'} market clusters & weekly haats.`,
          national: `List verified offerings on ONDC, IndiaMART, or GeM portal for interstate commerce.`,
          global: `Export digital assets or artisan goods via global marketplaces.`
        },
        phase1Learn: {
          title: "Days 1–20: Micro-Skill Mastery",
          duration: "20 Days (2-3 hrs/day)",
          skills: [
            selectedTrackObj.first5kBlueprint.skillToLearn,
            "Costing, Unit Economics & Margin Calculation",
            "Arohi AI Prompt Engineering for Business Workflows"
          ],
          tools: ["Smartphone / PC", "Arohi AI Studio", "Google Sheets & Canva / Figma"],
          aiGuidance: "Use Arohi AI daily to practice client communication, generate templates, and debug roadblocks."
        },
        phase2Build: {
          title: "Days 21–45: Prototype & Quality Proof",
          duration: "25 Days",
          prototypeIdea: selectedTrackObj.first5kBlueprint.productToBuild,
          deliverable: "1 working showcase portfolio or 3 physical product samples with professional labeling.",
          testMilestone: "Present prototype to 2 trusted local business owners for brutally honest feedback."
        },
        phase3Find: {
          title: "Days 46–70: Buyer Discovery & Outreach",
          duration: "25 Days",
          targetAudiences: [
            selectedTrackObj.first5kBlueprint.targetBuyers,
            "Local Trade Association / Merchant Guild Members",
            "Direct-to-Consumer Neighborhood Communities"
          ],
          outreachStrategy: "In-person visits + high-value sample demonstration + WhatsApp Business showcase.",
          closingPitch: "Offer a verified pilot: 'Pay only when satisfied with the verified outcome.'"
        },
        phase4DeliverEarn: {
          title: "Days 71–90: Delivery & First ₹5,000 Unlock",
          duration: "20 Days",
          milestone5kGoal: "Close first 2 paying clients or sell initial 50 product units = ₹5,000 net earned.",
          valueProposition: "Deliver reliable, on-time, high-quality output that earns repeat business and word-of-mouth.",
          nextScaleLadder: "Reinvest 50% earnings into higher throughput machinery or advanced AI productivity tools."
        },
        manufacturingScope: userTrack === 'manufacturing' ? {
          rawMaterials: ["Locally abundant district raw materials", "Eco-friendly bio-packaging"],
          machines: ["Semi-automatic hydraulic press / manual die cutter"],
          schemes: ["PMEGP (up to 35% subsidy)", "MUDRA Shishu Loan (up to ₹50,000)"],
          demandNiche: "Regional banquets, caterers, and sustainable packaging retailers.",
          estimatedCapital: "₹25,000 – ₹1,00,000 (accessible via micro-credit)"
        } : undefined
      };

      setGeneratedMap(newMap);
      setIsGenerating(false);
      if (onSaveFutureMap) {
        onSaveFutureMap(newMap);
      }
    }, 600);
  };

  const handleDownloadFutureMap = () => {
    if (!generatedMap) return;
    const content = `=====================================================
🇮🇳 MISSION 87: YOUR 90-DAY FUTURE MAP BLUEPRINT
AROHI AI — ONE AI. INFINITE OPPORTUNITIES.
=====================================================
Cadet Title: ${generatedMap.cadetTitle}
Track: ${generatedMap.trackName}
Target Region: ${userDistrict ? `${userDistrict}, ` : ''}${userLocationState}

CORE SUMMARY & VISION:
${generatedMap.summaryVision}

-----------------------------------------------------
PHASE 1: ${generatedMap.phase1Learn.title} (${generatedMap.phase1Learn.duration})
• Skills to Master:
  - ${generatedMap.phase1Learn.skills.join('\n  - ')}
• Recommended Tools: ${generatedMap.phase1Learn.tools.join(', ')}
• AI Guidance: ${generatedMap.phase1Learn.aiGuidance}

-----------------------------------------------------
PHASE 2: ${generatedMap.phase2Build.title} (${generatedMap.phase2Build.duration})
• Prototype to Build: ${generatedMap.phase2Build.prototypeIdea}
• Deliverable: ${generatedMap.phase2Build.deliverable}
• Verification Milestone: ${generatedMap.phase2Build.testMilestone}

-----------------------------------------------------
PHASE 3: ${generatedMap.phase3Find.title} (${generatedMap.phase3Find.duration})
• Target Buyers: ${generatedMap.phase3Find.targetAudiences.join('; ')}
• Outreach Strategy: ${generatedMap.phase3Find.outreachStrategy}
• Closing Pitch: ${generatedMap.phase3Find.closingPitch}

-----------------------------------------------------
PHASE 4: ${generatedMap.phase4DeliverEarn.title} (${generatedMap.phase4DeliverEarn.duration})
• ₹5,000 Milestone Target: ${generatedMap.phase4DeliverEarn.milestone5kGoal}
• Core Value Delivered: ${generatedMap.phase4DeliverEarn.valueProposition}
• Scale Ladder: ${generatedMap.phase4DeliverEarn.nextScaleLadder}

-----------------------------------------------------
GEOGRAPHIC EXPANSION LADDER:
• Local (0-5km): ${generatedMap.geographicScope.local}
• District: ${generatedMap.geographicScope.district}
• National: ${generatedMap.geographicScope.national}
• Global: ${generatedMap.geographicScope.global}

-----------------------------------------------------
HOTLINE & SUPPORT:
National Helpline: +91-90904 55555 | Cadet Desk: +91-93379 52401
Official Portal: https://arohiai.com
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission87_FutureMap_${userDistrict || 'Cadet'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-left">
      {/* If Map is not yet generated or user wants to re-run */}
      {!generatedMap ? (
        <div className="bg-[#120d2c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Step {currentStep} of 3
                </span>
                <span className="text-xs text-amber-400 font-bold">● AI Future Map Diagnostic</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Generate Your 90-Day Activation Blueprint
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Answer 3 quick questions to calculate your optimal pathway from confusion to your first ₹5,000 milestone.
              </p>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-sm font-black text-purple-200 uppercase tracking-wide">
                1. Where are you located and what is your current standing?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Your District</label>
                  <input
                    type="text"
                    value={userDistrict}
                    onChange={(e) => setUserDistrict(e.target.value)}
                    placeholder="e.g. Sambalpur / Cuttack / Varanasi / Nagpur"
                    className="w-full bg-[#090618] border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Current Status</label>
                  <select
                    value={userStanding}
                    onChange={(e) => setUserStanding(e.target.value as any)}
                    className="w-full bg-[#090618] border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-purple-400"
                  >
                    <option value="studying">Student (School / College)</option>
                    <option value="seeking_work">Job Seeker / Searching for Direction</option>
                    <option value="left_education">Left Formal Education Early</option>
                    <option value="skilled_unrecognized">Have Skills / Artisan (No Formal Degree)</option>
                    <option value="aspiring_builder">Aspiring to Manufacture / Build Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-sm font-black text-purple-200 uppercase tracking-wide">
                2. Which domain excites you the most to create value?
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MISSION_87_TRACKS.map((trk) => {
                  const isSel = userTrack === trk.id;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => setUserTrack(trk.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSel
                          ? 'bg-purple-600/25 border-purple-400 text-white shadow-lg'
                          : 'bg-[#090618] border-purple-500/20 text-slate-300 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-amber-300">{trk.badge}</span>
                          {isSel && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <h5 className="text-sm font-black text-white">{trk.title}</h5>
                        <p className="text-xs text-slate-400 line-clamp-2">{trk.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white uppercase font-bold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-sm font-black text-purple-200 uppercase tracking-wide">
                3. What is your primary 90-day objective?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'earn_first_5k', title: 'Unlock First ₹5,000 Earnings', desc: 'Deliver proof-of-work value to 2 real clients or buyers.' },
                  { id: 'launch_local_manufacturing', title: 'Start Micro-Manufacturing Unit', desc: 'Procure small machine + leverage PMEGP/Mudra subsidy.' },
                  { id: 'freelance_digital', title: 'AI-Enabled Digital Agency', desc: 'Provide WhatsApp catalogs, flyers, and automation to local shops.' },
                  { id: 'secure_apprenticeship', title: 'High-Value Apprenticeship / Job', desc: 'Build an undeniable showcase portfolio for direct hiring.' }
                ].map((g) => {
                  const isSel = primaryGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setPrimaryGoal(g.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSel
                          ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                          : 'bg-[#090618] border-purple-500/20 text-slate-300 hover:border-purple-500/50'
                      }`}
                    >
                      <h5 className="text-xs font-black text-emerald-300">{g.title}</h5>
                      <p className="text-[11px] text-slate-400 mt-1">{g.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white uppercase font-bold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={generateDiagnosticFutureMap}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 via-purple-600 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Calculating Diagnostic...' : 'Calculate My 90-Day Future Map 🚀'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Generated Roadmap View */
        <div className="space-y-6">
          <div className="bg-[#120d2c]/95 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇳</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    90-Day Action Roadmap Active
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  {generatedMap.cadetTitle}
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed max-w-2xl">
                  {generatedMap.summaryVision}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadFutureMap}
                  className="px-3.5 py-2 bg-[#1b1342] hover:bg-[#251b5c] border border-purple-500/40 text-purple-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Blueprint</span>
                </button>

                <button
                  onClick={() => setGeneratedMap(null)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                  title="Re-run Diagnostic"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* 4 Phases Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phase 1: Learn */}
              <div className="bg-[#0c0822] border border-purple-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-violet-600/30 text-violet-300 font-black text-xs flex items-center justify-center border border-violet-500/40">1</span>
                    <h4 className="text-xs font-black text-white uppercase">{generatedMap.phase1Learn.title}</h4>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{generatedMap.phase1Learn.duration}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Core Skills To Acquire:</span>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc font-medium">
                    {generatedMap.phase1Learn.skills.map((sk, i) => (
                      <li key={i}>{sk}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-2.5 text-[11px] text-purple-200">
                  💡 <strong className="font-bold">Arohi AI Assist:</strong> {generatedMap.phase1Learn.aiGuidance}
                </div>
              </div>

              {/* Phase 2: Build */}
              <div className="bg-[#0c0822] border border-amber-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600/30 text-amber-300 font-black text-xs flex items-center justify-center border border-amber-500/40">2</span>
                    <h4 className="text-xs font-black text-white uppercase">{generatedMap.phase2Build.title}</h4>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{generatedMap.phase2Build.duration}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Prototype Deliverable:</span>
                  <p className="text-xs font-bold text-amber-300 leading-snug">{generatedMap.phase2Build.prototypeIdea}</p>
                  <p className="text-[11px] text-slate-300 mt-1">{generatedMap.phase2Build.deliverable}</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-[11px] text-amber-200">
                  🎯 <strong className="font-bold">Proof Milestone:</strong> {generatedMap.phase2Build.testMilestone}
                </div>
              </div>

              {/* Phase 3: Find */}
              <div className="bg-[#0c0822] border border-cyan-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-600/30 text-cyan-300 font-black text-xs flex items-center justify-center border border-cyan-500/40">3</span>
                    <h4 className="text-xs font-black text-white uppercase">{generatedMap.phase3Find.title}</h4>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{generatedMap.phase3Find.duration}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target Buyers & Outreach:</span>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc font-medium">
                    {generatedMap.phase3Find.targetAudiences.map((aud, i) => (
                      <li key={i}>{aud}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-cyan-200 pt-1 font-medium">Strategy: {generatedMap.phase3Find.outreachStrategy}</p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-2.5 text-[11px] text-cyan-100">
                  💬 <strong className="font-bold">Pitch:</strong> "{generatedMap.phase3Find.closingPitch}"
                </div>
              </div>

              {/* Phase 4: Deliver & Earn First 5K */}
              <div className="bg-[#0c0822] border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-300 font-black text-xs flex items-center justify-center border border-emerald-500/40">4</span>
                    <h4 className="text-xs font-black text-white uppercase">{generatedMap.phase4DeliverEarn.title}</h4>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">₹5,000 Unlock</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Milestone Target:</span>
                  <p className="text-xs font-bold text-emerald-300 leading-snug">{generatedMap.phase4DeliverEarn.milestone5kGoal}</p>
                  <p className="text-[11px] text-slate-300 mt-1">{generatedMap.phase4DeliverEarn.valueProposition}</p>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-[11px] text-emerald-200">
                  🚀 <strong className="font-bold">Next Scale Step:</strong> {generatedMap.phase4DeliverEarn.nextScaleLadder}
                </div>
              </div>
            </div>

            {/* Geographic Scope Ladder */}
            <div className="bg-[#09061a] border border-purple-500/20 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Geographic Scale Ladder (Local → Global)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-[#120d2a] rounded-xl border border-purple-500/10 space-y-1">
                  <span className="text-[9px] font-black uppercase text-amber-400 block">1. Local (0–5 km)</span>
                  <p className="text-xs text-slate-300 font-medium">{generatedMap.geographicScope.local}</p>
                </div>
                <div className="p-3 bg-[#120d2a] rounded-xl border border-purple-500/10 space-y-1">
                  <span className="text-[9px] font-black uppercase text-emerald-400 block">2. District Market</span>
                  <p className="text-xs text-slate-300 font-medium">{generatedMap.geographicScope.district}</p>
                </div>
                <div className="p-3 bg-[#120d2a] rounded-xl border border-purple-500/10 space-y-1">
                  <span className="text-[9px] font-black uppercase text-cyan-400 block">3. National (ONDC/GeM)</span>
                  <p className="text-xs text-slate-300 font-medium">{generatedMap.geographicScope.national}</p>
                </div>
                <div className="p-3 bg-[#120d2a] rounded-xl border border-purple-500/10 space-y-1">
                  <span className="text-[9px] font-black uppercase text-purple-400 block">4. Global Exports</span>
                  <p className="text-xs text-slate-300 font-medium">{generatedMap.geographicScope.global}</p>
                </div>
              </div>
            </div>

            {/* Ask Arohi About This Blueprint */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400 font-medium">
                Want step-by-step guidance, script templates, or buyer outreach messages for this roadmap?
              </p>
              <button
                onClick={() => {
                  if (onOpenChatWithPrompt) {
                    onOpenChatWithPrompt(`Hi Arohi, I have activated my Mission 87 90-day Future Map for ${generatedMap.trackName}. Can you give me the exact step-by-step Day 1 to Day 7 action plan to build my prototype and find my first 2 clients in ${userDistrict || userLocationState}?`);
                  }
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Arohi To Guide Step 1 ✨</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
