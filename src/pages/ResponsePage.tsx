import type { Transaction } from '@/types';
import { transactions as allTransactions } from '@/data/demoData';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { ResponseBadge, RiskIndicator } from '@/components/Badges';
import { MessageSquareText, Clock3, CheckCircle2, XCircle } from 'lucide-react';

interface ResponsePageProps {
  onSelectTransaction: (tx: Transaction) => void;
}

export default function ResponsePage({ onSelectTransaction }: ResponsePageProps) {
  const pending = allTransactions.filter((t) => t.responseStatus === 'pending');
  const responded = allTransactions.filter((t) => t.responseStatus !== 'pending');

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-alert-amber/15 bg-alert-amber/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <Clock3 size={18} className="text-alert-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-ivory-500/70 leading-relaxed">
              When an unsolicited payment arrives, the recipient can record a formal declaration —
              acknowledging, declining, or annotating the transfer with context. This response is
              timestamped and appended to the audit trail.
            </p>
          </div>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h3 className="font-serif-heading text-lg text-ivory-500 mb-3">
            Awaiting Response <span className="text-alert-amber text-sm font-sans">({pending.length})</span>
          </h3>
          <div className="space-y-3">
            {pending.map((tx) => (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full group flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4 rounded-xl border border-alert-amber/15 bg-alert-amber/5 hover:bg-alert-amber/8 hover:border-alert-amber/25 transition-all duration-200 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm font-medium text-ivory-500 truncate">{tx.senderName}</span>
                    <RiskIndicator risk={tx.senderRisk} />
                  </div>
                  <div className="text-[0.6875rem] text-ivory-500/35 font-mono">{tx.id} &middot; {tx.senderVpa}</div>
                  {tx.flagReason && (
                    <div className="text-[0.75rem] text-alert-amber/70 mt-1.5">{tx.flagReason}</div>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-ivory-500 tabular-nums">{formatCurrency(tx.amount)}</div>
                    <div className="text-[0.6875rem] text-ivory-500/35 mt-0.5">{formatDateTime(tx.timestamp)}</div>
                  </div>
                  <ResponseBadge status={tx.responseStatus} size="xs" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-serif-heading text-lg text-ivory-500 mb-3">
          Recorded Responses <span className="text-sage-300 text-sm font-sans">({responded.length})</span>
        </h3>
        <div className="space-y-3">
          {responded.map((tx) => {
            const isDeclined = tx.responseStatus === 'declined';
            const Icon = isDeclined ? XCircle : CheckCircle2;
            return (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full group flex flex-col lg:flex-row gap-4 px-5 py-4 rounded-xl border border-ivory-500/6 bg-graphite-800/30 hover:border-ivory-500/12 transition-all duration-200 text-left"
              >
                <div className={`flex items-center justify-center h-9 w-9 rounded-lg border flex-shrink-0 ${
                  isDeclined ? 'border-gold-700/20 bg-gold-500/8 text-gold-300' : 'border-sage-700/20 bg-sage-500/8 text-sage-300'
                }`}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-sm font-medium text-ivory-500">{tx.senderName}</span>
                    <ResponseBadge status={tx.responseStatus} size="xs" />
                  </div>
                  <div className="text-sm text-ivory-500/55 leading-relaxed italic">
                    &ldquo;{tx.responseNote}&rdquo;
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-micro text-ivory-500/30">
                    <MessageSquareText size={11} />
                    <span className="font-mono">{tx.id}</span>
                    <span>&middot;</span>
                    <span>Responded {formatDateTime(tx.respondedAt || tx.timestamp)}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-ivory-500 tabular-nums">{formatCurrency(tx.amount)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
