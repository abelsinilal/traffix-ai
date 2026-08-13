import React from 'react';
import { Cpu, ArrowDown, Database, GitBranch, BrainCircuit, ShieldAlert, Navigation, Zap, Layers, Server } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const pipelineSteps = [
    { title: '1. Multi-Stream Data Ingestion', icon: Database, desc: 'Real-time traffic sensors, weather radar, historical accident logs, municipal road work APIs, and emergency fleet telematics.' },
    { title: '2. Data Preprocessing & Cleansing', icon: Layers, desc: 'GPS outlier removal, missing sensor interpolation, spatial map matching onto OpenStreetMap graph nodes.' },
    { title: '3. Feature Engineering Layer', icon: GitBranch, desc: 'Spatial-temporal aggregation, rainfall intensity scaling, visibility degradation index, historical crash density vectors.' },
    { title: '4. AI Incident Prediction Model', icon: BrainCircuit, desc: 'XGBoost / Random Forest classifier estimating crash probability per road segment for the next 15–120 minutes.' },
    { title: '5. Dynamic Risk Score Calculation', icon: ShieldAlert, desc: 'Outputs standardized 0–100% hazard index with explainability feature weights.' },
    { title: '6. Graph Route Optimization Engine', icon: Navigation, desc: 'Modified Dijkstra / A* algorithm with dynamic edge cost = Distance + Traffic Delay + Incident Hazard Penalty.' },
    { title: '7. Emergency Vehicle Dispatch Recommendation', icon: Zap, desc: 'Matches optimal unit type (Ambulance/Fire/Police) based on proximity, traffic clearance, and signal preemption.' },
    { title: '8. Real-Time Dynamic Rerouting', icon: Cpu, desc: 'Continuous route monitoring; automatically reroutes active emergency units if a crash occurs along their path.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              AI System Architecture & ML Pipeline
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 font-bold uppercase">
            SIH 2026 Technical Design
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Detailed blueprint explaining data ingestion, feature engineering, predictive incident machine learning models, and dynamic graph-based emergency routing algorithms.
        </p>
      </div>

      {/* End-to-End Pipeline Flowchart */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-sans border-b border-slate-800 pb-3">
          <GitBranch className="w-4 h-4 text-cyan-400" /> End-to-End Operational Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 relative group hover:border-cyan-500/50 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 font-mono font-bold text-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-200 font-sans">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-World Inputs & ML Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-World Inputs */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-sans border-b border-slate-800 pb-3">
            <Database className="w-4 h-4 text-amber-400" /> Planned Real-World Data Inputs
          </h3>

          <ul className="space-y-2 text-xs text-slate-300">
            {[
              'Historical accident records (5+ years spatial-temporal logs)',
              'Live traffic density sensor feeds & mean vehicle speeds',
              'Meteorological radar APIs (rainfall mm/hr, fog/visibility km)',
              'Road infrastructure condition & lane geometry metrics',
              'Time of day, day of week, and public event calendar feeds',
              'Emergency vehicle telematics & active dispatch logs'
            ].map((inp, i) => (
              <li key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <span>{inp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Machine Learning Models */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-sans border-b border-slate-800 pb-3">
            <BrainCircuit className="w-4 h-4 text-cyan-400" /> Machine Learning & Graph Engines
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300 flex items-center justify-between">
                <span>XGBoost / Random Forest Classifier</span>
                <span className="text-[10px] font-mono bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Incident Risk</span>
              </div>
              <p className="text-[11px] text-slate-400">Predicts crash probabilities (0-100%) for individual road segments using multi-variate environmental inputs.</p>
            </li>

            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300 flex items-center justify-between">
                <span>Dynamic Dijkstra / A* Graph Engine</span>
                <span className="text-[10px] font-mono bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Routing</span>
              </div>
              <p className="text-[11px] text-slate-400">Calculates optimal emergency vehicle routes by dynamically re-weighting road edge costs based on predicted hazard risk.</p>
            </li>

            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300 flex items-center justify-between">
                <span>Reinforcement Learning (Future Version)</span>
                <span className="text-[10px] font-mono bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Phase 2</span>
              </div>
              <p className="text-[11px] text-slate-400">Adaptive signal preemption and corridor green-wave synchronization for multi-vehicle emergency dispatch.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
