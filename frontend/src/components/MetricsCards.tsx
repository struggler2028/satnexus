import React from 'react';
import { Radio, Zap, Network, Share2, Clock, Activity } from 'lucide-react';
import { ResilienceMetrics, RouteResponse } from '../types';

interface MetricsCardsProps {
  metrics: ResilienceMetrics | null;
  activeRoute: RouteResponse | null;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, activeRoute }) => {
  if (!metrics) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-space-800 rounded-xl animate-pulse border border-space-700" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Node Availability */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">Satellites Online</span>
          <Radio className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white">
            {metrics.active_satellites}/{metrics.total_satellites}
          </span>
          <span className={`text-xs font-semibold ${metrics.node_availability_pct >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
            ({metrics.node_availability_pct}%)
          </span>
        </div>
        <div className="w-full bg-space-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.node_availability_pct}%` }}
          />
        </div>
      </div>

      {/* Link Availability */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">Crosslinks Active</span>
          <Zap className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white">
            {metrics.active_links}/{metrics.total_links}
          </span>
          <span className={`text-xs font-semibold ${metrics.link_availability_pct >= 90 ? 'text-cyan-400' : 'text-amber-400'}`}>
            ({metrics.link_availability_pct}%)
          </span>
        </div>
        <div className="w-full bg-space-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-cyan-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.link_availability_pct}%` }}
          />
        </div>
      </div>

      {/* LCC Ratio */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">LCC Cohesion</span>
          <Network className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white">
            {metrics.lcc_ratio_pct}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Ratio
          </span>
        </div>
        <div className="w-full bg-space-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.lcc_ratio_pct}%` }}
          />
        </div>
      </div>

      {/* Reachability Ratio */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">Reachability</span>
          <Share2 className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white">
            {metrics.reachability_ratio_pct}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Pairs
          </span>
        </div>
        <div className="w-full bg-space-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.reachability_ratio_pct}%` }}
          />
        </div>
      </div>

      {/* Current Route Latency */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">Route Latency</span>
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          {activeRoute && activeRoute.is_reachable && activeRoute.total_latency_ms !== null ? (
            <>
              <span className="text-xl font-bold text-white font-mono">
                {activeRoute.total_latency_ms}
              </span>
              <span className="text-xs text-indigo-300 font-mono">ms</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-rose-400">Disconnected</span>
          )}
        </div>
        <p className="text-[10px] text-slate-400 mt-1 truncate">
          {activeRoute?.status === 'RECOVERED' ? (
            <span className="text-purple-400 font-medium">● Recovered Route</span>
          ) : activeRoute?.status === 'OPTIMAL' ? (
            <span className="text-blue-400 font-medium">● Primary Shortest Path</span>
          ) : (
            <span>No Active Path</span>
          )}
        </p>
      </div>

      {/* Algorithmic Recovery / Calculation Time */}
      <div className="bg-space-800/80 border border-space-700/80 rounded-xl p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium">Computation</span>
          <Clock className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white font-mono">
            {activeRoute ? activeRoute.computation_time_ms : '0.00'}
          </span>
          <span className="text-xs text-emerald-300 font-mono">ms</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          Dijkstra execution time
        </p>
      </div>
    </div>
  );
};
