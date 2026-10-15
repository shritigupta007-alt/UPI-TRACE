import { useMemo } from 'react';
import { transactions as allTransactions } from '@/data/demoData';
import { formatDateTime } from '@/lib/utils';
import { Clock3, ArrowDownLeft, MessageSquareText, Flag, ShieldCheck, Eye } from 'lucide-react';

const actionIcon: Record<string, { icon: typeof Clock3; color: string; bg: string; border: string }> = {
  'Payment received': { icon: ArrowDownLeft, color: 'text-ieee', bg: 'bg-ieee-light', border: 'border-ieee/20' },
  'Context captured': { icon: Eye, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
  'Flagged': { icon: Flag, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  'Flagged for review': { icon: Flag, color: 'text-amber-dark', bg: 'bg-amber-soft', border: 'border-amber/30' },
  'Response recorded': { icon: MessageSquareText, color: 'text-emerald', bg: 'bg-emerald-light', border: 'border-emerald/20' },
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
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600 leading-relaxed">
          A unified chronological view of every audit event across all transactions — from initial
          payment receipt through context capture, flagging, and recipient response. Each event is
          cryptographically bound to its parent transaction via a content hash.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="font-serif-heading text-lg font-semibold text-navy">Unified Audit Timeline</h2>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">
            {allEvents.length} events across {allTransactions.length} transactions
          </p>
        </div>
        <div className="px-6 py-6 max-h-[640px] overflow-y-auto scrollbar-thin">
          <div className="flow-root">
            <ul className="-mb-4">
              {allEvents.map((ev, idx) => {
                const cfg = actionIcon[ev.action] || { icon: ShieldCheck, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' };
                const Icon = cfg.icon;
                const isLast = idx === allEvents.length - 1;
                return (
                  <li key={ev.id} className="relative pb-6 pl-12">
                    {!isLast && (
                      <span className="absolute left-[19px] top-8 bottom-0 w-px bg-slate-200" aria-hidden />
                    )}
                    <span className={`absolute left-0 top-1 flex items-center justify-center h-10 w-10 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.color} shadow-sm`}>
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-navy">{ev.action}</span>
                          <span className="text-xs text-slate-500 font-mono font-medium">{ev.txId}</span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">{ev.detail}</div>
                        <div className="text-[11px] text-slate-400 mt-1 font-medium">
                          Actor: <span className="text-slate-600 font-semibold">{ev.actor}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 font-mono whitespace-nowrap sm:text-right">
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
