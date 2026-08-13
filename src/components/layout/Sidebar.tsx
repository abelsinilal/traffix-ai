import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  Navigation,
  Activity,
  AlertTriangle,
  BarChart3,
  Ambulance,
  Settings as SettingsIcon,
  Cpu,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

export type TabType =
  | 'dashboard'
  | 'prediction'
  | 'routing'
  | 'traffic'
  | 'incidents'
  | 'analytics'
  | 'vehicles'
  | 'architecture'
  | 'innovation'
  | 'settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  activeIncidentsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  activeIncidentsCount
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prediction' as TabType, label: 'Incident Prediction', icon: BrainCircuit, badge: 'AI Model' },
    { id: 'routing' as TabType, label: 'Emergency Routing', icon: Navigation, badge: 'Dynamic' },
    { id: 'traffic' as TabType, label: 'Live Traffic', icon: Activity },
    { id: 'incidents' as TabType, label: 'Incidents', icon: AlertTriangle, count: activeIncidentsCount },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'vehicles' as TabType, label: 'Emergency Vehicles', icon: Ambulance },
    { id: 'architecture' as TabType, label: 'AI Architecture', icon: Cpu },
    { id: 'innovation' as TabType, label: 'Why TRAFFIX AI?', icon: Sparkles },
    { id: 'settings' as TabType, label: 'Settings', icon: SettingsIcon }
  ];

  const handleNavClick = (id: TabType) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/80 bg-[#0f172a]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs tracking-wider shrink-0 shadow-md shadow-blue-900/30">
              TX
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                  TRAFFIX <span className="text-blue-500">AI</span>
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold font-mono">
                  Predict • Prevent • Respond
                </p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {!collapsed && (
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 mb-2 font-bold">
              Command Modules
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors cursor-pointer text-sm font-medium relative group ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-600 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border-l-2 border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-blue-400 scale-110' : 'text-slate-400 group-hover:text-white'
                  }`}
                />

                {!collapsed && (
                  <span className="truncate font-sans">
                    {item.label}
                  </span>
                )}

                {/* Badges / Counters */}
                {!collapsed && item.badge && (
                  <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold uppercase">
                    {item.badge}
                  </span>
                )}

                {!collapsed && item.count !== undefined && item.count > 0 && (
                  <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info required by prompt */}
        <div className="p-6 border-t border-slate-800 bg-[#0f172a]">
          {!collapsed ? (
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Demo Mode</span>
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono">SIH 2026 Prototype v1.0.4</p>
            </div>
          ) : (
            <div className="flex justify-center" title="SIH 2026 Prototype - Demo Mode">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
