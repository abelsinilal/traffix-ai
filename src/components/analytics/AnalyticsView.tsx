import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  BrainCircuit,
  Zap,
  Info
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const TRAFFIC_VOLUME_DATA = [
  { time: '06:00', volume: 1200 },
  { time: '08:00', volume: 4800 },
  { time: '10:00', volume: 3600 },
  { time: '12:00', volume: 2900 },
  { time: '14:00', volume: 3200 },
  { time: '16:00', volume: 5400 },
  { time: '18:00', volume: 6100 },
  { time: '20:00', volume: 3100 },
  { time: '22:00', volume: 1500 }
];

const INCIDENT_TYPE_DATA = [
  { name: 'Accidents', count: 12, fill: '#ef4444' },
  { name: 'Road Blockages', count: 8, fill: '#f59e0b' },
  { name: 'Heavy Congestion', count: 18, fill: '#06b6d4' },
  { name: 'Weather Hazards', count: 6, fill: '#3b82f6' }
];

const RESPONSE_TIME_COMPARISON = [
  { month: 'Jan', standardRoute: 11.2, traffixAiRoute: 8.8 },
  { month: 'Feb', standardRoute: 10.9, traffixAiRoute: 8.5 },
  { month: 'Mar', standardRoute: 11.5, traffixAiRoute: 8.9 },
  { month: 'Apr', standardRoute: 10.8, traffixAiRoute: 8.4 },
  { month: 'May', standardRoute: 11.1, traffixAiRoute: 8.6 },
  { month: 'Jun', standardRoute: 10.6, traffixAiRoute: 8.2 }
];

const PREDICTED_VS_ACTUAL = [
  { zone: 'Zone 1', predicted: 8, actual: 7 },
  { zone: 'Zone 2', predicted: 14, actual: 12 },
  { zone: 'Zone 3', predicted: 22, actual: 20 },
  { zone: 'Zone 4', predicted: 19, actual: 18 }
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              System Performance Analytics
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded border border-amber-800 font-bold uppercase">
            Simulated Benchmark Metrics
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Comparative performance evaluation showing response-time reduction, route optimization efficiency, model accuracy, and predictive incident validation.
        </p>
      </div>

      {/* KPI Cards required in Prompt Section 11 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-xs font-medium text-slate-400">Prediction Accuracy</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">86%</div>
          <div className="text-[10px] text-slate-400 font-mono">Prototype Validation</div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-xs font-medium text-slate-400">Avg Emergency Response Time</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">8m 42s</div>
          <div className="text-[10px] text-emerald-300 font-mono">↓ 2m 18s saved vs legacy GPS</div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-xs font-medium text-slate-400">Avg Route Efficiency Gain</span>
          <div className="text-2xl font-black text-amber-400 font-mono">18%</div>
          <div className="text-[10px] text-amber-300 font-mono">Traffic bottleneck avoidance</div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-xs font-medium text-slate-400">Incidents Predicted</span>
          <div className="text-2xl font-black text-rose-400 font-mono">24</div>
          <div className="text-[10px] text-rose-300 font-mono">Past 30 days prototype test</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Response Time Comparison */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-200 flex items-center gap-2 font-sans">
              <Clock className="w-4 h-4 text-cyan-400" /> Response Time Comparison (Minutes)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Legacy vs TRAFFIX AI</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RESPONSE_TIME_COMPARISON} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="standardRoute" name="Standard Route (Min)" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="traffixAiRoute" name="TRAFFIX AI Route (Min)" stroke="#06b6d4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Predicted vs Actual Incidents */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-200 flex items-center gap-2 font-sans">
              <BrainCircuit className="w-4 h-4 text-rose-400" /> Predicted vs Actual Incidents
            </span>
            <span className="text-[10px] font-mono text-slate-400">Zone Validation</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PREDICTED_VS_ACTUAL} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="zone" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="predicted" name="Predicted Risk Alerts" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Incidents Logged" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Hourly Traffic Volume */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-200 flex items-center gap-2 font-sans">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Hourly Traffic Corridor Volume
            </span>
            <span className="text-[10px] font-mono text-slate-400">Vehicles / Hour</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_VOLUME_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="volume" name="Vehicle Volume" stroke="#10b981" fillOpacity={1} fill="url(#volGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Incident Frequency Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-200 flex items-center gap-2 font-sans">
              <BarChart3 className="w-4 h-4 text-amber-400" /> Incident Category Distribution
            </span>
            <span className="text-[10px] font-mono text-slate-400">Past 30 Days</span>
          </div>

          <div className="h-56 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={INCIDENT_TYPE_DATA} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {INCIDENT_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Simulated Benchmark Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <strong>Demonstration Disclaimer:</strong> Metrics above are simulated benchmarks designed for SIH 2026 evaluator presentation. Real deployment uses live city transport telemetry.
        </p>
      </div>
    </div>
  );
};
