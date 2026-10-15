import type { PageKey } from '@/types';
import Logo from './Logo';
import {
  LayoutDashboard,
  ArrowLeftRight,
  MessageSquareText,
  Clock3,
  ShieldCheck,
  FileText,
  Lock,
  X,
} from 'lucide-react';

interface SidebarProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard; description: string }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Dashboard summary' },
  { key: 'transactions', label: 'Transactions', icon: ArrowLeftRight, description: 'Incoming payment log' },
  { key: 'response', label: 'Recipient Response', icon: MessageSquareText, description: 'Declarations & notes' },
  { key: 'timeline', label: 'Evidence Timeline', icon: Clock3, description: 'Chronological audit trail' },
  { key: 'verification', label: 'Integrity Verification', icon: ShieldCheck, description: 'Hash verification' },
  { key: 'reports', label: 'Evidence Reports', icon: FileText, description: 'Exportable summaries' },
  { key: 'privacy', label: 'Privacy & Access', icon: Lock, description: 'Data retention controls' },
];

export default function Sidebar({ current, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-deep/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] flex-shrink-0
          bg-navy-deep border-r border-white/[0.06]
          flex flex-col
          transition-transform duration-300 ease-smooth
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <Logo size="md" />
          <button
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <div className="px-2 mb-2 text-micro text-white/30 uppercase tracking-[0.15em] font-medium">
            Workspace
          </div>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => onNavigate(item.key)}
                    className={`
                      group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 ease-smooth text-left
                      ${active
                        ? 'bg-amber/[0.14] text-white shadow-subtle'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className={active ? 'text-amber' : 'text-white/40 group-hover:text-white/60'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-tight">{item.label}</div>
                      <div className={`text-[0.6875rem] leading-tight mt-0.5 ${active ? 'text-white/50' : 'text-white/25'}`}>
                        {item.description}
                      </div>
                    </div>
                    {active && <div className="w-1 h-6 rounded-full bg-amber" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="rounded-lg border border-amber/30 bg-amber/[0.08] px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-soft" />
              <span className="text-micro text-amber uppercase tracking-wider font-medium">Demo Mode</span>
            </div>
            <p className="text-[0.6875rem] text-white/40 leading-snug">
              Simulated data only. No live payments or real UPI IDs.
            </p>
          </div>
          <div className="mt-3 text-[0.625rem] text-white/25 text-center font-mono tracking-wider">
            Team ECHELON &middot; NFSU
          </div>
        </div>
      </aside>
    </>
  );
}
