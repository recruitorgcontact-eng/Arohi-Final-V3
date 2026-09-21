// Arohi VetMitra - Offline-Enabled Previous Consultations & Clinical Summaries View
// Enables farmers to view past diagnosis, prescriptions, first-aid, and transcripts offline.

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Calendar, FileText, Stethoscope, 
  Sparkles, CheckCircle2, AlertTriangle, ChevronDown, 
  ChevronUp, PhoneCall, MessageSquare, Download, Share2, 
  Filter, WifiOff, RefreshCw
} from 'lucide-react';
import { VetConsultationSummary, vetOfflineStorage } from '../utils/vetOfflineStorage';
import { VetLanguage, VetSpecies } from '../types';
import { UniversalAnimalRecord } from '../data/mockAnimalsData';

interface Props {
  language: VetLanguage;
  selectedAnimalId?: string;
  animals: UniversalAnimalRecord[];
  onBack: () => void;
  onSelectAnimalForConsult?: (animal: UniversalAnimalRecord) => void;
  onSelectAnimalForCall?: (animal: UniversalAnimalRecord) => void;
}

export const VetMitraConsultationHistoryView: React.FC<Props> = ({
  language,
  selectedAnimalId = 'all',
  animals,
  onBack,
  onSelectAnimalForConsult,
  onSelectAnimalForCall,
}) => {
  const isOdia = language === 'or';
  const [summaries, setSummaries] = useState<VetConsultationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAnimalId, setFilterAnimalId] = useState<string>(selectedAnimalId);
  const [filterSpecies, setFilterSpecies] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);

  useEffect(() => {
    loadConsultations();
  }, [filterAnimalId]);

  const loadConsultations = async () => {
    setLoading(true);
    try {
      const data = await vetOfflineStorage.getConsultationSummaries(
        filterAnimalId === 'all' ? undefined : filterAnimalId
      );
      setSummaries(data);
    } catch (e) {
      console.error('Failed to load consultation summaries:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = summaries.filter((item) => {
    if (filterSpecies !== 'all' && item.species !== filterSpecies) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.animalName.toLowerCase().includes(q) ||
      (item.animalNameOdia && item.animalNameOdia.includes(q)) ||
      item.chiefComplaint.toLowerCase().includes(q) ||
      (item.chiefComplaintOdia && item.chiefComplaintOdia.includes(q)) ||
      item.clinicalAdvice.toLowerCase().includes(q) ||
      (item.clinicalAdviceOdia && item.clinicalAdviceOdia.includes(q)) ||
      item.medicinesOrFirstAid.some((m) => m.toLowerCase().includes(q))
    );
  });

  const getAnimalForSummary = (summary: VetConsultationSummary): UniversalAnimalRecord | undefined => {
    if (!summary.animalId) return undefined;
    return animals.find((a) => a.id === summary.animalId);
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-3xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {isOdia ? 'ପୂର୍ବ ପରାମର୍ଶ ଇତିହାସ' : 'Previous Consultations'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <WifiOff className="w-3 h-3 text-emerald-700" />
                <span>{isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ଉପଲବ୍ଧ' : 'Offline Ready'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isOdia
                ? 'ଇଣ୍ଟରନେଟ୍ ବିନା ସମସ୍ତ ପଶୁଙ୍କ ରୋଗ ଲକ୍ଷଣ, ଡାକ୍ତରୀ ପରାମର୍ଶ ଓ ପ୍ରାଥମିକ ଚିକିତ୍ସା ଦେଖନ୍ତୁ'
                : 'Browse past clinical diagnosis, first-aid, and prescription histories offline'}
            </p>
          </div>
        </div>

        <button
          onClick={loadConsultations}
          className="w-9 h-9 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          title="Reload cache"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter & Search Ribbon */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isOdia 
                ? 'ରୋଗ ଲକ୍ଷଣ, ପଶୁଙ୍କ ନାମ କିମ୍ବା ଔଷଧ ଖୋଜନ୍ତୁ (ଯଥା: କ୍ଷୀର, Bloat, ଟିକ)...' 
                : 'Search symptoms, diagnosis, medicines, or animal name...'
            }
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Animal Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase shrink-0 mr-1">
            {isOdia ? 'ପଶୁ ବାଛନ୍ତୁ:' : 'Animal:'}
          </span>
          <button
            onClick={() => setFilterAnimalId('all')}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-colors ${
              filterAnimalId === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isOdia ? 'ସମସ୍ତ ପଶୁ' : 'All Animals'} ({summaries.length})
          </button>
          {animals.map((a) => (
            <button
              key={a.id}
              onClick={() => setFilterAnimalId(a.id)}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                filterAnimalId === a.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <img src={a.photoUrl} alt={a.name} className="w-3.5 h-3.5 rounded-full object-cover" />
              <span>{isOdia ? a.nameOdia : a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Consultations List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">
              {isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ରେକର୍ଡ ଖୋଜାଯାଉଛି...' : 'Loading cached records...'}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                {isOdia ? 'କୌଣସି ପୂର୍ବ ପରାମର୍ଶ ମିଳିଲା ନାହିଁ' : 'No previous consultations found'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {isOdia 
                  ? 'ଏହି ପଶୁ ପାଇଁ ଆପଣ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପ୍ରଶ୍ନ ପଚାରି ନାହାଁନ୍ତି। ନୂତନ ପରାମର୍ଶ ଆରମ୍ଭ କରନ୍ତୁ।'
                  : 'No consultation summaries match your filter. Start a consultation to build clinical records.'}
              </p>
            </div>
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedSummaryId === item.id;
            const targetAnimal = getAnimalForSummary(item);

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md space-y-3"
              >
                {/* Card Top Strip: Animal Name, Date, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {targetAnimal?.photoUrl ? (
                        <img src={targetAnimal.photoUrl} alt={item.animalName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          {item.species === 'cattle' ? '🐄' : item.species === 'goat' ? '🐐' : item.species === 'dog' ? '🐕' : '🐈'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {item.animalName} {item.animalNameOdia ? `(${item.animalNameOdia})` : ''}
                        </h3>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.species}
                        </span>
                        {item.channel === 'voice_call' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <PhoneCall className="w-2.5 h-2.5" />
                            <span>Voice Call</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{item.formattedDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.isEmergency ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        <span>{isOdia ? 'ଜରୁରୀକାଳୀନ (1962)' : 'Emergency'}</span>
                      </span>
                    ) : item.status === 'completed' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isOdia ? 'ସମାପ୍ତ (Completed)' : 'Completed'}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                        <span>{isOdia ? 'ଫଲୋ-ଅପ୍ ଆବଶ୍ୟକ' : 'Follow-up'}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Chief Complaint */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {isOdia ? 'ମୁଖ୍ୟ ସମସ୍ୟା / ଲକ୍ଷଣ (Chief Complaint):' : 'Chief Complaint / Symptoms:'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {isOdia && item.chiefComplaintOdia ? item.chiefComplaintOdia : item.chiefComplaint}
                  </p>
                  {/* Symptoms Tags */}
                  {item.symptoms && item.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.symptoms.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          • {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Clinical Assessment & Diagnosis */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {isOdia ? 'ଡାକ୍ତରୀ ଆକଳନ (Clinical Assessment):' : 'Clinical Assessment:'}
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {isOdia && item.diagnosisOrAssessmentOdia ? item.diagnosisOrAssessmentOdia : item.diagnosisOrAssessment}
                  </p>
                </div>

                {/* Prescribed First Aid & Recommended Medicines */}
                {item.medicinesOrFirstAid && item.medicinesOrFirstAid.length > 0 && (
                  <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isOdia ? 'ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ଦିଆଯାଇଥିବା ଔଷଧ ପରାମର୍ଶ:' : 'First Aid & Medications Advised:'}</span>
                    </span>
                    <div className="space-y-1">
                      {item.medicinesOrFirstAid.map((med, mIdx) => (
                        <div key={mIdx} className="text-xs font-semibold text-emerald-950 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{med}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Plan if present */}
                {item.dietaryPlan && (
                  <div className="text-xs text-slate-600 bg-amber-50/50 border border-amber-100 rounded-xl p-2.5">
                    <span className="font-bold text-amber-900 block mb-0.5">
                      {isOdia ? 'ଖାଦ୍ୟ ଓ ରେସନ୍ ନିର୍ଦ୍ଦେଶ:' : 'Dietary Instruction:'}
                    </span>
                    <span>{item.dietaryPlan}</span>
                  </div>
                )}

                {/* Expandable Dialogue History */}
                {item.history && item.history.length > 0 && (
                  <div className="pt-1">
                    <button
                      onClick={() => setExpandedSummaryId(isExpanded ? null : item.id)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>
                        {isExpanded 
                          ? (isOdia ? 'ପୂର୍ଣ୍ଣ ଆଲୋଚନା ବନ୍ଦ କରନ୍ତୁ' : 'Hide Full Transcript') 
                          : (isOdia ? `ପୂର୍ଣ୍ଣ ଆଲୋଚନା ଦେଖନ୍ତୁ (${item.history.length} ମେସେଜ୍)` : `View Full Transcript (${item.history.length} messages)`)}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in-50 duration-200">
                        {item.history.map((h, hIdx) => (
                          <div
                            key={hIdx}
                            className={`p-2.5 rounded-xl text-xs ${
                              h.sender === 'user'
                                ? 'bg-white border border-slate-200 text-slate-800 ml-4'
                                : 'bg-emerald-50 border border-emerald-100 text-slate-900 mr-4'
                            }`}
                          >
                            <span className="text-[10px] font-bold block mb-1 uppercase tracking-wider text-slate-400">
                              {h.sender === 'user' ? (isOdia ? 'ପଶୁପାଳକ (Farmer)' : 'Farmer') : (isOdia ? 'ଆରୋହୀ ଭେଟମିତ୍ର (Arohi VetMitra)' : 'Arohi VetMitra')}
                            </span>
                            <p className="leading-relaxed whitespace-pre-wrap">{h.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{isOdia ? 'ସ୍ଥାନୀୟ ମେମୋରୀରେ ସଂରକ୍ଷିତ (Offline Cached)' : 'Safely Cached Offline'}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {targetAnimal && onSelectAnimalForConsult && (
                      <button
                        onClick={() => onSelectAnimalForConsult(targetAnimal)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isOdia ? 'ନୂତନ ପରାମର୍ଶ କରନ୍ତୁ' : 'Consult Again'}</span>
                      </button>
                    )}
                    {targetAnimal && onSelectAnimalForCall && (
                      <button
                        onClick={() => onSelectAnimalForCall(targetAnimal)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isOdia ? 'କଲ୍ କରନ୍ତୁ' : 'Voice Call'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
