import { Briefcase, Home, Phone, Scale } from 'lucide-react';
import type { AppMode, TopNavSection } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface MobileBottomNavProps {
  activeSection: TopNavSection;
  mode: AppMode;
  onNavigateSection: (section: TopNavSection) => void;
  t: Translations;
}

export function MobileBottomNav({
  activeSection,
  mode,
  onNavigateSection,
  t,
}: MobileBottomNavProps) {
  const items: {
    id: Extract<TopNavSection, 'home' | 'demands' | 'legal' | 'contact'>;
    label: string;
    icon: typeof Home;
  }[] = [
    { id: 'home', label: t.mobileNav.home, icon: Home },
    { id: 'demands', label: t.mobileNav.demands, icon: Briefcase },
    { id: 'legal', label: t.mobileNav.legal, icon: Scale },
    { id: 'contact', label: t.mobileNav.contact, icon: Phone },
  ];

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t-2 border-[#27272a] shadow-[0_-8px_28px_rgba(0,0,0,0.85)]"
    >
      <div className="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            mode === 'public' && activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateSection(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative min-h-[58px] px-1 py-2 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#18181b] text-white'
                  : 'text-[#A1A1AA] hover:text-white active:bg-[#121212]'
              }`}
            >
              {isActive && (
                <span
                  className="absolute top-0 inset-x-3 h-[3px] bg-[#FF5500] shadow-[0_0_10px_#FF5500]"
                  aria-hidden="true"
                />
              )}
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? 'text-[#FF5500]' : 'text-[#FF5500]/75'
                }`}
                aria-hidden="true"
              />
              <span className="font-brutal-mono text-[10px] font-bold leading-none truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
