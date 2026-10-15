import type { Transaction } from '@/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { ResponseBadge, FlagBadge, RiskIndicator } from '@/components/Badges';
import {
  X,
  ArrowDownLeft,
  ShieldCheck,
  ShieldAlert,
  Copy,
  CheckCircle2,
  Building2,
  User,
  MessageSquareText,
  Hash,
} from 'lucide-react';
import { useState } from 'react';

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDrawer({ transaction, onClose }: TransactionDrawerProps) {
  const [copied, setCopied] = useState(false);
  if (!transaction) return null;

  const tx = transaction;
  const copyRef = () => {
    navigator.clipboard?.writeText(tx.upiRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-charcoal-900/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 inset-y-0 z-50 w-full max-w-md lg:max-w-lg bg-charcoal-800 border-l border-ivory-500/8 flex flex-col shadow-elevated animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-500/5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ArrowDownLeft size={16} className="text-sage-500" />
            <span className="text-sm font-medium text-ivory-500">Transaction Detail</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-md text-ivory-500/40 hover:text-ivory-500 hover:bg-ivory-500/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-5 space-y-5">
          {/* ID & amount */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm text-ivory-500/80">{tx.id}</span>
              <button onClick={copyRef} className="flex items-center justify-center h-6 w-6 rounded text-ivory-500/30 hover:text-sage-300 transition-colors">
                {copied ? <CheckCircle2 size={12} className="text-sage-300" /> : <Copy size={12} />}
              </button>
            </div>
            <div className="font-serif-heading text-3xl text-ivory-500 tabular-nums mb-1">{formatCurrency(tx.amount)}</div>
            <div className="text-sm text-ivory-500/40">{formatDateTime(tx.timestamp)}</div>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <ResponseBadge status={tx.responseStatus} />
            <FlagBadge level={tx.flagLevel} />
            {tx.verified ? (
              <span className="inline-flex items-center gap-1 text-micro text-sage-300 uppercase tracking-wider px-2 py-1 rounded border border-sage-700/20 bg-sage-500/5">
                <ShieldCheck size={11} /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-micro text-alert-amber uppercase tracking-wider px-2 py-1 rounded border border-alert-amber/20 bg-alert-amber/5">
                <ShieldAlert size={11} /> Unverified
              </span>
            )}
          </div>

          {/* Sender info */}
          <div className="rounded-lg border border-ivory-500/6 bg-charcoal-900/40 p-4 space-y-3">
            <div className="text-micro text-ivory-500/30 uppercase tracking-wider font-medium">Sender</div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {tx.senderName.includes('Ltd') || tx.senderName.includes('Enterprise') || tx.senderName.includes('Infra') || tx.senderName.includes('Logistics') || tx.senderName.includes('Transport') || tx.senderName.includes('Construction') || tx.senderName.includes('Biz') || tx.senderName.includes('Trade') ? (
                    <Building2 size={14} className="text-ivory-500/40" />
                  ) : (
                    <User size={14} className="text-ivory-500/40" />
                  )}
                  <span className="text-sm font-medium text-ivory-500">{tx.senderName}</span>
                </div>
                <div className="text-sm text-ivory-500/50 font-mono mt-1">{tx.senderVpa}</div>
              </div>
              <RiskIndicator risk={tx.senderRisk} />
            </div>
          </div>

          {/* Context */}
          <div className="space-y-2.5">
            <div className="text-micro text-ivory-500/30 uppercase tracking-wider font-medium">Transaction Context</div>
            <div className="grid grid-cols-2 gap-3">
              <ContextItem label="Relationship" value={tx.context.relation} />
              <ContextItem label="Occasion" value={tx.context.occasion} />
              <ContextItem label="Prior Contact" value={tx.context.priorContact ? 'Yes' : 'No'} />
              <ContextItem label="Declared Purpose" value={tx.context.declaredPurpose || 'None declared'} />
            </div>
          </div>

          {/* Flag reason */}
          {tx.flagReason && (
            <div className="rounded-lg border border-alert-red/15 bg-alert-red/5 px-4 py-3">
              <div className="text-micro text-alert-red uppercase tracking-wider font-medium mb-1">Flag Reason</div>
              <div className="text-sm text-ivory-500/60">{tx.flagReason}</div>
            </div>
          )}

          {/* Response */}
          <div className="space-y-2">
            <div className="text-micro text-ivory-500/30 uppercase tracking-wider font-medium">Recipient Response</div>
            {tx.responseNote ? (
              <div className="rounded-lg border border-ivory-500/6 bg-charcoal-900/40 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareText size={14} className="text-sage-500" />
                  <span className="text-sm text-ivory-500/70">{tx.recipientName}</span>
                </div>
                <p className="text-sm text-ivory-500/60 italic leading-relaxed">&ldquo;{tx.responseNote}&rdquo;</p>
                {tx.respondedAt && (
                  <div className="text-micro text-ivory-500/30 mt-2">{formatDateTime(tx.respondedAt)}</div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-alert-amber/15 bg-alert-amber/5 px-4 py-3">
                <span className="text-sm text-alert-amber/80">No response recorded yet.</span>
              </div>
            )}
          </div>

          {/* Audit trail */}
          <div className="space-y-2">
            <div className="text-micro text-ivory-500/30 uppercase tracking-wider font-medium">
              Audit Trail ({tx.auditTrail.length} events)
            </div>
            <div className="rounded-lg border border-ivory-500/6 bg-charcoal-900/40 p-4 space-y-3">
              {tx.auditTrail.map((ev, i) => (
                <div key={ev.id} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`h-2 w-2 rounded-full ${i === tx.auditTrail.length - 1 ? 'bg-sage-500' : 'bg-ivory-500/20'}`} />
                    {i < tx.auditTrail.length - 1 && <div className="w-px flex-1 bg-ivory-500/8 my-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-sm text-ivory-500/80">{ev.action}</div>
                    <div className="text-[0.75rem] text-ivory-500/40 mt-0.5">{ev.detail}</div>
                    <div className="text-micro text-ivory-500/25 mt-1 font-mono">{formatDateTime(ev.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hash */}
          <div className="rounded-lg border border-ivory-500/6 bg-charcoal-900/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Hash size={14} className="text-ivory-500/40" />
              <span className="text-micro text-ivory-500/30 uppercase tracking-wider font-medium">Integrity Hash</span>
            </div>
            <code className="font-mono text-sm text-ivory-500/50 block break-all">{tx.hash}</code>
          </div>
        </div>
      </div>
    </>
  );
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-ivory-500/4 bg-charcoal-900/30 px-3 py-2">
      <div className="text-micro text-ivory-500/30 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm text-ivory-500/60 leading-snug">{value}</div>
    </div>
  );
}
