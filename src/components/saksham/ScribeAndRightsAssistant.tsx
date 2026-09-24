// Arohi Saksham - Scribe Declaration Generator, 4% Reservation Calculator & Rights Toolkit
// Tailored for Divyangjan Aspirants, Students, and Job Seekers

import React, { useState } from 'react';
import { 
  FileText, 
  Calculator, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  Info
} from 'lucide-react';

interface ScribeAndRightsAssistantProps {
  isDarkMode?: boolean;
  highContrast?: boolean;
  onAskArohi?: (query: string) => void;
}

export const ScribeAndRightsAssistant: React.FC<ScribeAndRightsAssistantProps> = ({
  isDarkMode = false,
  highContrast = false,
  onAskArohi
}) => {
  const [activeTab, setActiveTab] = useState<'scribe-generator' | 'reservation-calc' | 'udid-checklist'>('scribe-generator');

  // Scribe Form State
  const [candidateName, setCandidateName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [examName, setExamName] = useState('Staff Selection Commission (SSC) CGL');
  const [examDate, setExamDate] = useState('');
  const [disabilityType, setDisabilityType] = useState('Blindness / Low Vision');
  const [disabilityPercent, setDisabilityPercent] = useState('75');
  const [scribeOption, setScribeOption] = useState<'own' | 'commission'>('own');
  const [scribeName, setScribeName] = useState('');
  const [scribeEducation, setScribeEducation] = useState('Higher Secondary / 12th Pass');
  const [scribeIdProof, setScribeIdProof] = useState('Aadhaar Card');
  const [scribeIdNumber, setScribeIdNumber] = useState('');
  const [copiedForm, setCopiedForm] = useState(false);

  // Reservation Calculator State
  const [userCategory, setUserCategory] = useState<'UR' | 'OBC' | 'SC' | 'ST' | 'EWS'>('UR');
  const [disabilityCategory, setDisabilityCategory] = useState<'cat-a' | 'cat-b' | 'cat-c' | 'cat-d-e'>('cat-a');
  const [examDurationHours, setExamDurationHours] = useState('2');

  // Scribe Letter Template Output
  const generatedScribeDeclaration = `UNDERTAKING REGARDING APPOINTMENT OF SCRIBE & COMPENSATORY TIME
(In Accordance with MoSJE Guidelines F.No. 34-02/2015-DD-III & Hon'ble Supreme Court Ruling in Vikash Kumar v. UPSC)

To,
The Centre Superintendent / Presiding Officer,
Examination: ${examName || '[Name of Examination]'}
Date of Examination: ${examDate || '[Date of Exam]'}

Sir / Madam,

I, ${candidateName || '[Candidate Name]'}, bearing Roll Number ${rollNumber || '[Roll No]'}, am a candidate with benchmark disability under the Rights of Persons with Disabilities (RPwD) Act 2016.

1. DISABILITY PARTICULARS:
   - Nature of Disability: ${disabilityType}
   - Benchmark Percentage: ${disabilityPercent}%
   - Physical Limitation to Write: Certified as per statutory guidelines.

2. SCRIBE SELECTION:
   ${scribeOption === 'own' ? `- I am bringing my own scribe:
     Name of Scribe: ${scribeName || '[Scribe Name]'}
     Highest Educational Qualification: ${scribeEducation}
     Photo ID Document: ${scribeIdProof} (Number: ${scribeIdNumber || '[ID Number]'})` : `- I request the examination authority / commission to kindly provide a qualified scribe at the exam venue.`}

3. STATUTORY COMPENSATORY TIME CLAIM:
   Under the official guidelines of the Ministry of Social Justice and Empowerment, I am statutorily entitled to compensatory extra time of not less than 20 minutes per hour of examination (${parseInt(examDurationHours || '2') * 20} minutes for this examination), which must be granted irrespective of whether a scribe is utilized.

DECLARATION:
I hereby declare that the particulars furnished above are true to the best of my knowledge.

Candidate Signature: _______________________
Name: ${candidateName || '[Candidate Name]'}
Contact: __________________________________
Date: ${new Date().toLocaleDateString('en-IN')}`;

  const handleCopyForm = () => {
    navigator.clipboard.writeText(generatedScribeDeclaration);
    setCopiedForm(true);
    setTimeout(() => setCopiedForm(false), 2000);
  };

  const handlePrintForm = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Scribe Undertaking Declaration - ${candidateName || 'Candidate'}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; font-size: 13pt; }
              pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 12pt; }
            </style>
          </head>
          <body>
            <pre>${generatedScribeDeclaration}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Calculate age relaxation
  const calculateAgeRelaxation = () => {
    switch (userCategory) {
      case 'UR':
      case 'EWS':
        return 10;
      case 'OBC':
        return 13; // 10 + 3
      case 'SC':
      case 'ST':
        return 15; // 10 + 5
      default:
        return 10;
    }
  };

  const compensatoryExtraMinutes = (parseInt(examDurationHours) || 2) * 20;

  return (
    <div className="w-full space-y-8 font-sans">
      
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        highContrast
          ? 'bg-zinc-950 border-amber-500 text-amber-300'
          : isDarkMode
            ? 'bg-gradient-to-br from-emerald-950/40 via-[#0a1410] to-[#070b0d] border-emerald-500/20 text-white'
            : 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-emerald-200/70 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal Empowerment &amp; Exam Toolkit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Scribe Declaration &amp; 4% RPwD Rights Engine
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate standardized scribe declaration letters, calculate 4% government job reservation benefits, 10-year age relaxations, and compensatory exam time (20 min/hr) under official DoPT norms.
            </p>
          </div>

          {onAskArohi && (
            <button
              onClick={() => onAskArohi('Explain all scribe rules, compensatory time and RPwD 4% reservation in detail.')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Arohi About Exam Rules</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-black/8 dark:border-white/8 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('scribe-generator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'scribe-generator'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-black/5 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Scribe Undertaking Generator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reservation-calc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'reservation-calc'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-black/5 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>4% Reservation &amp; Age Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('udid-checklist')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'udid-checklist'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-black/5 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>UDID &amp; ADIP Checklist</span>
        </button>
      </div>

      {/* Tab 1: Scribe Declaration Generator */}
      {activeTab === 'scribe-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`p-6 rounded-3xl border ${
              highContrast
                ? 'bg-zinc-950 border-amber-500 text-amber-300'
                : isDarkMode
                  ? 'bg-[#111722] border-white/8 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span>Enter Candidate &amp; Examination Details</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                    Candidate Full Name:
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                      Roll Number:
                    </label>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 2401089201"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                      Exam Date:
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                    Examination Name:
                  </label>
                  <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="e.g. UPSC CSE / SSC CGL / IBPS PO / State PSC"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                      Disability Category:
                    </label>
                    <select
                      value={disabilityType}
                      onChange={(e) => setDisabilityType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Blindness / Low Vision">Blindness / Low Vision</option>
                      <option value="Locomotor Disability (Both Hands Affected)">Locomotor (Hands Affected)</option>
                      <option value="Cerebral Palsy">Cerebral Palsy</option>
                      <option value="Dyslexia / Specific Learning Disability">Dyslexia / SLD</option>
                      <option value="Muscular Dystrophy">Muscular Dystrophy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                      Disability Percentage (%):
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="100"
                      value={disabilityPercent}
                      onChange={(e) => setDisabilityPercent(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                    Scribe Arrangement Option:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setScribeOption('own')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        scribeOption === 'own'
                          ? 'border-emerald-500 bg-emerald-500/10 font-bold'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      Bringing Own Scribe
                    </button>
                    <button
                      type="button"
                      onClick={() => setScribeOption('commission')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        scribeOption === 'commission'
                          ? 'border-emerald-500 bg-emerald-500/10 font-bold'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      Request Exam Authority Scribe
                    </button>
                  </div>
                </div>

                {scribeOption === 'own' && (
                  <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                        Scribe Full Name:
                      </label>
                      <input
                        type="text"
                        value={scribeName}
                        onChange={(e) => setScribeName(e.target.value)}
                        placeholder="e.g. Amit Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                          Scribe Qualification:
                        </label>
                        <input
                          type="text"
                          value={scribeEducation}
                          onChange={(e) => setScribeEducation(e.target.value)}
                          placeholder="e.g. 12th Pass"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                          Scribe ID Number:
                        </label>
                        <input
                          type="text"
                          value={scribeIdNumber}
                          onChange={(e) => setScribeIdNumber(e.target.value)}
                          placeholder="e.g. Aadhaar / Voter ID"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Preview Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`p-6 rounded-3xl border flex flex-col h-full ${
              highContrast
                ? 'bg-zinc-950 border-amber-500 text-amber-300'
                : isDarkMode
                  ? 'bg-[#0f151f] border-white/8 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Standard Scribe Undertaking Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyForm}
                    className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Copy declaration"
                  >
                    {copiedForm ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedForm ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintForm}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Print formal undertaking"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 font-mono text-xs overflow-y-auto max-h-[440px] leading-relaxed select-all">
                <pre className="whitespace-pre-wrap font-mono">{generatedScribeDeclaration}</pre>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Supreme Court Mandate (Vikash Kumar v. UPSC):</span>
                </div>
                <p>
                  Examination conducting bodies cannot impose arbitrary qualification limits on scribes, and compensatory extra time of 20 min/hr must be granted even if no scribe is used.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 4% Reservation & Age Relaxation Calculator */}
      {activeTab === 'reservation-calc' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className={`p-6 rounded-3xl border ${
            highContrast
              ? 'bg-zinc-950 border-amber-500 text-amber-300'
              : isDarkMode
                ? 'bg-[#111722] border-white/8 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-base font-bold mb-4">
              RPwD Act 2016 4% Government Job Reservation &amp; Age Calculator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                  Social Category:
                </label>
                <select
                  value={userCategory}
                  onChange={(e) => setUserCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                >
                  <option value="UR">Unreserved (General)</option>
                  <option value="OBC">OBC (Non-Creamy Layer)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                  RPwD Category:
                </label>
                <select
                  value={disabilityCategory}
                  onChange={(e) => setDisabilityCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                >
                  <option value="cat-a">Category A: Blindness &amp; Low Vision (1%)</option>
                  <option value="cat-b">Category B: Deaf &amp; Hard of Hearing (1%)</option>
                  <option value="cat-c">Category C: Locomotor Disability (1%)</option>
                  <option value="cat-d-e">Category D &amp; E: Autism/SLD/Multiple (1%)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-500 dark:text-slate-400">
                  Exam Duration (Hours):
                </label>
                <select
                  value={examDurationHours}
                  onChange={(e) => setExamDurationHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
                >
                  <option value="1">1 Hour Exam</option>
                  <option value="2">2 Hours Exam (Typical)</option>
                  <option value="3">3 Hours Exam</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/5 dark:border-white/5">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Upper Age Relaxation
                </span>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  +{calculateAgeRelaxation()} Years
                </p>
                <p className="text-[10px] text-slate-500">
                  {userCategory === 'UR' ? 'Standard 10-Yr PwD relaxation' : `10 Yrs (PwD) + Category benefit`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center space-y-1">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                  Compensatory Extra Time
                </span>
                <p className="text-2xl font-black text-blue-700 dark:text-blue-300">
                  +{compensatoryExtraMinutes} Minutes
                </p>
                <p className="text-[10px] text-slate-500">
                  20 minutes per hour mandatory
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center space-y-1">
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase">
                  Exam Application Fee
                </span>
                <p className="text-2xl font-black text-teal-700 dark:text-teal-300">
                  100% Free (₹0)
                </p>
                <p className="text-[10px] text-slate-500">
                  Exempted across UPSC, SSC, IBPS, Railways
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: UDID & ADIP Checklist */}
      {activeTab === 'udid-checklist' && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className={`p-6 rounded-3xl border space-y-4 ${
            highContrast
              ? 'bg-zinc-950 border-amber-500 text-amber-300'
              : isDarkMode
                ? 'bg-[#111722] border-white/8 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                🪪
              </span>
              <h3 className="text-base font-bold">UDID Card 4-Step Roadmap</h3>
            </div>

            <ol className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Online Application</strong>
                  Visit swavlambancard.gov.in and complete personal, address, and disability info.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Document Upload</strong>
                  Upload Aadhaar card, color passport photograph, and signature/thumb impression.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Hospital Medical Board Assessment</strong>
                  Receive SMS appointment for evaluation at your District Civil Surgeon / CMO office.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Instant e-UDID &amp; Plastic Card Delivery</strong>
                  Download digitally signed e-Disability Certificate immediately; plastic smart card arrives via Speed Post.
                </div>
              </li>
            </ol>

            <a
              href="https://www.swavlambancard.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <span>Go to Swavlamban Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className={`p-6 rounded-3xl border space-y-4 ${
            highContrast
              ? 'bg-zinc-950 border-amber-500 text-amber-300'
              : isDarkMode
                ? 'bg-[#111722] border-white/8 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                ♿
              </span>
              <h3 className="text-base font-bold">ADIP 100% Free Aids Roadmap</h3>
            </div>

            <ol className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Income Eligibility Check</strong>
                  Monthly family income ≤ ₹20,000 grants 100% free aids; ₹20,001 - ₹30,000 grants 50% subsidy.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Collect Income Certificate</strong>
                  From local Tahsildar, BDO, SDM, or Gazetted Officer.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Attend ALIMCO Assessment Camp</strong>
                  Held in all 700+ districts; measurements taken for customized limbs, tricycles, or canes.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Receive Free Devices</strong>
                  Motorized tricycle, wheelchair, smart sonar canes, hearing aids, or braille slates handed over with warranty.
                </div>
              </li>
            </ol>

            <a
              href="https://disabilityaffairs.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
            >
              <span>DEPwD ALIMCO Guidelines</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
