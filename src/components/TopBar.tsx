import { Menu, Search, Bell, ChevronRight } from 'lucide-react';

interface TopBarProps {
  pageTitle: string;
  pageBreadcrumb: string;
  onMenuClick: () => void;
}

export default function TopBar({ pageTitle, pageBreadcrumb, onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-navy/30 transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-micro text-muted-foreground uppercase tracking-wider font-mono">
              <span>{pageBreadcrumb}</span>
              <ChevronRight size={10} className="text-muted-foreground/50" />
              <span className="text-foreground/60">{pageTitle}</span>
            </div>
            <h1 className="font-serif-heading text-heading text-foreground mt-0.5 truncate">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50 w-56 lg:w-64">
            <Search size={15} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions, VPAs..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
            <kbd className="text-[0.625rem] font-mono text-muted-foreground border border-border rounded px-1 py-0.5">⌘K</kbd>
          </div>
          <button className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-navy/30 transition-colors">
            <Bell size={16} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-alert-red" />
          </button>
          <div className="flex items-center gap-2.5 pl-2 lg:pl-3 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-navy to-ieee flex items-center justify-center text-micro font-semibold text-white border border-navy/20">
              MS
            </div>
            <div className="hidden lg:block leading-tight">
              <div className="text-sm text-foreground font-medium">Adv. Meera Sharma</div>
              <div className="text-[0.6875rem] text-muted-foreground">Registered Recipient</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
