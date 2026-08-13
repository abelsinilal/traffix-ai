import React from 'react';
import { Incident } from '../../types';
import { AlertTriangle, X, MapPin, Clock, Ambulance, Shield, Navigation, CheckCircle2 } from 'lucide-react';

interface IncidentModalProps {
  incident: Incident | null;
  onClose: () => void;
  onDispatchEV?: (incident: Incident) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  incident,
  onClose,
  onDispatchEV
}) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-sans">
                Incident File: {incident.id}
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">{incident.type}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px] font-mono">SEVERITY LEVEL</span>
              <span className={`font-bold text-xs uppercase font-mono ${
                incident.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {incident.severity}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px] font-mono">PREDICTED RISK SCORE</span>
              <span className="font-bold text-xs text-amber-400 font-mono">{incident.riskScore}%</span>
            </div>
          </div>

          {/* Location & Time */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{incident.locationName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono pl-5">
              <Clock className="w-3.5 h-3.5" />
              <span>Logged: {incident.timestamp}</span>
            </div>
          </div>

          {/* Incident Description */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Situation Summary</span>
            <p className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 leading-relaxed text-xs">
              {incident.description}
            </p>
          </div>

          {/* Affected Roads */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Affected Roads</span>
            <div className="flex flex-wrap gap-1.5">
              {incident.affectedRoads.map((rd, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
                  🛣 {rd}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby Emergency Vehicles */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Nearby Fleet Telematics</span>
            <div className="flex flex-wrap gap-1.5">
              {incident.nearbyVehicles.map((v, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px]">
                  🚑 {v}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-4 h-4" /> Recommended Command Action
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {incident.recommendedAction}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            Close
          </button>
          {onDispatchEV && (
            <button
              onClick={() => {
                onDispatchEV(incident);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-950 flex items-center gap-1.5"
            >
              <Navigation className="w-4 h-4" />
              <span>Reroute & Dispatch Unit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
