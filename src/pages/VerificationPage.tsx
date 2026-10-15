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
        <div className="rounded-xl border border-sage-700/15 bg-sage-500/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-sage-500" />
            <span className="text-micro text-sage-300 uppercase tracking-wider font-medium">Verified</span>
          </div>
          <div className="font-serif-heading text-2xl text-ivory-500">{verified}</div>
        </div>
        <div className="rounded-xl border border-alert-amber/15 bg-alert-amber/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={18} className="text-alert-amber" />
            <span className="text-micro text-alert-amber uppercase tracking-wider font-medium">Pending Verification</span>
          </div>
          <div className="font-serif-heading text-2xl text-ivory-500">{unverified}</div>
        </div>
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-ivory-500/40" />
            <span className="text-micro text-ivory-500/40 uppercase tracking-wider font-medium">Total Audit Events</span>
          </div>
          <div className="font-serif-heading text-2xl text-ivory-500">
            {allTransactions.reduce((s, t) => s + t.auditTrail.length, 0)}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-ivory-500/5">
          <h3 className="font-serif-heading text-lg text-ivory-500">Integrity Hashes</h3>
          <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">
            SHA-256 content hashes binding each audit trail to its transaction
          </p>
        </div>
        <div className="divide-y divide-ivory-500/4">
          {allTransactions.map((tx) => (
            <div key={tx.id} className="px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-3 hover:bg-charcoal-800/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-sm font-medium text-ivory-500">{tx.id}</span>
                  {tx.verified ? (
                    <span className="inline-flex items-center gap-1 text-micro text-sage-300 uppercase tracking-wider">
                      <ShieldCheck size={11} /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-micro text-alert-amber uppercase tracking-wider">
                      <ShieldAlert size={11} /> Pending
                    </span>
                  )}
                </div>
                <div className="text-[0.6875rem] text-ivory-500/35">{tx.senderName} &middot; {formatDateTime(tx.timestamp)}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <code className="font-mono text-sm text-ivory-500/50 bg-charcoal-900/50 px-3 py-1.5 rounded border border-ivory-500/6">
                  {tx.hash}
                </code>
                <button
                  onClick={() => copyHash(tx.hash)}
                  className="flex items-center justify-center h-8 w-8 rounded-md border border-ivory-500/8 text-ivory-500/40 hover:text-sage-300 hover:border-sage-700/25 transition-colors"
                >
                  {copied === tx.hash ? <CheckCircle2 size={14} className="text-sage-300" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-ivory-500/4 bg-charcoal-900/40 px-5 py-4">
        <p className="text-[0.75rem] text-ivory-500/30 leading-relaxed">
          Each transaction's audit trail is hashed at capture time. Any subsequent modification to the
          stored events would produce a different hash, detectable during verification. In a production
          deployment, hashes would be anchored to an external tamper-evident ledger.
        </p>
      </div>
    </div>
  );
}
