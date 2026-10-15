import { Menu, Search, Bell, ChevronRight } from 'lucide-react';

interface TopBarProps {
  pageTitle: string;
  pageBreadcrumb: string;
  onMenuClick: () => void;
}

export default function TopBar({ pageTitle, pageBreadcrumb, onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-charcoal-800/80 backdrop-blur-md border-b border-ivory-500/5">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-ivory-500/10 text-ivory-500/60 hover:text-ivory-500 hover:border-ivory-500/20 transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-micro text-ivory-500/30 uppercase tracking-wider font-mono">
              <span>{pageBreadcrumb}</span>
              <ChevronRight size={10} className="text-ivory-500/20" />
              <span className="text-ivory-500/50">{pageTitle}</span>
            </div>
            <h1 className="font-serif-heading text-heading text-ivory-500 mt-0.5 truncate">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-ivory-500/8 bg-graphite-800/40 w-56 lg:w-64">
            <Search size={15} className="text-ivory-500/30" />
            <input
              type="text"
              placeholder="Search transactions, VPAs..."
              className="bg-transparent text-sm text-ivory-500 placeholder:text-ivory-500/30 outline-none flex-1"
            />
            <kbd className="text-[0.625rem] font-mono text-ivory-500/25 border border-ivory-500/10 rounded px-1 py-0.5">⌘K</kbd>
          </div>
          <button className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-ivory-500/8 text-ivory-500/50 hover:text-ivory-500 hover:border-ivory-500/15 transition-colors">
            <Bell size={16} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-alert-red" />
          </button>
          <div className="flex items-center gap-2.5 pl-2 lg:pl-3 border-l border-ivory-500/8">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sage-700 to-graphite-600 flex items-center justify-center text-micro font-semibold text-ivory-500 border border-ivory-500/10">
              MS
            </div>
            <div className="hidden lg:block leading-tight">
              <div className="text-sm text-ivory-500 font-medium">Adv. Meera Sharma</div>
              <div className="text-[0.6875rem] text-ivory-500/40">Registered Recipient</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
