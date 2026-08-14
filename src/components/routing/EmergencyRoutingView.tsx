import React, { useState } from 'react';
import {
  Navigation,
  Ambulance,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Flame,
  Shield,
  Zap,
  MapPin,
  ArrowRight,
  Info
} from 'lucide-react';
import { VehicleType, PriorityLevel, RouteOption, EmergencyVehicle } from '../../types';
import { evaluateRoutes, RouteEvaluationResult } from '../../services/routingEngine';
import { InteractiveMap } from '../map/InteractiveMap';

interface EmergencyRoutingViewProps {
  vehicles: EmergencyVehicle[];
  onSelectVehicle?: (veh: EmergencyVehicle) => void;
  isIncidentSimulated: boolean;
  setIsIncidentSimulated: (sim: boolean) => void;
}

export const EmergencyRoutingView: React.FC<EmergencyRoutingViewProps> = ({
  vehicles,
  onSelectVehicle,
  isIncidentSimulated,
  setIsIncidentSimulated
}) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('Ambulance');
  const [startLocation, setStartLocation] = useState('RIMS District Hospital');
  const [destination, setDestination] = useState('Gunj Road Market');
  const [priority, setPriority] = useState<PriorityLevel>('Critical');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-a');

  // Route evaluation output from scoring service
  const evalResult: RouteEvaluationResult = evaluateRoutes(
    vehicleType,
    startLocation,
    destination,
    priority,
    isIncidentSimulated
  );

  const activeRouteId = isIncidentSimulated ? 'route-b' : selectedRouteId;

  const handleSimulateIncidentClick = () => {
    setIsIncidentSimulated(true);
    setSelectedRouteId('route-b');
  };

  const handleResetSimulation = () => {
    setIsIncidentSimulated(false);
    setSelectedRouteId('route-a');
  };

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Navigation className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              Dynamic Emergency Routing
            </h2>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20 font-bold uppercase">
            Multi-Factor Route Optimizer
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Find the safest and fastest route for emergency vehicles. Unlike standard GPS navigation, TRAFFIX AI balances ETA, traffic density, incident crash probabilities, and active emergency priority preemption.
        </p>
      </div>

      {/* Dynamic Rerouting Simulation Alert Banner */}
      {isIncidentSimulated && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 shadow-2xl space-y-3 animate-pulse">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>⚠ NEW INCIDENT DETECTED ON PRIMARY EMERGENCY ROUTE (Route A)</span>
            </div>
            <button
              onClick={handleResetSimulation}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold uppercase transition flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Simulation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 font-mono">
            <div className="p-2.5 rounded-lg bg-[#0f172a] border border-red-500/30">
              <span className="text-red-400 block text-[10px] uppercase font-bold">OLD ETA (Route A)</span>
              <span className="text-base font-bold text-white">8m 20s</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0f172a] border border-red-500/30">
              <span className="text-red-400 block text-[10px] uppercase font-bold">NEW DELAYED ETA</span>
              <span className="text-base font-bold text-red-300 line-through">9m 05s</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0f172a] border border-blue-500/40">
              <span className="text-blue-400 block text-[10px] uppercase font-bold">RECOMMENDED ALTERNATIVE</span>
              <span className="text-base font-bold text-blue-300">7m 40s (Route B)</span>
            </div>
          </div>
        </div>
      )}

      {/* Control Panel & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Route Configuration Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 font-sans">
              <Zap className="w-4 h-4 text-blue-400" /> Dispatch Parameters
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Emergency Vehicle Selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Emergency Vehicle</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Ambulance' as VehicleType, icon: Ambulance, label: 'Ambulance' },
                  { id: 'Fire Truck' as VehicleType, icon: Flame, label: 'Fire Truck' },
                  { id: 'Police' as VehicleType, icon: Shield, label: 'Police' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSel = vehicleType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setVehicleType(item.id)}
                      className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 transition text-[11px] font-medium ${
                        isSel
                          ? 'bg-blue-600/10 text-blue-400 border-blue-500 font-bold shadow-md'
                          : 'bg-[#0f172a] text-slate-400 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Location */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Start Location</label>
              <select
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="RIMS District Hospital">RIMS District Hospital (Hub A)</option>
                <option value="Central Fire Station">Central Fire Station</option>
                <option value="City Police Headquarters">City Police HQ</option>
                <option value="Station Road Flyover">Station Road Depot</option>
              </select>
            </div>

            {/* Destination Location */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="Gunj Road Market">Gunj Road Market Area</option>
                <option value="Navodaya Medical College">Navodaya Medical College</option>
                <option value="Ambedkar Circle">Ambedkar Circle Junction</option>
                <option value="Mantralayam road">Mantralayam road</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Priority Level</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Critical' as PriorityLevel, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
                  { id: 'High' as PriorityLevel, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
                  { id: 'Normal' as PriorityLevel, color: 'text-green-400 border-green-500/30 bg-green-500/10' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPriority(item.id)}
                    className={`py-2 rounded-lg border text-[11px] font-bold font-mono uppercase transition ${
                      priority === item.id
                        ? `${item.color} shadow-md ring-1 ring-blue-400`
                        : 'bg-[#0f172a] text-slate-400 border-slate-800'
                    }`}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setSelectedRouteId(evalResult.recommendedRouteId)}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Find Best Emergency Route</span>
              </button>

              {/* Simulation Trigger Button */}
              {!isIncidentSimulated ? (
                <button
                  onClick={handleSimulateIncidentClick}
                  className="w-full py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Simulate Route Incident</span>
                </button>
              ) : (
                <button
                  onClick={handleResetSimulation}
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Route Simulation</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Map & Route Option Cards (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider font-sans flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> Map Corridor Visualization
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Showing: <strong className="text-blue-400">{activeRouteId.toUpperCase()}</strong>
              </span>
            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <InteractiveMap
                vehicles={vehicles}
                routes={evalResult.routes}
                selectedRouteId={activeRouteId}
                isIncidentSimulated={isIncidentSimulated}
                className="h-[360px] w-full rounded-xl"
              />
            </div>
          </div>

          {/* Recommended Route Reason Badge */}
          <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-blue-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Recommended Route: {evalResult.routes.find(r => r.id === evalResult.recommendedRouteId)?.name}</span>
            </div>
            <p className="text-slate-300 leading-relaxed pl-6">
              {evalResult.recommendationReason}
            </p>
          </div>

          {/* 3 Route Options Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evalResult.routes.map((route) => {
              const isRecommended = route.id === evalResult.recommendedRouteId;
              const isSelected = activeRouteId === route.id;

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition space-y-3 relative ${
                    isRecommended
                      ? 'bg-slate-900/40 border-blue-500/80 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-2.5 left-4 bg-blue-600 text-white text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      ★ RECOMMENDED
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-xs text-slate-200">{route.name}</span>
                    <span className="text-[10px] font-mono text-blue-400 font-bold bg-[#0f172a] px-1.5 py-0.5 rounded border border-slate-800">
                      Score: {route.priorityScore}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-[#0f172a] border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">ETA</span>
                      <span className="font-bold text-white text-xs">{route.etaFormatted}</span>
                    </div>

                    <div className="p-2 rounded bg-[#0f172a] border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">DISTANCE</span>
                      <span className="font-bold text-slate-300 text-xs">{route.distanceKm} km</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Traffic:</span>
                      <span className="text-slate-200 font-medium">{route.trafficLevel}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Risk Profile:</span>
                      <span className={route.riskLevel === 'Critical' ? 'text-red-400 font-bold' : 'text-slate-200'}>
                        {route.riskLevel}
                      </span>
                    </div>
                  </div>

                  {route.hasBlockage && (
                    <div className="text-[10px] text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20 font-sans">
                      {route.blockageDetails}
                    </div>
                  )}

                  <ul className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                    {route.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1 text-slate-300">
                        <span className="text-blue-400">•</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
