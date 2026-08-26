import React, { useState } from 'react';
import {
  FileText,
  Plus,
  ShieldCheck,
  Download,
  Lock,
  Search,
  CheckCircle2,
  FileCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { DocumentVaultItem } from './types';

export default function DocumentsVaultView() {
  const { documents, addDocument, showToast } = useBusinessOS();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadDoc = () => {
    const title = prompt('Document Title:');
    if (!title) return;
    addDocument({
      title,
      category: 'Legal & Agreements',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      isSigned: false,
      signedBy: 'Pending Signature'
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Digital Document Vault & Enterprise Contracts
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Securely store GST filings, NDAs, MSA contracts, and employee agreements with cryptographic e-signatures
            </p>
          </div>
        </div>

        <button
          onClick={handleUploadDoc}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] hover:border-purple-400 dark:hover:border-purple-600 rounded-2xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {doc.fileType}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border flex items-center gap-1 ${
                  doc.isSigned
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                }`}>
                  {doc.isSigned ? <FileCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span>{doc.isSigned ? 'E-Signed' : 'Draft'}</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-xs line-clamp-1">{doc.title}</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{doc.category}</p>
              </div>

              <div className="text-[10px] text-zinc-400 space-y-0.5">
                <div>Uploaded: {doc.uploadedAt}</div>
                <div>Size: {doc.fileSize}</div>
                {doc.signedBy && <div className="text-zinc-600 dark:text-zinc-300">Signer: {doc.signedBy}</div>}
              </div>
            </div>

            <div className="pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span>AES-256</span>
              </span>
              <button
                onClick={() => showToast(`Securely downloading ${doc.title}...`)}
                className="text-purple-600 dark:text-purple-400 hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
