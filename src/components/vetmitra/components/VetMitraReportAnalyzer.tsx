// Arohi VetMitra - Laboratory Report & Diagnostic Evidence Analyzer
// Interprets Milk Quality, Blood Panels, Ketone Strips, Fecal Flotation, and Feed COAs

import React, { useState } from 'react';
import { 
  FileText, Upload, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { VetLanguage } from '../types';

interface Props {
  language: VetLanguage;
  onSendToChat?: (summary: string) => void;
}

interface TestTemplate {
  id: string;
  name: string;
  nameOdia: string;
  sampleType: string;
  keyParameters: {
    param: string;
    normalRange: string;
    unit: string;
    clinicalSignificance: string;
  }[];
}

const TEMPLATES: TestTemplate[] = [
  {
    id: 'milk_quality',
    name: 'Milk Quality & Auto-Analyzer Report',
    nameOdia: 'ଦୁଧ ଗୁଣବତ୍ତା ରିପୋର୍ଟ (Fat, SNF, CMT)',
    sampleType: 'Fresh milk sample',
    keyParameters: [
      { param: 'Milk Fat', normalRange: '3.5 – 5.0', unit: '%', clinicalSignificance: 'Low fat (<3.2%) indicates rumen acidosis or inadequate structural fiber (NDF).' },
      { param: 'Solids-Not-Fat (SNF)', normalRange: '8.5 – 9.2', unit: '%', clinicalSignificance: 'Low SNF (<8.5%) indicates dietary protein or energy deficit.' },
      { param: 'True Protein', normalRange: '3.0 – 3.8', unit: '%', clinicalSignificance: 'Reflects rumen microbial protein synthesis and metabolizable protein.' },
      { param: 'California Mastitis Test (CMT)', normalRange: 'Negative / Trace', unit: 'Score', clinicalSignificance: 'Gel formation indicates subclinical mastitis & elevated Somatic Cells.' },
    ],
  },
  {
    id: 'blood_cbc',
    name: 'Veterinary CBC & Blood Smear Panel',
    nameOdia: 'ରକ୍ତ ପରୀକ୍ଷା (CBC & Blood Smear)',
    sampleType: 'EDTA whole blood',
    keyParameters: [
      { param: 'Hemoglobin (Hb)', normalRange: '8.0 – 12.0', unit: 'g/dL', clinicalSignificance: 'Severe anemia (<6 g/dL) is common in Theileriosis, Babesiosis, or Fluke infestation.' },
      { param: 'Total Leukocyte Count (TLC)', normalRange: '5,000 – 12,000', unit: '/µL', clinicalSignificance: 'Elevated in acute bacterial infections and septic metritis/mastitis.' },
      { param: 'Hemoprotozoa Screen', normalRange: 'Negative', unit: 'Smear', clinicalSignificance: 'Detects intra-erythrocytic Babesia bigemina or Theileria annulata piroplasms.' },
    ],
  },
  {
    id: 'ketone_energy',
    name: 'Ketosis & Energy Balance Test',
    nameOdia: 'କିଟୋସିସ ପରୀକ୍ଷା (Urine / Blood Ketones)',
    sampleType: 'Urine or Capillary blood',
    keyParameters: [
      { param: 'Blood Beta-Hydroxybutyrate (BHBA)', normalRange: '< 1.2', unit: 'mmol/L', clinicalSignificance: 'BHBA 1.2–2.9 mmol/L indicates subclinical ketosis; >3.0 is clinical ketosis.' },
      { param: 'Urine Acetoacetate Strip', normalRange: 'Negative', unit: 'Qualitative', clinicalSignificance: 'Purple color indicates mobilization of body fat and negative energy balance.' },
    ],
  },
  {
    id: 'fecal_exam',
    name: 'Fecal Flotation & Sedimentation (Deworming Guide)',
    nameOdia: 'ଗୋବର/ମଳ ପରୀକ୍ଷା (Fecal Egg Count)',
    sampleType: 'Fresh fecal sample',
    keyParameters: [
      { param: 'Strongyle / Haemonchus Eggs', normalRange: '< 200', unit: 'EPG', clinicalSignificance: 'High egg count indicates need for targeted selective deworming.' },
      { param: 'Amphistome / Fluke Eggs', normalRange: 'Negative', unit: 'Qualitative', clinicalSignificance: 'Immature paramphistomes cause sudden severe watery diarrhea and bottle jaw.' },
    ],
  },
];

export const VetMitraReportAnalyzer: React.FC<Props> = ({
  language,
  onSendToChat,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TestTemplate>(TEMPLATES[0]);
  const [reportText, setReportText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSimulateAnalyze = () => {
    if (!reportText.trim() && !uploadedFileName) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const output =
        language === 'or'
          ? `📋 ରିପୋର୍ଟ ସାରାଂଶ ଓ ପରାମର୍ଶ:\n\n• ପରୀକ୍ଷା ପ୍ରକାର: ${selectedTemplate.nameOdia}\n• ମୁଖ୍ୟ ନିରୀକ୍ଷଣ: ଆପଣଙ୍କ ଦ୍ୱାରା ଦିଆଯାଇଥିବା ତଥ୍ୟ ଅନୁସାରେ ପାରାମିଟରଗୁଡ଼ିକ ଯାଞ୍ଚ କରାଗଲା।\n• ଡାଏରୀ ସମତୁଳନ: ଯଦି Fat/SNF କମ୍ ଅଛି, ତେବେ NASEM Ration Studio ରେ ସବୁଜ ଘାସ ଓ ଧାନ ନଡ଼ାର ତନ୍ତୁ (NDF) ବଢ଼ାଇବାକୁ ବିଚାର କରନ୍ତୁ।\n• ଡାକ୍ତରୀ ନିର୍ଦ୍ଦେଶ: ଏହି ବିଶ୍ଳେଷଣ ସ୍କ୍ରିନିଂ ଉଦ୍ଦେଶ୍ୟରେ ଦିଆଯାଇଛି। ଆଣ୍ଟିବାୟୋଟିକ୍ ବା ଔଷଧ ନିର୍ଦ୍ଧାରଣ ପାଇଁ ଲାଇସେନ୍ସପ୍ରାପ୍ତ ପଶୁଚିକିତ୍ସକଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ।`
          : `📋 Laboratory Diagnostic Interpretation:\n\n• Test Category: ${selectedTemplate.name}\n• Clinical Assessment: Parameters evaluated against bovine reference ranges.\n• Nutritional Correlation: Ensure structural fiber (NDF > 28%) and balanced crude protein (CP ~16%) to maintain optimal milk components.\n• Veterinary Guidance: This interpretation provides clinical decision support. Confirm antimicrobial selection or prescription dosages with your attending veterinarian.`;

      setAnalysisResult(output);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-100">
              {language === 'or' ? 'ଲାବୋରେଟୋରୀ ରିପୋର୍ଟ ଓ ପରୀକ୍ଷା ସହାୟତା' : 'Diagnostic Evidence & Lab Report Interpreter'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Decode milk auto-analyzer slips, complete blood counts, ketone test strips, or feed certificate of analysis (COA) into plain language.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Template selector & Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Select Report Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl);
                      setAnalysisResult(null);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedTemplate.id === tpl.id
                        ? 'bg-teal-950/40 border-teal-500/50 text-teal-200 ring-1 ring-teal-500/20 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium text-slate-200 truncate">
                      {language === 'or' ? tpl.nameOdia : tpl.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{tpl.sampleType}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload or Paste */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Paste Report Values or Enter Observations
              </label>
              <textarea
                rows={4}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="e.g. Milk Fat: 3.4%, SNF: 8.1%, Protein: 2.9%, CMT: 2+ gel formation in right hind quarter..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors">
                <Upload className="w-3.5 h-3.5 text-teal-400" />
                <span>{uploadedFileName ? uploadedFileName : 'Upload PDF / Photo'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedFileName(file.name);
                  }}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleSimulateAnalyze}
                disabled={!reportText.trim() && !uploadedFileName}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Interpret Report'}</span>
              </button>
            </div>
          </div>

          {/* Reference Ranges Table */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="text-xs font-semibold text-slate-300">
              Standard Diagnostic Reference Ranges ({selectedTemplate.name})
            </div>
            <div className="space-y-2">
              {selectedTemplate.keyParameters.map((param, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-200">{param.param}</span>
                    <span className="font-mono text-[11px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      Normal: {param.normalRange} {param.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {param.clinicalSignificance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Diagnostic Interpretation Result */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">
                  {language === 'or' ? 'ଆରୋହୀ ବିଶ୍ଳେଷଣ ଫଳାଫଳ' : 'Arohi Clinical Findings'}
                </h3>
              </div>
              {analysisResult && onSendToChat && (
                <button
                  onClick={() => onSendToChat(analysisResult)}
                  className="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center gap-1"
                >
                  <span>Discuss in Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {analysisResult ? (
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/20 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {analysisResult}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-200/90">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Veterinary Governance Rule: Automated diagnostic interpretation provides clinical decision support. Always verify drug doses, withdrawal periods, and treatments with your attending veterinary surgeon.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 text-xs space-y-2">
                <FileText className="w-10 h-10 text-slate-700" />
                <p>
                  Paste your test parameters on the left or upload a PDF/slip to generate a structured interpretation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
