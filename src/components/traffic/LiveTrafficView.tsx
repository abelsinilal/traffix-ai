import React, { useState } from 'react';
import { TrafficSegment } from '../../types';
import { Activity, Search, Filter, AlertTriangle, ShieldCheck, TrendingDown, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LiveTrafficViewProps {
  segments: TrafficSegment[];
}

export const LiveTrafficView: React.FC<LiveTrafficViewProps> = ({ segments }) => {
  const [search, setSearch] = useState('');
  const [filterZone, setFilterZone] = useState('All');

  const filteredSegments = segments.filter((s) => {
    const matchesSearch = s.roadName.toLowerCase().includes(search.toLowerCase()) || s.zone.toLowerCase().includes(search.toLowerCase());
    const matchesZone = filterZone === 'All' || s.zone === filterZone;
    return matchesSearch && matchesZone;
  });

  const chartData = segments.map((s) => ({
    name: s.roadName.replace('Corridor', '').replace('Expressway', ''),
    risk: s.incidentRiskPercent,
    speed: s.avgSpeedKmh
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              Live Traffic Corridor Feed
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 font-bold uppercase">
            Sensor Feed • 30s Refresh
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Real-time arterial traffic density monitoring, congestion indexes, speed telemetry, and predictive risk scoring across city zones.
        </p>
      </div>

      {/* Zone Overview Cards required in Prompt Section 8 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { zone: 'Zone 1 (Outer Ring)', level: 'Low Density', speed: '68 km/h', status: 'Normal', color: 'border-emerald-800/80 bg-emerald-950/40 text-emerald-300' },
          { zone: 'Zone 2 (Civic Lines)', level: 'Moderate', speed: '32 km/h', status: 'Normal', color: 'border-cyan-800/80 bg-cyan-950/40 text-cyan-300' },
          { zone: 'Zone 3 (Market Area)', level: 'Heavy Density', speed: '11 km/h', status: 'Critical', color: 'border-rose-800/80 bg-rose-950/40 text-rose-300' },
          { zone: 'Zone 4 (NH-167 Hub)', level: 'Severe Bottleneck', speed: '18 km/h', status: 'Critical', color: 'border-amber-800/80 bg-amber-950/40 text-amber-300' }
        ].map((item, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${item.color} shadow-lg space-y-1`}>
            <div className="text-xs font-bold font-sans">{item.zone}</div>
            <div className="text-lg font-black font-mono">{item.level}</div>
            <div className="flex items-center justify-between text-[11px] opacity-80 font-mono">
              <span>Avg Speed: {item.speed}</span>
              <span className="font-bold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Traffic Speed & Risk Graph */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-slate-200 flex items-center gap-2 font-sans">
            <Activity className="w-4 h-4 text-cyan-400" /> Arterial Road Risk Index vs Average Speed
          </span>
          <span className="text-[10px] font-mono text-slate-400">Telemetry Comparison</span>
        </div>

        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
              />
              <Bar dataKey="risk" name="Incident Risk %" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk > 75 ? '#ef4444' : entry.risk > 40 ? '#f59e0b' : '#06b6d4'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Table Section */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search road or zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="All">All Zones</option>
              <option value="Zone 1">Zone 1</option>
              <option value="Zone 2">Zone 2</option>
              <option value="Zone 3">Zone 3</option>
              <option value="Zone 4">Zone 4</option>
            </select>
          </div>
        </div>

        {/* Traffic Table required in Prompt Section 8 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Road Corridor</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Traffic Density</th>
                <th className="p-3">Avg Speed</th>
                <th className="p-3">Incident Risk</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredSegments.map((seg) => (
                <tr key={seg.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-3 font-bold text-slate-100">{seg.roadName}</td>
                  <td className="p-3 font-mono text-slate-400">{seg.zone}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      seg.density === 'Severe'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : seg.density === 'Heavy'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : seg.density === 'Moderate'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {seg.density}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-300 font-bold">{seg.avgSpeedKmh} km/h</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{seg.incidentRiskPercent}%</span>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${seg.incidentRiskPercent >= 75 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                          style={{ width: `${seg.incidentRiskPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      seg.status === 'Critical'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                        : seg.status === 'At Risk'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {seg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
