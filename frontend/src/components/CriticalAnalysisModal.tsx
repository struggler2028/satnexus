import React from 'react';
import { X, ShieldAlert, AlertTriangle, GitFork } from 'lucide-react';
import { CriticalComponents, TopologyResponse } from '../types';

interface CriticalAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  criticalData: CriticalComponents | null;
  topology: TopologyResponse | null;
}

export const CriticalAnalysisModal: React.FC<CriticalAnalysisModalProps> = ({
  isOpen,
  onClose,
  criticalData,
  topology,
}) => {
  if (!isOpen || !criticalData) return null;

  const getNodeName = (id: number) => {
    return topology?.nodes.find((n) => n.id === id)?.name || `SAT-${id}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-space-800 border border-space-600 rounded-2xl w-full max-w-lg p-5 shadow-2xl text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-space-700">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Single Points of Failure Analysis
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-space-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-300 leading-relaxed">
          {criticalData.analysis}
        </p>

        {/* Cut Vertices */}
        <div className="bg-space-900/90 rounded-xl p-3 border border-space-700/80">
          <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Articulation Points (Cut Vertices): {criticalData.articulation_points.length}</span>
          </div>
          {criticalData.articulation_points.length === 0 ? (
            <p className="text-emerald-400">No articulation points detected. Node redundancy is optimal.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {criticalData.articulation_points.map((id) => (
                <span
                  key={`ap-${id}`}
                  className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[11px]"
                >
                  {getNodeName(id)} (ID: {id})
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bridges */}
        <div className="bg-space-900/90 rounded-xl p-3 border border-space-700/80">
          <div className="flex items-center gap-1.5 font-semibold text-rose-400 mb-2">
            <GitFork className="w-4 h-4" />
            <span>Critical Bridge Links: {criticalData.bridges.length}</span>
          </div>
          {criticalData.bridges.length === 0 ? (
            <p className="text-emerald-400">No bridge crosslinks detected. Link mesh redundancy is optimal.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {criticalData.bridges.map(([u, v], i) => (
                <span
                  key={`br-${i}`}
                  className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[11px]"
                >
                  {getNodeName(u)} ↔ {getNodeName(v)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-space-700 hover:bg-space-600 text-slate-200 font-semibold"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
