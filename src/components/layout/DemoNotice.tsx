import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export const DemoNotice: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200/90 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 max-w-5xl mx-auto">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-[11px] leading-tight font-sans">
          <strong className="font-semibold text-amber-300">Demo Mode Notice:</strong> Data displayed in this Smart India Hackathon 2026 prototype is simulated. Real deployment integrates verified government traffic feeds, weather radar APIs, emergency fleet telematics, and production ML models.
        </p>
      </div>
    </div>
  );
};
