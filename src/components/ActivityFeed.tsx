import type { ActivityFeedItem } from '@/types';
import { relativeTime } from '@/lib/utils';
import { ArrowDownLeft, MessageSquareText, Flag, ShieldCheck, FileText } from 'lucide-react';

const typeConfig: Record<ActivityFeedItem['type'], { icon: typeof ArrowDownLeft; color: string; bg: string; border: string; label: string }> = {
  incoming: { icon: ArrowDownLeft, color: 'text-ieee', bg: 'bg-ieee-light', border: 'border-ieee/20', label: 'Incoming' },
  response: { icon: MessageSquareText, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200', label: 'Response' },
  flag: { icon: Flag, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Flag' },
  verification: { icon: ShieldCheck, color: 'text-amber-dark', bg: 'bg-amber-soft', border: 'border-amber/30', label: 'Verification' },
  report: { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', label: 'Report' },
};

interface ActivityFeedProps {
  items: ActivityFeedItem[];
  limit?: number;
}

export default function ActivityFeed({ items, limit }: ActivityFeedProps) {
  const rows = limit ? items.slice(0, limit) : items;
  return (
    <div className="flow-root">
      <ul className="-mb-4">
        {rows.map((item, idx) => {
          const cfg = typeConfig[item.type];
          const Icon = cfg.icon;
          const isLast = idx === rows.length - 1;
          return (
            <li key={item.id} className="relative pb-4 pl-10">
              {!isLast && (
                <span className="absolute left-[15px] top-7 bottom-0 w-px bg-slate-200" aria-hidden />
              )}
              <span className={`absolute left-0 top-0.5 flex items-center justify-center h-8 w-8 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.color} shadow-sm`}>
                <Icon size={14} strokeWidth={2} />
              </span>
              <div className="text-sm font-medium text-slate-800 leading-snug">{item.summary}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${cfg.color}`}>{cfg.label}</span>
                <span className="text-xs text-slate-300">&middot;</span>
                <span className="text-[11px] text-slate-500 font-mono font-medium">{item.ref}</span>
                <span className="text-xs text-slate-300">&middot;</span>
                <span className="text-xs text-slate-400">{relativeTime(item.timestamp)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
