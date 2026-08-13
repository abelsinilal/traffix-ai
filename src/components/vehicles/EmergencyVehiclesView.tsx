import React from 'react';
import { EmergencyVehicle } from '../../types';
import { Ambulance, Flame, Shield, MapPin, Navigation, Phone, User, CheckCircle2 } from 'lucide-react';

interface EmergencyVehiclesViewProps {
  vehicles: EmergencyVehicle[];
  onSelectVehicle: (veh: EmergencyVehicle) => void;
  onNavigateToRouting?: () => void;
}

export const EmergencyVehiclesView: React.FC<EmergencyVehiclesViewProps> = ({
  vehicles,
  onSelectVehicle,
  onNavigateToRouting
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Ambulance className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              Emergency Vehicle Telematics Fleet
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 font-bold uppercase">
            {vehicles.length} Units Online
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Live GPS positioning, unit status monitoring, active route dispatch tracking, and driver communication links for emergency fleet operations.
        </p>
      </div>

      {/* Vehicle Fleet Cards Grid required in Prompt Section 10 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((veh) => {
          let Icon = Ambulance;
          let badgeColor = 'bg-cyan-950 text-cyan-300 border-cyan-800';

          if (veh.type === 'Fire Truck') {
            Icon = Flame;
            badgeColor = 'bg-rose-950 text-rose-300 border-rose-800';
          } else if (veh.type === 'Police Vehicle') {
            Icon = Shield;
            badgeColor = 'bg-blue-950 text-blue-300 border-blue-800';
          }

          return (
            <div
              key={veh.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 shadow-xl transition space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-base ${badgeColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm font-sans">{veh.callSign}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">{veh.type} • {veh.unitCode}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  veh.status === 'En Route'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                    : veh.status === 'On Scene'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {veh.status}
                </span>
              </div>

              {/* Location & Destination info */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">Current: <strong className="text-white">{veh.currentLocationName}</strong></span>
                </div>

                {veh.destinationName && veh.destinationName !== '—' && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Navigation className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate">Dest: <strong className="text-white">{veh.destinationName}</strong></span>
                  </div>
                )}

                {veh.etaMinutes !== undefined && veh.etaMinutes > 0 && (
                  <div className="text-[11px] font-mono text-cyan-400 font-bold pt-1 border-t border-slate-800">
                    ⏱ Projected ETA: {veh.etaMinutes} minutes
                  </div>
                )}
              </div>

              {/* Driver details */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{veh.driverName}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{veh.contactNumber}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectVehicle(veh)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Focus on Map</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
