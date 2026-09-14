import React, { useState } from 'react';
import { 
  X, Globe, Key, Lock, CheckCircle2, ArrowRight, Loader2, RefreshCw, 
  Code2, Plus, Trash2, Sparkles, FileJson
} from 'lucide-react';
import { ActiveConnectorConfig, ConnectorDefinition } from '../../types/connectors';
import { saveActiveConnector } from '../../data/connectorsData';

interface CustomApiBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (connector: ConnectorDefinition, config: ActiveConnectorConfig) => void;
  isDarkMode?: boolean;
}

export default function CustomApiBuilderModal({
  isOpen,
  onClose,
  onCreated,
  isDarkMode = true
}: CustomApiBuilderModalProps) {
  const [serviceName, setServiceName] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [description, setDescription] = useState('');
  const [authType, setAuthType] = useState<'bearer' | 'api_key' | 'basic' | 'none'>('bearer');
  const [headerName, setHeaderName] = useState('Authorization');
  const [tokenValue, setTokenValue] = useState('');
  const [sampleEndpoint, setSampleEndpoint] = useState('/health');
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{ success: boolean; latency: number; msg: string } | null>(null);

  if (!isOpen) return null;

  const handleTestPing = async () => {
    if (!baseUrl.trim()) {
      setTestStatus({ success: false, latency: 0, msg: 'Please provide a valid Base URL first.' });
      return;
    }
    setIsTesting(true);
    setTestStatus(null);

    const fullUrl = `${baseUrl.replace(/\/$/, '')}${sampleEndpoint ? (sampleEndpoint.startsWith('/') ? sampleEndpoint : `/${sampleEndpoint}`) : ''}`;

    try {
      const res = await fetch('/api/connectors/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectorId: serviceName || 'custom_api',
          protocol: 'custom_api',
          endpointUrl: fullUrl,
          apiKey: tokenValue ? tokenValue.trim() : undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus({
          success: true,
          latency: data.latencyMs || 28,
          msg: data.message || `Endpoint verified (${data.latencyMs}ms). Ready for AI tool calls.`
        });
      } else {
        setTestStatus({
          success: false,
          latency: data.latencyMs || 0,
          msg: data.error || data.message || 'Endpoint ping failed. Verify that your server is reachable and accepts HTTP traffic.'
        });
      }
    } catch (err: any) {
      setTestStatus({
        success: false,
        latency: 0,
        msg: 'Network error reaching endpoint: ' + (err.message || 'Connection failed')
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !baseUrl) return;

    const customId = `custom_${serviceName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
    
    const newDefinition: ConnectorDefinition = {
      id: customId,
      name: serviceName,
      tagline: `Custom REST integration via ${baseUrl}`,
      description: description || `Custom enterprise API for ${serviceName}`,
      category: 'custom',
      supportedProtocols: ['custom_api'],
      defaultProtocol: 'custom_api',
      logoText: '🌐',
      accentColor: 'text-cyan-400',
      bgTint: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      badge: 'Custom REST',
      isEnterprise: true,
      actions: [
        {
          id: 'query_custom_api',
          name: `Call ${serviceName}`,
          description: `Query or send commands to ${serviceName} endpoints`,
          type: 'action',
          samplePrompt: `Fetch data from my custom API ${serviceName} at ${baseUrl}${sampleEndpoint || ''}.`
        }
      ],
      mockLatencyMs: testStatus?.latency || 45
    };

    const newConfig: ActiveConnectorConfig = {
      connectorId: customId,
      name: serviceName,
      protocol: 'custom_api',
      connectedAt: new Date().toISOString(),
      status: 'active',
      authData: {
        endpointUrl: baseUrl,
        apiKeySecret: tokenValue ? tokenValue.trim() : undefined,
        headers: tokenValue ? { [headerName]: authType === 'bearer' ? `Bearer ${tokenValue}` : tokenValue } : undefined
      },
      lastTestedAt: new Date().toISOString(),
      pingLatencyMs: testStatus?.latency || 45
    };

    saveActiveConnector(newConfig);
    onCreated(newDefinition, newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-lg ${
          isDarkMode ? 'bg-[#0b101f] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        } border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b ${isDarkMode ? 'border-slate-800 bg-[#090d1a]' : 'border-slate-100 bg-slate-50'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">🌐</span>
            <div>
              <h3 className="font-bold text-base tracking-tight">Connect Any Custom API</h3>
              <p className="text-xs text-slate-400 leading-snug">Connect private ERPs, internal databases, or microservices to Arohi AI.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-sm flex-1">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Service / App Name *</label>
            <input
              type="text"
              required
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g. Hospital Patient ERP, Local Inventory System"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Base API URL *</label>
            <input
              type="url"
              required
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.yourdomain.com/v1"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Authentication Type</label>
              <select
                value={authType}
                onChange={(e: any) => {
                  setAuthType(e.target.value);
                  if (e.target.value === 'bearer') setHeaderName('Authorization');
                  else if (e.target.value === 'api_key') setHeaderName('x-api-key');
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200"
              >
                <option value="bearer">Bearer Token</option>
                <option value="api_key">API Key Header</option>
                <option value="basic">Basic Auth</option>
                <option value="none">No Auth (Public)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Header Name</label>
              <input
                type="text"
                value={headerName}
                onChange={(e) => setHeaderName(e.target.value)}
                disabled={authType === 'none'}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 font-mono disabled:opacity-50"
              />
            </div>
          </div>

          {authType !== 'none' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Token or Secret Key</label>
              <input
                type="password"
                value={tokenValue}
                onChange={(e) => setTokenValue(e.target.value)}
                placeholder="eyJh... or secret key"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 font-mono"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Test Ping Endpoint</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sampleEndpoint}
                onChange={(e) => setSampleEndpoint(e.target.value)}
                placeholder="/health or /ping or /users"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 font-mono"
              />
              <button
                type="button"
                onClick={handleTestPing}
                disabled={isTesting}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Test Ping</span>
              </button>
            </div>
          </div>

          {testStatus && (
            <div className={`p-2.5 rounded-xl text-xs border ${
              testStatus.success 
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-800/50 text-rose-300'
            }`}>
              {testStatus.msg}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md shadow-cyan-950/30 cursor-pointer"
            >
              <span>Register Connector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
