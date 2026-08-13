import React from 'react';
import { Sparkles, ShieldCheck, Zap, Navigation, BrainCircuit, AlertTriangle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const InnovationView: React.FC = () => {
  const innovationCards = [
    {
      title: '1. Predict Before It Happens',
      icon: BrainCircuit,
      color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300',
      description: 'Forecasts potential traffic crashes and bottlenecks 15–60 minutes in advance using precipitation, traffic density, and historical spatial patterns.'
    },
    {
      title: '2. Emergency-Specific Routing',
      icon: Navigation,
      color: 'border-blue-500/50 bg-blue-950/30 text-blue-300',
      description: 'Prioritizes route safety, signal preemption clearance, and shoulder width over purely physical distance or static speed limits.'
    },
    {
      title: '3. Real-Time Dynamic Rerouting',
      icon: Zap,
      color: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
      description: 'Continuously monitors active emergency corridors and automatically recalculates alternate routes the moment an incident occurs.'
    },
    {
      title: '4. Explainable Risk Analysis',
      icon: ShieldCheck,
      color: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300',
      description: 'Provides transparent AI risk breakdowns (traffic, rainfall, visibility, road quality) so dispatch officers understand WHY a route was selected.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              Why TRAFFIX AI? Innovation Spotlight
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 font-bold uppercase">
            Smart India Hackathon 2026
          </span>
        </div>

        {/* Key Innovation Statement required in Prompt Section 13 */}
        <p className="text-sm text-cyan-200 leading-relaxed max-w-4xl font-medium bg-cyan-950/60 p-3 rounded-xl border border-cyan-800/80">
          "Traditional navigation systems primarily optimize routes based on current traffic and distance. TRAFFIX AI aims to incorporate predicted incident risk into emergency routing so that emergency vehicles can avoid roads that are likely to become problematic."
        </p>
      </div>

      {/* 4 Innovation Cards required in Prompt Section 13 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {innovationCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${card.color} shadow-xl space-y-3 relative group hover:scale-[1.01] transition-transform`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100 font-sans">{card.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison Table: Traditional GPS vs TRAFFIX AI */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-sans border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Paradigm Shift: Traditional GPS Navigation vs TRAFFIX AI
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Feature Metric</th>
                <th className="p-3 text-rose-300">Traditional Consumer GPS</th>
                <th className="p-3 text-cyan-300">TRAFFIX AI System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-200">Routing Paradigm</td>
                <td className="p-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Reactive (current traffic only)
                </td>
                <td className="p-3 text-cyan-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Proactive (predicts future risk)
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-200">Emergency Priority</td>
                <td className="p-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Treats ambulance like regular cars
                </td>
                <td className="p-3 text-cyan-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Dedicated emergency preemption
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-200">Rerouting Speed</td>
                <td className="p-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Delayed until traffic backs up
                </td>
                <td className="p-3 text-cyan-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Instant automated rerouting on crash event
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-200">AI Explainability</td>
                <td className="p-3 text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> Black box ETA estimate
                </td>
                <td className="p-3 text-cyan-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Full breakdown of 5 risk drivers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
