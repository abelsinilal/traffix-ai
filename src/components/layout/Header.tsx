import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  Menu,
  Shield,
  User,
  Activity,
  AlertTriangle,
  X,
  Volume2,
  Radio
} from 'lucide-react';
import { SystemAlert } from '../../types';

interface HeaderProps {
  alerts: SystemAlert[];
  onOpenAlertsModal?: () => void;
  setMobileOpen: (open: boolean) => void;
  onQuickSimulate?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  alerts,
  onOpenAlertsModal,
  setMobileOpen,
  onQuickSimulate
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <header className="h-16 bg-[#0f172a]/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">
            Dashboard Overview
          </h1>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700 font-mono">
            <Radio className="w-3 h-3 text-blue-400 animate-pulse" /> LIVE STREAM
          </span>
          <span className="text-xs font-mono text-slate-400 hidden lg:block">
            {dateStr} • <span className="text-blue-400 font-bold">{timeStr}</span>
          </span>
        </div>
      </div>

      {/* Right: System Indicators & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Simulate Trigger */}
        {onQuickSimulate && (
          <button
            onClick={onQuickSimulate}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/20 transition shadow-sm"
            title="Simulate incident on active emergency route"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Incident</span>
          </button>
        )}

        {/* System Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="font-bold text-[10px] sm:text-xs">SYSTEM ACTIVE</span>
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 relative transition"
            aria-label="View system alerts"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono font-bold text-[9px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl z-50 p-3 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5 font-sans uppercase tracking-wider">
                  <Bell className="w-3.5 h-3.5 text-blue-400" /> System Alerts & Dispatch Logs
                </span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                      alt.severity === 'Critical'
                        ? 'bg-red-500/10 border-red-500/20 text-red-200'
                        : alt.severity === 'High'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{alt.title}</span>
                      <span className="text-[9px] font-mono opacity-75">{alt.timeAgo}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{alt.message}</p>
                    {alt.location && (
                      <div className="text-[10px] font-mono text-blue-400 mt-1">
                        📍 {alt.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Area */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shadow-inner">
            <User className="w-4 h-4 text-slate-300" />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-200 font-sans">NIT Raichur</span>
            <span className="text-[9px] text-slate-400 font-mono">Control Officer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
