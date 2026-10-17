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
      <div className="rounded-xl border border-amber/30 bg-amber-soft/80 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Clock3 size={18} className="text-amber-dark flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              When an unsolicited payment arrives, the recipient can record a formal declaration —
              acknowledging, declining, or annotating the transfer with context. This response is
              timestamped and appended to the audit trail.
            </p>
          </div>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="font-serif-heading text-lg font-semibold text-navy mb-3">
            Waiting for your reply <span className="text-amber-dark text-sm font-sans font-medium">({pending.length})</span>
          </h2>
          <div className="space-y-3">
            {pending.map((tx) => (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full group flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4 rounded-xl border border-amber/30 bg-white hover:bg-amber-soft/30 hover:border-amber/50 shadow-sm transition-all duration-200 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm font-semibold text-navy truncate">{tx.senderName}</span>
                    <RiskIndicator risk={tx.senderRisk} />
                  </div>
                  <div className="text-xs text-slate-500 font-mono">{tx.id} &middot; {tx.senderVpa}</div>
                  {tx.flagReason && (
                    <div className="text-xs text-red-600 mt-1.5 font-medium">{tx.flagReason}</div>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-navy tabular-nums">{formatCurrency(tx.amount)}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{formatDateTime(tx.timestamp)}</div>
                  </div>
                  <ResponseBadge status={tx.responseStatus} size="xs" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-serif-heading text-lg font-semibold text-navy mb-3">
          Recorded Responses <span className="text-emerald text-sm font-sans font-medium">({responded.length})</span>
        </h2>
        <div className="space-y-3">
          {responded.map((tx) => {
            const isDeclined = tx.responseStatus === 'declined';
            const Icon = isDeclined ? XCircle : CheckCircle2;
            return (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full group flex flex-col lg:flex-row gap-4 px-5 py-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm transition-all duration-200 text-left"
              >
                <div className={`flex items-center justify-center h-10 w-10 rounded-lg border flex-shrink-0 ${
                  isDeclined ? 'border-amber/30 bg-amber-soft text-amber-dark' : 'border-emerald/20 bg-emerald-light text-emerald'
                }`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-navy">{tx.senderName}</span>
                    <ResponseBadge status={tx.responseStatus} size="xs" />
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{tx.responseNote}&rdquo;
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <MessageSquareText size={13} className="text-slate-400" />
                    <span className="font-mono">{tx.id}</span>
                    <span>&middot;</span>
                    <span>Responded {formatDateTime(tx.respondedAt || tx.timestamp)}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-navy tabular-nums">{formatCurrency(tx.amount)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
