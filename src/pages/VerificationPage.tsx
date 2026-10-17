import { transactions as allTransactions } from '@/data/demoData';
import { formatDateTime } from '@/lib/utils';
import { ShieldCheck, ShieldAlert, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function VerificationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopied(hash);
    setTimeout(() => setCopied(null), 2000);
  };

  const verified = allTransactions.filter((t) => t.verified).length;
  const unverified = allTransactions.filter((t) => !t.verified).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-emerald/20 bg-emerald-light/60 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-emerald" />
            <span className="text-xs text-emerald-800 font-semibold">Verified</span>
          </div>
          <div className="font-serif-heading text-3xl font-bold text-navy">{verified}</div>
        </div>
        <div className="rounded-xl border border-amber/30 bg-amber-soft/70 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={18} className="text-amber-dark" />
            <span className="text-xs text-amber-900 font-semibold">Not checked yet</span>
          </div>
          <div className="font-serif-heading text-3xl font-bold text-navy">{unverified}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-ieee" />
            <span className="text-xs text-slate-500 font-semibold">Total Audit Events</span>
          </div>
          <div className="font-serif-heading text-3xl font-bold text-navy">
            {allTransactions.reduce((s, t) => s + t.auditTrail.length, 0)}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="font-serif-heading text-lg font-semibold text-navy">Record fingerprints</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            SHA-256 content hashes binding each audit trail to its transaction
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {allTransactions.map((tx) => (
            <div key={tx.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3 hover:bg-slate-50/70 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-sm font-semibold text-navy">{tx.id}</span>
                  {tx.verified ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald font-semibold">
                      <ShieldCheck size={13} /> Checked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-dark font-semibold">
                      <ShieldAlert size={13} /> Pending
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium">{tx.senderName} &middot; {formatDateTime(tx.timestamp)}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <code className="font-mono text-xs text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                  {tx.hash}
                </code>
                <button
                  onClick={() => copyHash(tx.hash)}
                  className="flex items-center justify-center h-8 w-8 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-ieee hover:border-ieee/40 shadow-sm transition-colors"
                >
                  {copied === tx.hash ? <CheckCircle2 size={14} className="text-emerald" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong className="text-navy font-semibold">Audit Guarantee:</strong> Each transaction&apos;s audit trail is hashed at capture time. Any subsequent modification to the
          stored events would produce a different hash, detectable during verification. In a production
          deployment, hashes would be anchored to an external tamper-evident ledger.
        </p>
      </div>
    </div>
  );
}
