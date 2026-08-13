import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Incident, EmergencyVehicle, RouteOption, Location } from '../../types';
import { MAP_CENTER } from '../../data/mockData';
import { RefreshCw, Layers, ShieldAlert, Navigation, Eye, EyeOff } from 'lucide-react';

interface InteractiveMapProps {
  incidents?: Incident[];
  vehicles?: EmergencyVehicle[];
  routes?: RouteOption[];
  selectedRouteId?: string;
  selectedVehicleId?: string;
  selectedIncidentId?: string;
  highRiskZones?: { lat: number; lng: number; radius: number; label: string; score: number }[];
  onSelectIncident?: (incident: Incident) => void;
  onSelectVehicle?: (vehicle: EmergencyVehicle) => void;
  isIncidentSimulated?: boolean;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  incidents = [],
  vehicles = [],
  routes = [],
  selectedRouteId,
  selectedVehicleId,
  selectedIncidentId,
  highRiskZones = [
    { lat: 17.388, lng: 78.515, radius: 450, label: 'NH-167 High Crash Zone', score: 88 },
    { lat: 17.375, lng: 78.478, radius: 350, label: 'Market Square Congestion Risk', score: 78 },
    { lat: 17.398, lng: 78.482, radius: 300, label: 'Underpass Hydrolock Zone', score: 72 }
  ],
  onSelectIncident,
  onSelectVehicle,
  isIncidentSimulated = false,
  className = 'h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);

