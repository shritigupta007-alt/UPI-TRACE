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
  { key: 'overview', label: 'Home', icon: LayoutDashboard, description: 'Your summary' },
  { key: 'transactions', label: 'Payments', icon: ArrowLeftRight, description: 'Money you received' },
  { key: 'response', label: 'Your replies', icon: MessageSquareText, description: 'What you told us' },
  { key: 'timeline', label: 'Timeline', icon: Clock3, description: 'What happened, in order' },
  { key: 'verification', label: 'Record check', icon: ShieldCheck, description: 'Proof nothing was changed' },
  { key: 'reports', label: 'Reports', icon: FileText, description: 'Summaries to share' },
  { key: 'privacy', label: 'Privacy', icon: Lock, description: 'How your data is kept' },
];

export default function Sidebar({ current, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-deep/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] flex-shrink-0
          bg-white border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-smooth
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <Logo size="md" />
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-navy transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <div className="px-2 mb-2 text-xs text-slate-400 font-semibold">
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
                        ? 'bg-brand-light text-brand'
                        : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className={active ? 'text-brand' : 'text-slate-400 group-hover:text-slate-600'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-tight">{item.label}</div>
                      <div className={`text-[0.6875rem] leading-tight mt-0.5 ${active ? 'text-brand/70' : 'text-slate-400'}`}>
                        {item.description}
                      </div>
                    </div>
                    {active && <div className="w-1 h-6 rounded-full bg-brand" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-slate-100">
          <div className="rounded-xl border border-amber/30 bg-amber-soft px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-soft" />
              <span className="text-xs text-amber-dark font-semibold">Practice mode</span>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Sample data only. No real payments or UPI IDs.
            </p>
          </div>
          <div className="mt-3 text-xs text-slate-400 text-center">
            Team ECHELON &middot; NFSU
          </div>
        </div>
      </aside>
    </>
  );
}
