import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Ambulance,
  Clock,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Navigation,
  Activity,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import { Incident, EmergencyVehicle, RouteOption, SystemAlert, TrafficSegment } from '../../types';
import { InteractiveMap } from '../map/InteractiveMap';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  incidents: Incident[];
  vehicles: EmergencyVehicle[];
  trafficSegments: TrafficSegment[];
  alerts: SystemAlert[];
  activeRoute: RouteOption[];
  onNavigate: (tab: any) => void;
  onSelectIncident: (inc: Incident) => void;
  onSelectVehicle: (veh: EmergencyVehicle) => void;
  isIncidentSimulated: boolean;
  onSimulateIncident: () => void;
}

const HOURLY_RISK_DATA = [
  { hour: '06:00', riskScore: 32 },
  { hour: '07:00', riskScore: 54 },
  { hour: '08:00', riskScore: 78 },
  { hour: '09:00', riskScore: 88 },
  { hour: '10:00', riskScore: 82 },
  { hour: '11:00', riskScore: 64 },
  { hour: '12:00', riskScore: 58 },
  { hour: '13:00', riskScore: 61 },
  { hour: '14:00', riskScore: 70 },
  { hour: '15:00', riskScore: 76 },
  { hour: '16:00', riskScore: 84 },
  { hour: '17:00', riskScore: 91 },
  { hour: '18:00', riskScore: 85 }
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  incidents,
  vehicles,
  trafficSegments,
  alerts,
  activeRoute,
  onNavigate,
  onSelectIncident,
  onSelectVehicle,
  isIncidentSimulated,
  onSimulateIncident
}) => {
  const activeIncidentsCount = incidents.filter(i => i.status === 'Active').length;
  const highRiskZonesCount = trafficSegments.filter(t => t.incidentRiskPercent >= 70).length + 6;
  const activeVehiclesCount = vehicles.filter(v => v.status === 'En Route' || v.status === 'On Scene').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Welcome Card */}
      <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-600/10 text-blue-400 border border-blue-500/30 font-bold uppercase tracking-wider">
              SIH 2026 Innovation
            </span>
            <span className="text-xs text-slate-400 font-mono">Central Urban Corridor Hub</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans">
            AI Traffic Prediction & Emergency Routing System
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Real-time proactive risk assessment, preemptive traffic hazard detection, and multi-factor emergency corridor optimization for ambulances, fire tenders, and police units.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('prediction')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-900/30"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Risk Prediction</span>
          </button>

          <button
            onClick={() => onNavigate('routing')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Navigation className="w-4 h-4 text-blue-400" />
            <span>Emergency Dispatch</span>
          </button>
        </div>
      </div>

      {/* 4 Main Bento Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Incidents */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Active Incidents</span>
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white">{activeIncidentsCount}</span>
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase font-mono">
                Active
              </span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: High-Risk Zones */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">High-Risk Zones</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white">{highRiskZonesCount}</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase font-mono">
                Risk &gt; 70%
              </span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Emergency Vehicles Active */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Emergency Vehicles</span>
            <Ambulance className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white">{activeVehiclesCount}</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase font-mono">
                En Route
              </span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: '50%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Average Response Time */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Response Time</span>
            <Clock className="w-4 h-4 text-green-500" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-white">8m 42s</span>
              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-bold uppercase font-mono">
                ↓ 18%
              </span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & Live Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Interactive Map (2 columns) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-sans">
                Live Traffic & Incident Intelligence
              </h3>
            </div>
            <button
              onClick={onSimulateIncident}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1.5 border ${
                isIncidentSimulated
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isIncidentSimulated ? 'Reset Reroute' : 'Simulate Route Incident'}</span>
            </button>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <InteractiveMap
              incidents={incidents}
              vehicles={vehicles}
              routes={activeRoute}
              selectedRouteId={activeRoute[0]?.id}
              onSelectIncident={onSelectIncident}
              onSelectVehicle={onSelectVehicle}
              isIncidentSimulated={isIncidentSimulated}
              className="h-[460px] w-full rounded-xl"
            />
          </div>
        </div>

        {/* Right Sidebar: System Alerts & Prediction Overview Chart */}
        <div className="space-y-6 flex flex-col">
          {/* System Alerts Panel */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                System Alerts
              </span>
              <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase">
                LIVE FEED
              </span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar flex-1">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  className={`p-3 rounded-lg border text-xs space-y-1 transition ${
                    alt.severity === 'Critical'
                      ? 'bg-red-500/10 border-red-500/20 text-red-200'
                      : alt.severity === 'High'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                      : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs font-sans">{alt.title}</span>
                    <span className="text-[9px] font-mono opacity-80">{alt.timeAgo}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">{alt.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Overview Mini Chart */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-sans">
                <TrendingUp className="w-4 h-4 text-blue-400" /> Hourly Risk Trend
              </span>
              <span className="text-[9px] font-mono text-slate-400">Peak 17:00 (91%)</span>
            </div>

            <div className="h-32 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HOURLY_RISK_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={9} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any) => [`${val}% Risk`, 'Predicted Risk Score']}
                  />
                  <Area type="monotone" dataKey="riskScore" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#riskGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Status Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Emergency Vehicles */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-sans">
              <Ambulance className="w-4 h-4 text-blue-400" /> Active Emergency Fleet
            </h4>
            <button
              onClick={() => onNavigate('vehicles')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View All ({vehicles.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 overflow-x-auto">
            {vehicles.slice(0, 3).map((veh) => (
              <div
                key={veh.id}
                onClick={() => onSelectVehicle(veh)}
                className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">
                    {veh.callSign}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{veh.type}</div>
                    <div className="text-[11px] text-slate-400">📍 {veh.currentLocationName}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    veh.status === 'En Route' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {veh.status}
                  </span>
                  {veh.destinationName && (
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      ETA: {veh.etaMinutes}m
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk Traffic Corridors */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-sans">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Critical Traffic Corridors
            </h4>
            <button
              onClick={() => onNavigate('traffic')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View Traffic Feed</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {trafficSegments.slice(0, 3).map((seg) => (
              <div
                key={seg.id}
                className="p-3 rounded-lg bg-[#0f172a] border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">{seg.roadName}</div>
                  <div className="text-[11px] text-slate-400">{seg.zone} • Avg Speed: {seg.avgSpeedKmh} km/h</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-amber-400">{seg.incidentRiskPercent}% Risk</div>
                    <div className="text-[10px] text-slate-400">Density: {seg.density}</div>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${
                    seg.status === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-amber-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
