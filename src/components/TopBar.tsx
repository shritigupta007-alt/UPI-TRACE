import { Menu, Search, Bell, ChevronRight, ArrowLeft } from 'lucide-react';

interface TopBarProps {
  pageTitle: string;
  pageBreadcrumb: string;
  onMenuClick: () => void;
  onBack?: () => void;
}

export default function TopBar({ pageTitle, pageBreadcrumb, onMenuClick, onBack }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 text-slate-600 hover:text-navy hover:border-navy/30 transition-colors"
          >
            <Menu size={18} />
          </button>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-dark transition-colors">
              <ArrowLeft size={14} /> PhonePe
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="uppercase font-semibold text-slate-400">{pageBreadcrumb}</span>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="text-navy font-semibold">{pageTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 w-56 lg:w-64 focus-within:border-ieee focus-within:ring-1 focus-within:ring-ieee/30 transition-all">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search payments"
              className="bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none flex-1"
            />
            <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1 bg-white">⌘K</kbd>
          </div>
          <button className="relative flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:text-navy hover:border-navy/30 transition-colors">
            <Bell size={15} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-amber/30">
              MS
            </div>
            <div className="hidden lg:block leading-tight">
              <div className="text-xs font-semibold text-navy">Adv. Meera Sharma</div>
              <div className="text-[10px] text-slate-500">Payment receiver</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
