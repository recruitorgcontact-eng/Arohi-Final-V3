import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, ArrowUpRight, Loader2, ShieldCheck, 
  ExternalLink, Sparkles, ChevronDown, ChevronUp, Clock, AlertTriangle
} from 'lucide-react';
import { ConnectorExecutionRequest } from '../../types/connectors';
import { getStoredActiveConnectors } from '../../data/connectorsData';

interface ConnectorActionCardProps {
  request: ConnectorExecutionRequest;
  onApprove?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
  isDarkMode?: boolean;
}

export default function ConnectorActionCard({
  request: initialRequest,
  onApprove,
  onCancel,
  isDarkMode = true
}: ConnectorActionCardProps) {
  const [request, setRequest] = useState<ConnectorExecutionRequest>(initialRequest);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApprove = async () => {
    setIsExecuting(true);
    setErrorMessage(null);
    setRequest(prev => ({ ...prev, status: 'executing' }));

    try {
      const activeConnectors = getStoredActiveConnectors();
      const matchedConfig = activeConnectors.find(c => c.connectorId === request.connectorId);

      const res = await fetch('/api/connectors/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectorId: request.connectorId,
          actionId: request.actionId,
          parameters: request.parameters,
          config: matchedConfig
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const updated: ConnectorExecutionRequest = {
          ...request,
          status: 'success',
          result: {
            summary: data.result?.summary || `Action executed successfully via ${request.connectorName}.`,
            executionTimeMs: data.executionTimeMs || 45,
            externalId: data.transactionId,
            data: data.result?.data
          }
        };
        setRequest(updated);
        if (onApprove) onApprove(request.id);
      } else {
        const errorText = data.error || 'Execution failed on destination service.';
        setErrorMessage(errorText);
        setRequest(prev => ({
          ...prev,
          status: 'failed',
          result: {
            summary: errorText,
            executionTimeMs: data.executionTimeMs || 0
          }
        }));
      }
    } catch (err: any) {
      const errorText = 'Network unreachable: ' + (err.message || 'Call failed');
      setErrorMessage(errorText);
      setRequest(prev => ({
        ...prev,
        status: 'failed',
        result: {
          summary: errorText,
          executionTimeMs: 0
        }
      }));
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCancel = () => {
    setRequest(prev => ({ ...prev, status: 'cancelled' }));
    if (onCancel) onCancel(request.id);
  };

  return (
    <div 
      className={`my-3 w-full max-w-lg rounded-2xl border transition-all ${
        isDarkMode 
          ? 'bg-[#0b1122]/90 border-slate-800 text-slate-200' 
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      } overflow-hidden`}
    >
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${
        isDarkMode ? 'border-slate-800 bg-[#080d1a]' : 'border-slate-100 bg-slate-50'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-300">Arohi Connect™ Action</span>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {request.connectorName}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>{request.actionName}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Target connector: <span className="text-slate-200 font-medium">{request.connectorName}</span>
          </p>
        </div>

        {/* Payload preview toggle */}
        {request.parameters && Object.keys(request.parameters).length > 0 && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5 text-xs">
            <button
              type="button"
              onClick={() => setShowPayload(!showPayload)}
              className="w-full flex items-center justify-between text-[11px] font-medium text-slate-400 hover:text-slate-200"
            >
              <span>Payload Parameters ({Object.keys(request.parameters).length} fields)</span>
              {showPayload ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showPayload && (
              <pre className="mt-2 p-2 rounded-lg bg-slate-950 text-[10px] text-slate-300 font-mono overflow-x-auto">
                {JSON.stringify(request.parameters, null, 2)}
              </pre>
            )}
          </div>
        )}

        {/* Status display */}
        {request.status === 'success' && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-emerald-200">{request.result?.summary}</p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-emerald-400/80">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {request.result?.executionTimeMs}ms
                </span>
                <span>ID: {request.result?.externalId}</span>
              </div>
            </div>
          </div>
        )}

        {request.status === 'cancelled' && (
          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-slate-500" />
            <span>Action was cancelled by user.</span>
          </div>
        )}

        {request.status === 'failed' && (
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/40 text-xs text-red-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-200">Execution Failed</p>
              <p className="text-[11px] text-red-300/90 mt-0.5 font-mono">{errorMessage || request.result?.summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer approval actions */}
      {request.status === 'pending_approval' && (
        <div className={`px-4 py-3 border-t ${
          isDarkMode ? 'border-slate-800 bg-[#080d1a]' : 'border-slate-100 bg-slate-50'
        } flex items-center justify-between`}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isExecuting}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={handleApprove}
            disabled={isExecuting}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-sm shadow-indigo-900/40 cursor-pointer disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Executing via Connector...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
                <span>Approve & Execute</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
