import React from 'react';
import { RotateCcw, Satellite, ShieldAlert } from 'lucide-react';
import { ResilienceMetrics } from '../types';

interface NavbarProps {
  metrics: ResilienceMetrics | null;
  onReset: () => void;
  onOpenAnalysis: () => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  metrics,
  onReset,
  onOpenAnalysis,
  isLoading,
}) => {
  const getStatusBadge = () => {
    if (!metrics) return null;
    if (metrics.network_status === 'OPTIMAL') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          OPTIMAL CONSTELLATION
        </span>
      );
    } else if (metrics.network_status === 'DEGRADED') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          NETWORK DEGRADED
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
          CRITICAL PARTITION
        </span>
      );
    }
  };

  return (
    <header className="border-b border-space-700 bg-space-800/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Satellite className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                SatNexus
                <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                  v1.0.0
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Graph-Based Satellite Communication Resilience & Failure Recovery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {getStatusBadge()}

          <button
            onClick={onOpenAnalysis}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-space-700 hover:bg-space-600 text-slate-200 border border-space-500 transition-colors"
            title="Detect articulation points and bridges"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Vulnerability Analysis
          </button>

          <button
            onClick={onReset}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all shadow-sm shadow-blue-500/20"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Reset Constellation
          </button>
        </div>
      </div>
    </header>
  );
};
