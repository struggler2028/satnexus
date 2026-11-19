import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface DisconnectionAlertProps {
  message?: string;
  onReset: () => void;
}

export const DisconnectionAlert: React.FC<DisconnectionAlertProps> = ({ message, onReset }) => {
  return (
    <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2.5">
        <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
        <div>
          <span className="font-bold block text-rose-200">
            NETWORK PARTITION DETECTED — DESTINATION UNREACHABLE
          </span>
          <span className="text-[11px] text-rose-300/80">
            {message || 'No surviving active route connects the selected source and destination satellites.'}
          </span>
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-600 hover:bg-rose-500 text-white shrink-0 transition-colors flex items-center gap-1.5"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Restore Constellation
      </button>
    </div>
  );
};