  const [showZones, setShowZones] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [tileError, setTileError] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      try {
        const map = L.map(mapContainerRef.current, {
          center: [MAP_CENTER.lat, MAP_CENTER.lng],
          zoom: MAP_CENTER.zoom,
          zoomControl: false,
          attributionControl: false
        });

        // Dark Matter tiles from CartoDB or OpenStreetMap
        const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
        });

        tileLayer.on('tileerror', () => {
          setTileError(true);
        });

        tileLayer.addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        markersLayerRef.current = L.layerGroup().addTo(map);
        routesLayerRef.current = L.layerGroup().addTo(map);
        zonesLayerRef.current = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        setMapReady(true);
      } catch (err) {
        console.warn('Map initialization issue:', err);
        setTileError(true);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Layers & Markers when props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    // 1. Render High Risk Zones
    if (zonesLayerRef.current) {
      zonesLayerRef.current.clearLayers();
      if (showZones) {
        highRiskZones.forEach(zone => {
          const circle = L.circle([zone.lat, zone.lng], {
            color: zone.score > 80 ? '#ef4444' : '#f59e0b',
            fillColor: zone.score > 80 ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.18,
            weight: 2,
            dashArray: '4, 4'
          });
          circle.bindTooltip(`<b>${zone.label}</b><br/>Predicted Risk: ${zone.score}%`, {
            permanent: false,
            className: 'custom-map-tooltip'
          });
          zonesLayerRef.current?.addLayer(circle);
        });
      }
    }

    // 2. Render Incident Markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      if (showIncidents) {
        incidents.forEach(inc => {
          let bgColor = 'bg-rose-600';
          let border = 'border-rose-400';
          let iconChar = '⚠';

          if (inc.type === 'Accident') {
            bgColor = 'bg-red-600';
            iconChar = '🚨';
          } else if (inc.type === 'Road Blockage') {
            bgColor = 'bg-amber-600';
            iconChar = '🚧';
          } else if (inc.type === 'Heavy Congestion') {
            bgColor = 'bg-orange-500';
            iconChar = '🚗';
          } else if (inc.type === 'Weather Hazard') {
            bgColor = 'bg-sky-600';
            iconChar = '🌧';
          }

          const isSelected = selectedIncidentId === inc.id;

          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div class="relative group cursor-pointer">
                <div class="${bgColor} ${border} text-white font-bold text-xs w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 ${isSelected ? 'ring-4 ring-cyan-400 animate-pulse scale-125' : ''}">
                  <span>${iconChar}</span>
                </div>
                <div class="absolute -bottom-1 -right-1 bg-slate-900 border border-slate-700 text-[10px] text-amber-400 font-mono px-1 rounded shadow">
                  ${inc.riskScore}%
                </div>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });

          const marker = L.marker([inc.lat, inc.lng], { icon: customIcon });
          marker.on('click', () => {
            if (onSelectIncident) onSelectIncident(inc);
          });
          marker.bindPopup(`
            <div class="p-2 text-slate-100 font-sans">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-bold text-sm text-red-400">${inc.id}: ${inc.type}</span>
                <span class="px-1.5 py-0.5 text-[10px] bg-red-950 text-red-300 border border-red-800 rounded font-mono">${inc.severity}</span>
              </div>
              <p class="text-xs text-slate-300 font-medium mb-1">${inc.locationName}</p>
              <p class="text-[11px] text-slate-400 mb-2">${inc.description}</p>
              <div class="text-[11px] text-cyan-400 font-mono">Incident Risk: ${inc.riskScore}%</div>
            </div>
          `, { className: 'custom-leaflet-popup' });

          markersLayerRef.current?.addLayer(marker);
        });
      }

      // Render Emergency Vehicles
      if (showVehicles) {
        vehicles.forEach(veh => {
          let vehColor = 'bg-cyan-500';
          let vehIcon = '🚑';

          if (veh.type === 'Fire Truck') {
            vehColor = 'bg-red-500';
            vehIcon = '🚒';
          } else if (veh.type === 'Police Vehicle') {
            vehColor = 'bg-blue-600';
            vehIcon = '🚓';
          }

          const isSelected = selectedVehicleId === veh.id;

          const vehicleDivIcon = L.divIcon({
            className: 'custom-vehicle-icon',
            html: `
              <div class="relative group cursor-pointer">
                <div class="${vehColor} text-white text-sm w-9 h-9 rounded-lg flex items-center justify-center shadow-xl border-2 border-slate-100 ${isSelected ? 'ring-4 ring-cyan-300 scale-125 z-50' : ''}">
                  <span>${vehIcon}</span>
                </div>
                <div class="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-cyan-300 text-[9px] font-mono font-semibold px-1 py-0.5 rounded border border-cyan-800 whitespace-nowrap">
                  ${veh.callSign}
                </div>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });

          const marker = L.marker([veh.lat, veh.lng], { icon: vehicleDivIcon });
          marker.on('click', () => {
            if (onSelectVehicle) onSelectVehicle(veh);
          });
          marker.bindPopup(`
            <div class="p-2 text-slate-100 font-sans">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-bold text-sm text-cyan-400">${veh.callSign} (${veh.type})</span>
                <span class="px-1.5 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-mono">${veh.status}</span>
              </div>
              <p class="text-xs text-slate-300 mb-1">📍 ${veh.currentLocationName}</p>
              ${veh.destinationName ? `<p class="text-xs text-slate-400">🎯 ${veh.destinationName} (ETA: ${veh.etaMinutes}m)</p>` : ''}
              <p class="text-[11px] text-slate-400 mt-1">Driver: ${veh.driverName} (${veh.contactNumber})</p>
            </div>
          `, { className: 'custom-leaflet-popup' });

          markersLayerRef.current?.addLayer(marker);
        });
      }
    }

    // 3. Render Route Options
    if (routesLayerRef.current) {
      routesLayerRef.current.clearLayers();

      routes.forEach(route => {
        const isSelected = selectedRouteId ? route.id === selectedRouteId : route.id === 'route-a';
        let strokeColor = isSelected ? '#06b6d4' : '#64748b'; // Cyan for active, Slate for inactive
        let weight = isSelected ? 6 : 4;
        let opacity = isSelected ? 0.9 : 0.4;
        let dashArray = route.hasBlockage ? '8, 8' : undefined;

        if (route.hasBlockage) {
          strokeColor = '#ef4444'; // Red for blocked route segment
        } else if (isSelected) {
          strokeColor = '#38bdf8'; // Sky blue active route
        }

        const polyline = L.polyline(route.pathCoordinates, {
          color: strokeColor,
          weight,
          opacity,
          dashArray
        });

        polyline.bindTooltip(`<b>${route.name}</b><br/>ETA: ${route.etaFormatted} | Dist: ${route.distanceKm} km`, {
          sticky: true,
          className: 'custom-map-tooltip'
        });

        routesLayerRef.current?.addLayer(polyline);

        // Add start & end markers for the active route
        if (isSelected && route.pathCoordinates.length > 0) {
          const startPt = route.pathCoordinates[0];
          const endPt = route.pathCoordinates[route.pathCoordinates.length - 1];

          const startIcon = L.divIcon({
            className: 'route-terminal-icon',
            html: `<div class="bg-emerald-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-lg border border-white font-mono">START</div>`,
            iconSize: [40, 20],
            iconAnchor: [20, 10]
          });

          const endIcon = L.divIcon({
            className: 'route-terminal-icon',
            html: `<div class="bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-lg border border-white font-mono">DEST</div>`,
            iconSize: [40, 20],
            iconAnchor: [20, 10]
          });

          routesLayerRef.current?.addLayer(L.marker(startPt, { icon: startIcon }));
          routesLayerRef.current?.addLayer(L.marker(endPt, { icon: endIcon }));
        }
      });
    }
  }, [
    mapReady,
    incidents,
    vehicles,
    routes,
    selectedRouteId,
    selectedVehicleId,
    selectedIncidentId,
    showZones,
    showIncidents,
    showVehicles,
    isIncidentSimulated
  ]);

  return (
    <div className={`relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 ${className}`}>
      {/* Leaflet Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px] bg-slate-950 z-10" />

      {/* Map Control HUD Overlay */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-lg border border-slate-700 shadow-xl text-xs">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 px-1">Layers</div>
        
        <button
          onClick={() => setShowZones(!showZones)}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded transition ${
            showZones ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" /> High Risk
          </span>
          {showZones ? <Eye className="w-3 h-3 text-amber-400" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
        </button>

        <button
          onClick={() => setShowIncidents(!showIncidents)}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded transition ${
            showIncidents ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Incidents ({incidents.length})
          </span>
          {showIncidents ? <Eye className="w-3 h-3 text-rose-400" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
        </button>

        <button
          onClick={() => setShowVehicles(!showVehicles)}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded transition ${
            showVehicles ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" /> Fleet ({vehicles.length})
          </span>
          {showVehicles ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
        </button>
      </div>

      {/* Map Legend HUD Overlay */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-700 shadow-xl text-[11px] font-sans max-w-[260px]">
        <div className="font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
          <span>Map Intelligence Legend</span>
          <span className="text-[9px] font-mono bg-cyan-950 text-cyan-300 px-1 rounded">OSM / CartoDB</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Accident
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Blockage
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Ambulance
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Police Unit
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <span className="w-4 h-1 bg-cyan-400 rounded"></span> Active Emergency Route
          </div>
          {isIncidentSimulated && (
            <div className="flex items-center gap-1.5 col-span-2 text-rose-400 font-semibold text-[10px] bg-rose-950/60 p-1 rounded border border-rose-800/50">
              <span className="w-4 h-1 bg-rose-500 border-dashed border"></span> Simulated Blocked Segment
            </div>
          )}
        </div>
      </div>

      {/* Reroute Alert Banner on Map if Active */}
      {isIncidentSimulated && (
        <div className="absolute top-3 left-3 z-20 bg-rose-950/90 border border-rose-500 text-rose-200 px-3 py-2 rounded-lg backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="text-base">🚨</span>
          <span>Simulated Incident Active: Route A Blocked. Dynamic Reroute Applied to Map!</span>
        </div>
      )}
    </div>
  );
};
