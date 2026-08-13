import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, RefreshCw, Bell, Sliders, Map, Info, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [demoMode, setDemoMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState(70);
  const [defaultPriority, setDefaultPriority] = useState('Critical');
  const [mapTheme, setMapTheme] = useState('Dark Matter (CartoDB)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              System Configuration & Preferences
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 font-bold uppercase">
            Admin Controls
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Configure risk prediction sensitivities, dynamic rerouting threshold parameters, notification alerts, map tile styling, and demo environment settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Settings Form Controls (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-100 font-sans border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Operational Toggles & Thresholds
          </h3>

          <div className="space-y-4 text-xs">
            {/* Demo Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block text-xs">Global Demo Mode</span>
                <span className="text-[11px] text-slate-400">Enables simulated traffic feed and test incident scenarios.</span>
              </div>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  demoMode ? 'bg-cyan-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    demoMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto Refresh Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block text-xs">Sensor Auto-Refresh (30s)</span>
                <span className="text-[11px] text-slate-400">Automatically polls road telemetry and vehicle GPS positions.</span>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  autoRefresh ? 'bg-cyan-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notification Sound Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block text-xs">High Severity Incident Alerts</span>
                <span className="text-[11px] text-slate-400">Displays real-time audio and popup banners for critical incidents.</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  notifications ? 'bg-cyan-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Prediction Threshold Slider */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-xs">Incident Risk Alert Threshold</span>
                <span className="font-mono text-cyan-400 font-bold">{riskThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <span className="text-[10px] text-slate-400 block">
                Corridors scoring above {riskThreshold}% risk will trigger automated dispatch warnings.
              </span>
            </div>

            {/* Default Priority Selector */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 text-xs block">Default Dispatch Emergency Priority</label>
              <select
                value={defaultPriority}
                onChange={(e) => setDefaultPriority(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Critical">Critical Priority (Signal Preemption Enabled)</option>
                <option value="High">High Priority</option>
                <option value="Normal">Normal Priority</option>
              </select>
            </div>

            {/* Map Style Selector */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 text-xs block">Map Layer Tile Theme</label>
              <select
                value={mapTheme}
                onChange={(e) => setMapTheme(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Dark Matter (CartoDB)">Dark Matter (CartoDB Command Center)</option>
                <option value="OpenStreetMap Standard">OpenStreetMap Standard</option>
                <option value="High-Tech Vector Grid">High-Tech Vector Grid</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-lg shadow-cyan-950 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save System Settings</span>
              </button>

              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-medium animate-pulse">
                  ✓ Settings saved successfully!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* System Information Card required in Prompt Section 18 (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-sans border-b border-slate-800 pb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" /> System Information
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">System Name:</span>
                <span className="text-cyan-300 font-bold">TRAFFIX AI</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Version:</span>
                <span className="text-slate-200">1.0 Prototype</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Hackathon Project:</span>
                <span className="text-amber-300 font-bold">SIH 2026</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Runtime Stack:</span>
                <span className="text-slate-200">React + TS + Vite + Leaflet</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Environment:</span>
                <span className="text-emerald-400 font-bold">Cloud Run Production Container</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
