import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import { BusinessOSModule } from './types';

interface BusinessErrorBoundaryProps {
  children: React.ReactNode;
  moduleName?: BusinessOSModule | string;
  onResetModule?: () => void;
  onNavigateHome?: () => void;
}

interface BusinessErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class BusinessErrorBoundary extends React.Component<
  BusinessErrorBoundaryProps,
  BusinessErrorBoundaryState
> {
  constructor(props: BusinessErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): BusinessErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[Arohi Business OS Error in module "${this.props.moduleName}"]:`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onResetModule) {
      this.props.onResetModule();
    }
  };

  render() {
    if (this.state.hasError) {
      const formattedTitle = (this.props.moduleName || 'Module')
        .toString()
        .replace(/_/g, ' ')
        .toUpperCase();

      return (
        <div className="min-h-[500px] flex items-center justify-center p-6 sm:p-10 w-full animate-in fade-in duration-300">
          <div className="w-full max-w-xl p-8 rounded-3xl bg-white dark:bg-[#121124] border border-amber-300/60 dark:border-amber-500/30 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                Self-Healing Subsystem Active
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {formattedTitle} Encountered a Schema Mismatch
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                Arohi AI protected your application session from crashing. The module data has been automatically isolated and can be restored seamlessly.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left font-mono text-[11px] text-slate-700 dark:text-slate-300 overflow-x-auto max-h-24">
                <span className="text-amber-500 font-bold">Diagnostic: </span>
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recover & Reload Module</span>
              </button>

              {this.props.onNavigateHome && (
                <button
                  onClick={this.props.onNavigateHome}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 dark:bg-purple-950/40 hover:bg-slate-200 dark:hover:bg-purple-900/50 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-300 dark:border-purple-800/40 active:scale-95 transition-all cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Overview</span>
                </button>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
