import { useMemo } from 'react';
import { transactions as allTransactions } from '@/data/demoData';
import { formatDateTime } from '@/lib/utils';
import { Clock3, ArrowDownLeft, MessageSquareText, Flag, ShieldCheck, Eye } from 'lucide-react';

const actionIcon: Record<string, { icon: typeof Clock3; color: string }> = {
  'Payment received': { icon: ArrowDownLeft, color: 'text-sage-300' },
  'Context captured': { icon: Eye, color: 'text-ivory-500/50' },
  'Flagged': { icon: Flag, color: 'text-alert-red' },
  'Flagged for review': { icon: Flag, color: 'text-alert-amber' },
  'Response recorded': { icon: MessageSquareText, color: 'text-gold-300' },
};

export default function TimelinePage() {
  const allEvents = useMemo(() => {
    return allTransactions
      .flatMap((tx) =>
        tx.auditTrail.map((ev) => ({
          ...ev,
          txId: tx.id,
          senderName: tx.senderName,
          amount: tx.amount,
        }))
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-ivory-500/4 bg-graphite-800/30 px-5 py-4">
        <p className="text-sm text-ivory-500/50 leading-relaxed">
          A unified chronological view of every audit event across all transactions — from initial
          payment receipt through context capture, flagging, and recipient response. Each event is
          cryptographically bound to its parent transaction via a content hash.
        </p>
      </div>

      <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-ivory-500/5">
          <h3 className="font-serif-heading text-lg text-ivory-500">Unified Audit Timeline</h3>
          <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">
            {allEvents.length} events across {allTransactions.length} transactions
          </p>
        </div>
        <div className="px-5 py-5 max-h-[600px] overflow-y-auto scrollbar-thin">
          <div className="flow-root">
            <ul className="-mb-4">
              {allEvents.map((ev, idx) => {
                const cfg = actionIcon[ev.action] || { icon: ShieldCheck, color: 'text-ivory-500/40' };
                const Icon = cfg.icon;
                const isLast = idx === allEvents.length - 1;
                return (
                  <li key={ev.id} className="relative pb-5 pl-12">
                    {!isLast && (
                      <span className="absolute left-[19px] top-8 bottom-0 w-px bg-ivory-500/6" aria-hidden />
                    )}
                    <span className={`absolute left-0 top-1 flex items-center justify-center h-9 w-9 rounded-full border border-ivory-500/8 bg-charcoal-800 ${cfg.color}`}>
                      <Icon size={15} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-ivory-500">{ev.action}</span>
                          <span className="text-micro text-ivory-500/30 font-mano">{ev.txId}</span>
                        </div>
                        <div className="text-sm text-ivory-500/50 mt-0.5 leading-snug">{ev.detail}</div>
                        <div className="text-micro text-ivory-500/30 mt-1">
                          Actor: <span className="text-ivory-500/45">{ev.actor}</span>
                        </div>
                      </div>
                      <div className="text-micro text-ivory-500/35 font-mono whitespace-nowrap sm:text-right">
                        {formatDateTime(ev.timestamp)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
