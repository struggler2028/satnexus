import React from 'react';
import { History } from 'lucide-react';
import { SimulationEvent } from '../types';

interface EventTimelineProps {
  events: SimulationEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'NODE_FAILURE':
      case 'LINK_FAILURE':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            FAILURE
          </span>
        );
      case 'NODE_RECOVERED':
      case 'LINK_RECOVERED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            RECOVERED
          </span>
        );
      case 'ROUTE_COMPUTED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            ROUTING
          </span>
        );
      case 'ROUTE_DISCONNECTED':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            PARTITION
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
            SYSTEM
          </span>
        );
    }
  };

  return (
    <div className="bg-space-800/90 border border-space-700 rounded-xl p-4 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-space-700">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Event Audit History
          </h2>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          Last {events.length} events
        </span>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {events.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No simulation events logged yet.
          </div>
        ) : (
          events.map((evt) => (
            <div
              key={evt.id}
              className="p-2 rounded-lg bg-space-900/80 border border-space-700/60 text-xs flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getEventBadge(evt.event_type)}
                  <span className="font-semibold text-slate-200">{evt.target}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{evt.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-400">{evt.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
