// Arohi VetMitra - Offline Storage & Sync Diagnostic Manager Modal
// Shows farmers exact offline cache metrics, IndexedDB health, and offline toggle.

import React, { useState } from 'react';
import { 
  X, Wifi, WifiOff, HardDrive, Database, CheckCircle2, 
  RefreshCw, Download, AlertCircle, Trash2, ShieldCheck, 
  FileText, Activity
} from 'lucide-react';
import { vetOfflineStorage } from '../utils/vetOfflineStorage';
import { VetLanguage } from '../types';

interface Props {
  language: VetLanguage;
  isOnline: boolean;
  isSimulatedOffline: boolean;
  onToggleSimulatedOffline: (enabled: boolean) => void;
  onClose: () => void;
  onDataReset?: () => void;
}

export const VetMitraOfflineManagerModal: React.FC<Props> = ({
  language,
  isOnline,
  isSimulatedOffline,
  onToggleSimulatedOffline,
  onClose,
  onDataReset,
}) => {
  const isOdia = language === 'or';
  const metrics = vetOfflineStorage.getCacheMetrics();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportBackup = async () => {
    try {
      const animals = await vetOfflineStorage.getStoredAnimals();
      const consults = await vetOfflineStorage.getConsultationSummaries();
      const payload = {
        app: 'Arohi VetMitra',
        version: '2.0-offline',
        exportedAt: new Date().toISOString(),
        animals,
        consultationSummaries: consults,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `arohi_vetmitra_health_records_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ରେକର୍ଡ ଓ କ୍ୟାଚ୍ ପରିଚାଳକ' : 'Offline Records & Storage'}
              </h3>
              <p className="text-[11px] text-emerald-100 font-medium">
                IndexedDB + LocalStorage Dual Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 space-y-4 text-slate-800">
          {/* Connection Status Card */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
            !isOnline || isSimulatedOffline 
              ? 'bg-amber-50 border-amber-200 text-amber-950' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                !isOnline || isSimulatedOffline ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
              }`}>
                {!isOnline || isSimulatedOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-xs font-bold block">
                  {!isOnline || isSimulatedOffline 
                    ? (isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ମୋଡ୍ ସକ୍ରିୟ (Offline Active)' : 'Offline Mode Active')
                    : (isOdia ? 'ଅନ୍‌ଲାଇନ୍ ସଂଯୋଗ ସକ୍ରିୟ (Online)' : 'Online Connected')}
                </span>
                <span className="text-[11px] opacity-80 block">
                  {!isOnline || isSimulatedOffline
                    ? (isOdia ? 'ସମସ୍ତ ସଂରକ୍ଷିତ ପଶୁ ରେକର୍ଡ ଓ ପରାମର୍ଶ ଉପଲବ୍ଧ' : 'Local IndexedDB cache serving all records')
                    : (isOdia ? 'ସର୍ଭର ସହିତ ସିଙ୍କ୍ ହୋଇଛି' : 'Full AI and Live Voice features available')}
                </span>
              </div>
            </div>

            {/* Offline Simulation Switcher */}
            <button
              onClick={() => onToggleSimulatedOffline(!isSimulatedOffline)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-colors ${
                isSimulatedOffline 
                  ? 'bg-amber-600 text-white border-amber-600' 
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isSimulatedOffline ? 'Simulating' : 'Simulate Offline'}
            </button>
          </div>

          {/* Cache Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium block">
                {isOdia ? 'ସଂରକ୍ଷିତ ପଶୁ ରେକର୍ଡ' : 'Stored Animals'}
              </span>
              <span className="text-2xl font-black text-slate-900 block mt-0.5">
                {metrics.animalsCount}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                ✓ Available Offline
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium block">
                {isOdia ? 'ପୂର୍ବ ପରାମର୍ଶ ସାରାଂଶ' : 'Past Consultations'}
              </span>
              <span className="text-2xl font-black text-slate-900 block mt-0.5">
                {metrics.consultationsCount}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                ✓ Full Transcripts Cached
              </span>
            </div>
          </div>

          {/* Database Specifications */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isOdia ? 'ଷ୍ଟୋରେଜ୍ ଇଞ୍ଜିନ୍:' : 'Storage Engine:'}</span>
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>IndexedDB (Active) + LocalStorage</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isOdia ? 'ଶେଷ ସିଙ୍କ୍ ସମୟ:' : 'Last Synced:'}</span>
              <span className="font-bold text-slate-800">{metrics.lastSyncFormatted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isOdia ? 'ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ୍:' : 'Emergency Helpline:'}</span>
              <span className="font-bold text-rose-600">1962 (Toll Free 24x7)</span>
            </div>
          </div>

          {/* Export & Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleExportBackup}
              className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadSuccess
                  ? (isOdia ? 'ଡାଉନଲୋଡ୍ ସଫଳ ହେଲା! ✓' : 'Backup Downloaded! ✓')
                  : (isOdia ? 'ପଶୁ ରେକର୍ଡ ଓ ପରାମର୍ଶ ବ୍ୟାକଅପ୍ କରନ୍ତୁ' : 'Export Offline Records Backup (JSON)')}
              </span>
            </button>

            {onDataReset && (
              <button
                onClick={() => {
                  if (confirm(isOdia ? 'ଆପଣ କ୍ୟାଚ୍ ରିସେଟ୍ କରିବାକୁ ଚାହୁଁଛନ୍ତି କି?' : 'Reset local offline database to defaults?')) {
                    localStorage.removeItem('arohi_vetmitra_cached_animals_v2');
                    localStorage.removeItem('arohi_vetmitra_cached_consultations_v2');
                    localStorage.removeItem('arohi_vetmitra_cached_chats_v2');
                    onDataReset();
                    onClose();
                  }
                }}
                className="w-full py-2 px-3 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isOdia ? 'କ୍ୟାଚ୍ ରିସେଟ୍ କରନ୍ତୁ (Reset to Default)' : 'Reset Cache to Defaults'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
