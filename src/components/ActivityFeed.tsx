import type { ActivityFeedItem } from '@/types';
import { relativeTime } from '@/lib/utils';
import { ArrowDownLeft, MessageSquareText, Flag, ShieldCheck, FileText } from 'lucide-react';

const typeConfig: Record<ActivityFeedItem['type'], { icon: typeof ArrowDownLeft; color: string; bg: string; border: string; label: string }> = {
  incoming: { icon: ArrowDownLeft, color: 'text-sage-300', bg: 'bg-sage-500/8', border: 'border-sage-700/20', label: 'Incoming' },
  response: { icon: MessageSquareText, color: 'text-ivory-500/70', bg: 'bg-graphite-700/40', border: 'border-ivory-500/8', label: 'Response' },
  flag: { icon: Flag, color: 'text-alert-red', bg: 'bg-alert-red/8', border: 'border-alert-red/20', label: 'Flag' },
  verification: { icon: ShieldCheck, color: 'text-gold-300', bg: 'bg-gold-500/8', border: 'border-gold-700/20', label: 'Verification' },
  report: { icon: FileText, color: 'text-ivory-500/60', bg: 'bg-graphite-700/30', border: 'border-ivory-500/6', label: 'Report' },
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
                <span className="absolute left-[15px] top-7 bottom-0 w-px bg-ivory-500/8" aria-hidden />
              )}
              <span className={`absolute left-0 top-0.5 flex items-center justify-center h-8 w-8 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.color}`}>
                <Icon size={14} strokeWidth={1.5} />
              </span>
              <div className="text-sm text-ivory-500/75 leading-snug">{item.summary}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-micro uppercase tracking-wider font-medium ${cfg.color}`}>{cfg.label}</span>
                <span className="text-micro text-ivory-500/25">&middot;</span>
                <span className="text-micro text-ivory-500/30 font-mono">{item.ref}</span>
                <span className="text-micro text-ivory-500/25">&middot;</span>
                <span className="text-micro text-ivory-500/30">{relativeTime(item.timestamp)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
