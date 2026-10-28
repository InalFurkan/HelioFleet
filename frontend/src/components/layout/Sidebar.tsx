import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, BusFront, SunMedium, FileBarChart } from 'lucide-react';
import Logo from './common/Logo.tsx';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/chargers', label: 'Charging Stations', icon: Zap },
  { path: '/fleet', label: 'Fleet Management', icon: BusFront },
  { path: '/energy', label: 'Energy & Grid', icon: SunMedium },
  { path: '/reports', label: 'Reports & Logs', icon: FileBarChart },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-surface-border bg-surface flex flex-col h-screen fixed left-0 top-0 z-30">
      <div className="h-16 flex items-center px-6 border-b border-surface-border">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-muted text-brand-primary border-l-2 border-brand-primary'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-surface-elevated'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-border bg-surface-elevated/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-mono text-xs font-bold">
            OP
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-white truncate">Merkez Garajı</p>
            <p className="text-[11px] text-gray-500 font-mono truncate">Fleet Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}