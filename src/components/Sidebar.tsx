import {
  Briefcase,
  Building2,
  FileCheck2,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import { WorkspaceTab } from '../types';
import { Translations } from '../i18n';

interface SidebarProps {
  activeTab: WorkspaceTab;
  onSelectTab: (tab: WorkspaceTab) => void;
  t: Translations;
  counts: {
    candidates: number;
    openJobs: number;
    pendingCompliance: number;
  };
}

export function Sidebar({
  activeTab,
  onSelectTab,
  t,
  counts,
}: SidebarProps) {
  const navItems: {
    id: WorkspaceTab;
    label: string;
    icon: typeof LayoutDashboard;
    count?: number;
  }[] = [
    { id: 'overview', label: t.nav.overview, icon: LayoutDashboard },
    { id: 'candidates', label: t.nav.candidates, icon: Users, count: counts.candidates },
    { id: 'jobs', label: t.nav.jobs, icon: Briefcase, count: counts.openJobs },
    { id: 'compliance', label: t.nav.compliance, icon: FileCheck2, count: counts.pendingCompliance },
    { id: 'partners', label: t.nav.partners, icon: Building2 },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-[#27272a] bg-[#121212] flex flex-col justify-between">
      <nav className="p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2" aria-label="Command Center Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`min-h-[60px] px-4 border-2 flex items-center justify-between text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-[#FF5500] bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.28)]'
                  : 'border-[#27272a] bg-[#18181b] text-white hover:border-[#FF5500]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </span>
              {item.count !== undefined && (
                <span
                  className={`font-brutal-mono text-xs font-bold tabular-nums px-2 py-0.5 ${
                    isActive ? 'bg-black text-[#FF5500]' : 'bg-[#121212] text-[#A1A1AA]'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="hidden lg:block p-4 border-t-2 border-[#27272a]">
        <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
          PORTAL NODE
        </p>
        <p className="font-brutal-mono text-xs text-[#FF5500] mt-1">
          hr.handsandhead.com
        </p>
      </div>
    </aside>
  );
}
