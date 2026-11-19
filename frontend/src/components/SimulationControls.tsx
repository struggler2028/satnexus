import React, { useState } from 'react';
import { Play, Flame, AlertTriangle, ArrowRight } from 'lucide-react';
import { TopologyResponse, RouteResponse, ScenarioItem } from '../types';

interface SimulationControlsProps {
  topology: TopologyResponse | null;
  activeRoute: RouteResponse | null;
  scenarios: ScenarioItem[];
  selectedSource: number;
  selectedTarget: number;
  onSelectSource: (id: number) => void;
  onSelectTarget: (id: number) => void;
  onCalculateRoute: () => void;
  onToggleNodeFailure: (nodeId: number, isCurrentlyFailed: boolean) => void;
  onSimulateRandomFailure: () => void;
  onSelectScenario: (scenarioId: string) => void;
  isLoading: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  topology,
  activeRoute,
  scenarios,
  selectedSource,
  selectedTarget,
  onCalculateRoute,
  onSelectSource,
  onSelectTarget,
  onToggleNodeFailure,
  onSimulateRandomFailure,
  onSelectScenario,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'routing' | 'failure' | 'scenarios'>('routing');

  if (!topology) return null;

  return (
    <div className="bg-space-800/90 border border-space-700 rounded-xl p-4 shadow-xl backdrop-blur">
      {/* Tab Switcher */}
      <div className="flex border-b border-space-700 mb-4">
        <button
          onClick={() => setActiveTab('routing')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'routing'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Routing Engine
        </button>
        <button
          onClick={() => setActiveTab('failure')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'failure'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Failure Simulator
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'scenarios'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Constellation Presets
        </button>
      </div>

      {/* Tab 1: Routing Engine */}
      {activeTab === 'routing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Source Satellite (S)
              </label>
              <select
                value={selectedSource}
                onChange={(e) => onSelectSource(Number(e.target.value))}
                className="w-full bg-space-900 border border-space-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              >
                {topology.nodes.map((n) => (
                  <option key={`src-${n.id}`} value={n.id}>
                    {n.name} (ID: {n.id}) {n.status === 'FAILED' ? '[FAILED]' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Destination Satellite (D)
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => onSelectTarget(Number(e.target.value))}
                className="w-full bg-space-900 border border-space-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              >
                {topology.nodes.map((n) => (
                  <option key={`dst-${n.id}`} value={n.id}>
                    {n.name} (ID: {n.id}) {n.status === 'FAILED' ? '[FAILED]' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={onCalculateRoute}
            disabled={isLoading || selectedSource === selectedTarget}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            Compute Dijkstra Shortest Path
          </button>

          {/* Active Route Details Card */}
          {activeRoute && (
            <div className="bg-space-900/90 border border-space-700 rounded-lg p-3 text-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-space-700/60">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  Route Status:
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                      activeRoute.status === 'OPTIMAL'
                        ? 'bg-blue-500/20 text-blue-400'
                        : activeRoute.status === 'RECOVERED'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {activeRoute.status}
                  </span>
                </span>
                {activeRoute.is_reachable && (
                  <span className="text-slate-400">
                    Hops: <strong className="text-white">{activeRoute.hop_count}</strong>
                  </span>
                )}
              </div>

              {activeRoute.is_reachable ? (
                <>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2 font-mono text-[11px]">
                    {activeRoute.path_names.map((name, i) => (
                      <React.Fragment key={i}>
                        <span className="px-2 py-0.5 rounded bg-space-800 text-slate-200 border border-space-600">
                          {name}
                        </span>
                        {i < activeRoute.path_names.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-slate-400 pt-1 text-[11px]">
                    <span>Total Latency: <strong className="text-white font-mono">{activeRoute.total_latency_ms} ms</strong></span>
                    <span>Computed in: <strong className="text-emerald-400 font-mono">{activeRoute.computation_time_ms} ms</strong></span>
                  </div>
                </>
              ) : (
                <div className="text-rose-400 text-xs py-1 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{activeRoute.message || 'No communication path available.'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Failure Simulator */}
      {activeTab === 'failure' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Inject component failures into orbit:</span>
            <button
              onClick={onSimulateRandomFailure}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Random Debris Strike
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
            {topology.nodes.map((node) => {
              const isFailed = node.status === 'FAILED';
              return (
                <div
                  key={`fail-${node.id}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-space-900 border border-space-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isFailed ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-medium text-slate-200">{node.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{node.orbit_plane}</span>
                  </div>

                  <button
                    onClick={() => onToggleNodeFailure(node.id, isFailed)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                      isFailed
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    {isFailed ? 'Recover Node' : 'Simulate Failure'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Predefined Constellation Presets */}
      {activeTab === 'scenarios' && (
        <div className="space-y-3">
          <span className="text-xs text-slate-400">
            Select a verified constellation topology preset:
          </span>
          <div className="space-y-2">
            {scenarios.map((scen) => (
              <div
                key={scen.id}
                onClick={() => onSelectScenario(scen.id)}
                className="cursor-pointer p-3 rounded-lg bg-space-900 hover:bg-space-700/60 border border-space-700 transition-all text-xs"
              >
                <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                  <span>{scen.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-space-800 text-purple-300 border border-purple-500/30">
                    {scen.node_count} nodes / {scen.link_count} links
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{scen.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
