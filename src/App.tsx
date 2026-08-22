import React, { useState } from 'react';
import { TabType, Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DemoNotice } from './components/layout/DemoNotice';
import { DashboardView } from './components/dashboard/DashboardView';
import { PredictionView } from './components/prediction/PredictionView';
import { EmergencyRoutingView } from './components/routing/EmergencyRoutingView';
import { LiveTrafficView } from './components/traffic/LiveTrafficView';
import { IncidentsView } from './components/incidents/IncidentsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { EmergencyVehiclesView } from './components/vehicles/EmergencyVehiclesView';
import { ArchitectureView } from './components/architecture/ArchitectureView';
import { InnovationView } from './components/innovation/InnovationView';
import { SettingsView } from './components/settings/SettingsView';

import {
  MOCK_INCIDENTS,
  MOCK_EMERGENCY_VEHICLES,
  MOCK_TRAFFIC_SEGMENTS,
  MOCK_SYSTEM_ALERTS
} from './data/mockData';
import { Incident, EmergencyVehicle, RouteOption } from './types';
import { evaluateRoutes } from './services/routingEngine';
import { Play, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Core Data States
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [vehicles, setVehicles] = useState<EmergencyVehicle[]>(MOCK_EMERGENCY_VEHICLES);
  const [trafficSegments, setTrafficSegments] = useState(MOCK_TRAFFIC_SEGMENTS);
  const [alerts, setAlerts] = useState(MOCK_SYSTEM_ALERTS);

  // Dynamic Rerouting Simulation State
  const [isIncidentSimulated, setIsIncidentSimulated] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<EmergencyVehicle | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Evaluator Walkthrough Modal State
  const [demoGuideOpen, setDemoGuideOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Evaluate active routes
  const evalResult = evaluateRoutes('Ambulance', 'District Hospital', 'Government Medical College', 'Critical', isIncidentSimulated);
  const activeRoute: RouteOption[] = evalResult.routes;

  const handleSelectIncident = (inc: Incident) => {
    setSelectedIncident(inc);
    setActiveTab('dashboard');
  };

  const handleSelectVehicle = (veh: EmergencyVehicle) => {
    setSelectedVehicle(veh);
    setActiveTab('dashboard');
  };

  const handleDispatchEV = (inc: Incident) => {
    // Reroute nearest vehicle to incident
    const newAlert = {
      id: `alt-${Date.now()}`,
      title: `Emergency Dispatch Triggered for ${inc.id}`,
      message: `Unit A102 dispatched to ${inc.locationName}. Dynamic signal clearance activated.`,
      severity: inc.severity,
      timeAgo: 'Just now',
      location: inc.locationName,
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    setActiveTab('routing');
  };

  const handleQuickSimulate = () => {
    setIsIncidentSimulated(prev => !prev);
    setActiveTab('routing');
  };

  // Demo Walkthrough Steps required in Prompt Section 21
  const DEMO_STEPS = [
    {
      title: 'Step 1: Command Center Dashboard',
      tab: 'dashboard' as TabType,
      desc: 'Review live traffic density, active incidents (7), high-risk crash zones (12), and active emergency vehicles.'
    },
    {
      title: 'Step 2: AI Incident Risk Prediction',
      tab: 'prediction' as TabType,
      desc: 'Analyze target corridors using weather radar, traffic density, and historical crash data. View the 78% risk score & explainability.'
    },
    {
      title: 'Step 3: Dynamic Emergency Routing',
      tab: 'routing' as TabType,
      desc: 'Configure Ambulance dispatch from District Hospital to Medical College. Compare Routes A, B, C with priority scoring.'
    },
    {
      title: 'Step 4: Simulate Crash & Automatic Reroute',
      tab: 'routing' as TabType,
      action: () => setIsIncidentSimulated(true),
      desc: 'Simulate a new multi-vehicle crash on Route A. Watch TRAFFIX AI detect the crash and automatically reroute via Route B Ring Expressway.'
    },
    {
      title: 'Step 5: System Analytics & Response Gain',
      tab: 'analytics' as TabType,
      desc: 'Inspect average response-time improvement (8m 42s vs 11m standard), route efficiency, and model prediction accuracy (86%).'
    }
  ];

  const handleNextDemoStep = () => {
    if (demoStep < DEMO_STEPS.length - 1) {
      const nextStep = demoStep + 1;
      setDemoStep(nextStep);
      setActiveTab(DEMO_STEPS[nextStep].tab);
      if (DEMO_STEPS[nextStep].action) {
        DEMO_STEPS[nextStep].action!();
      }
    } else {
      setDemoGuideOpen(false);
      setDemoStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeIncidentsCount={incidents.filter(i => i.status === 'Active').length}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Header */}
        <Header
          alerts={alerts}
          setMobileOpen={setMobileOpen}
          onQuickSimulate={handleQuickSimulate}
        />

        {/* Global Demo Mode Notice Banner */}
        <DemoNotice />

        {/* NIT Raichur Guided Demo Banner */}
        <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">SIH 2026 Judge Presentation Guide:</span>
            <span className="text-slate-400 hidden md:inline">Follow the recommended 5-step evaluator demonstration flow.</span>
          </div>

          <button
            onClick={() => {
              setDemoGuideOpen(true);
              setDemoStep(0);
              setActiveTab('dashboard');
            }}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Guided Presentation Flow</span>
          </button>
        </div>

        {/* Main Tab View Renderer */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              incidents={incidents}
              vehicles={vehicles}
              trafficSegments={trafficSegments}
              alerts={alerts}
              activeRoute={activeRoute}
              onNavigate={setActiveTab}
              onSelectIncident={handleSelectIncident}
              onSelectVehicle={handleSelectVehicle}
              isIncidentSimulated={isIncidentSimulated}
              onSimulateIncident={handleQuickSimulate}
            />
          )}

          {activeTab === 'prediction' && <PredictionView />}

          {activeTab === 'routing' && (
            <EmergencyRoutingView
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              isIncidentSimulated={isIncidentSimulated}
              setIsIncidentSimulated={setIsIncidentSimulated}
            />
          )}

          {activeTab === 'traffic' && <LiveTrafficView segments={trafficSegments} />}

          {activeTab === 'incidents' && (
            <IncidentsView
              incidents={incidents}
              onSelectIncident={handleSelectIncident}
              onDispatchEV={handleDispatchEV}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'vehicles' && (
            <EmergencyVehiclesView
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              onNavigateToRouting={() => setActiveTab('routing')}
            />
          )}

          {activeTab === 'architecture' && <ArchitectureView />}

          {activeTab === 'innovation' && <InnovationView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* SIH Evaluator Guided Flow Modal */}
      {demoGuideOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                  SIH 2026 Presentation Flow ({demoStep + 1} of {DEMO_STEPS.length})
                </h3>
              </div>
              <button
                onClick={() => setDemoGuideOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-bold text-sm text-blue-400 font-sans">
                {DEMO_STEPS[demoStep].title}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {DEMO_STEPS[demoStep].desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Step {demoStep + 1} / {DEMO_STEPS.length}
              </span>

              <button
                onClick={handleNextDemoStep}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-lg shadow-blue-900/30"
              >
                <span>{demoStep === DEMO_STEPS.length - 1 ? 'Finish Presentation' : 'Next Demo Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
