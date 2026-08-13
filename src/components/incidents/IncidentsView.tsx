import React, { useState } from 'react';
import { Incident } from '../../types';
import { AlertTriangle, Filter, Search, Eye, Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';
import { IncidentModal } from './IncidentModal';

interface IncidentsViewProps {
  incidents: Incident[];
  onSelectIncident: (inc: Incident) => void;
  onDispatchEV?: (inc: Incident) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  onSelectIncident,
  onDispatchEV
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [activeModalIncident, setActiveModalIncident] = useState<Incident | null>(null);

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch = inc.locationName.toLowerCase().includes(search.toLowerCase()) || inc.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || inc.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              Incident Response Command Log
            </h2>
          </div>
          <span className="text-xs font-mono text-rose-300 bg-rose-950 px-2.5 py-1 rounded border border-rose-800 font-bold uppercase">
            {incidents.filter(i => i.status === 'Active').length} Active Emergencies
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Active traffic accidents, road blockages, heavy congestion bottlenecks, and severe weather hazards reported across the metropolitan transport network.
        </p>
      </div>

      {/* Filter Pills required in Prompt Section 9 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
          {['All', 'Accident', 'Blockage', 'Congestion', 'Weather'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs transition shrink-0 ${
                filterType === cat
                  ? 'bg-rose-950 text-rose-300 border border-rose-700 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incident ID or road..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Incidents Table required in Prompt Section 9 */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Location</th>
              <th className="p-3">Incident Type</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Time</th>
              <th className="p-3">Risk Score</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredIncidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-800/50 transition">
                <td className="p-3 font-mono font-bold text-rose-400">{inc.id}</td>
                <td className="p-3 font-bold text-slate-100">{inc.locationName}</td>
                <td className="p-3">
                  <span className="font-semibold text-slate-200">{inc.type}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    inc.severity === 'Critical'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                      : inc.severity === 'High'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="p-3 font-mono text-slate-400">{inc.timestamp}</td>
                <td className="p-3 font-mono font-bold text-amber-400">{inc.riskScore}%</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    inc.status === 'Active' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {inc.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setActiveModalIncident(inc)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold transition flex items-center gap-1.5 ml-auto text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Incident Details Modal Dialog */}
      <IncidentModal
        incident={activeModalIncident}
        onClose={() => setActiveModalIncident(null)}
        onDispatchEV={onDispatchEV}
      />
    </div>
  );
};
