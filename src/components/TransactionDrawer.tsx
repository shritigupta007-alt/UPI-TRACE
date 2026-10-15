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
      <div className="fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 inset-y-0 z-50 w-full max-w-md lg:max-w-lg bg-white border-l border-slate-200 flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ArrowDownLeft size={18} className="text-ieee" />
            <span className="text-sm font-bold text-navy">Transaction Detail</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6 space-y-6">
          {/* ID & amount */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-slate-500">{tx.id}</span>
              <button onClick={copyRef} className="flex items-center justify-center h-6 w-6 rounded text-slate-400 hover:text-ieee transition-colors">
                {copied ? <CheckCircle2 size={13} className="text-emerald" /> : <Copy size={13} />}
              </button>
            </div>
            <div className="font-serif-heading text-3xl font-bold text-navy tabular-nums mb-1">{formatCurrency(tx.amount)}</div>
            <div className="text-xs text-slate-500 font-medium">{formatDateTime(tx.timestamp)}</div>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <ResponseBadge status={tx.responseStatus} />
            <FlagBadge level={tx.flagLevel} />
            {tx.verified ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald/20 bg-emerald-light">
                <ShieldCheck size={12} /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-amber-dark font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber/30 bg-amber-soft">
                <ShieldAlert size={12} /> Unverified
              </span>
            )}
          </div>

          {/* Sender info */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Sender</div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {tx.senderName.includes('Ltd') || tx.senderName.includes('Enterprise') || tx.senderName.includes('Infra') || tx.senderName.includes('Logistics') || tx.senderName.includes('Transport') || tx.senderName.includes('Construction') || tx.senderName.includes('Biz') || tx.senderName.includes('Trade') ? (
                    <Building2 size={15} className="text-slate-400" />
                  ) : (
                    <User size={15} className="text-slate-400" />
                  )}
                  <span className="text-sm font-semibold text-navy">{tx.senderName}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">{tx.senderVpa}</div>
              </div>
              <RiskIndicator risk={tx.senderRisk} />
            </div>
          </div>

          {/* Context */}
          <div className="space-y-2.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Transaction Context</div>
            <div className="grid grid-cols-2 gap-3">
              <ContextItem label="Relationship" value={tx.context.relation} />
              <ContextItem label="Occasion" value={tx.context.occasion} />
              <ContextItem label="Prior Contact" value={tx.context.priorContact ? 'Yes' : 'No'} />
              <ContextItem label="Declared Purpose" value={tx.context.declaredPurpose || 'None declared'} />
            </div>
          </div>

          {/* Flag reason */}
          {tx.flagReason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="text-[10px] text-red-700 uppercase tracking-wider font-bold mb-1">Flag Reason</div>
              <div className="text-xs text-red-800 leading-relaxed font-medium">{tx.flagReason}</div>
            </div>
          )}

          {/* Response */}
          <div className="space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Recipient Response</div>
            {tx.responseNote ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareText size={15} className="text-ieee" />
                  <span className="text-xs font-semibold text-navy">{tx.recipientName}</span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">&ldquo;{tx.responseNote}&rdquo;</p>
                {tx.respondedAt && (
                  <div className="text-[10px] text-slate-400 mt-2 font-medium">{formatDateTime(tx.respondedAt)}</div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-amber/30 bg-amber-soft/80 px-4 py-3">
                <span className="text-xs text-amber-900 font-medium">No response recorded yet.</span>
              </div>
            )}
          </div>

          {/* Audit trail */}
          <div className="space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Audit Trail ({tx.auditTrail.length} events)
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              {tx.auditTrail.map((ev, i) => (
                <div key={ev.id} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`h-2 w-2 rounded-full ${i === tx.auditTrail.length - 1 ? 'bg-ieee' : 'bg-slate-300'}`} />
                    {i < tx.auditTrail.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-xs font-semibold text-navy">{ev.action}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{ev.detail}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{formatDateTime(ev.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hash */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Hash size={14} className="text-slate-400" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Integrity Hash</span>
            </div>
            <code className="font-mono text-xs text-slate-700 block break-all bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">{tx.hash}</code>
          </div>
        </div>
      </div>
    </>
  );
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">{label}</div>
      <div className="text-xs text-slate-800 font-medium leading-snug">{value}</div>
    </div>
  );
}
