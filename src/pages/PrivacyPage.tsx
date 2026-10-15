import { Lock, Eye, Download, Shield, Clock3, FileText } from 'lucide-react';
import { transactions as allTransactions } from '@/data/demoData';

export default function PrivacyPage() {
  const dataPoints = [
    { label: 'Sender VPA', stored: true, encrypted: true, retention: '7 years', purpose: 'Transaction identification & risk assessment' },
    { label: 'Sender Name', stored: true, encrypted: true, retention: '7 years', purpose: 'Sender attribution for audit trail' },
    { label: 'Transaction Amount', stored: true, encrypted: true, retention: '7 years', purpose: 'Contextual evidence record' },
    { label: 'Recipient Declaration', stored: true, encrypted: true, retention: '7 years', purpose: 'Recipient consent & context preservation' },
    { label: 'Audit Event Log', stored: true, encrypted: true, retention: '7 years', purpose: 'Tamper-evident integrity chain' },
    { label: 'Content Hash', stored: true, encrypted: false, retention: 'Permanent', purpose: 'Integrity verification' },
    { label: 'Sender Contact Details', stored: false, encrypted: false, retention: 'N/A', purpose: 'Not collected — sender is not a registered user' },
    { label: 'Payment Gateway Credentials', stored: false, encrypted: false, retention: 'N/A', purpose: 'Not stored — no payment integration in prototype' },
  ];

  const accessLog = allTransactions.slice(0, 5).map((tx, i) => ({
    id: `ACC-${String(i + 1).padStart(3, '0')}`,
    actor: 'Adv. Meera Sharma',
    action: i === 0 ? 'Viewed transaction detail' : i === 1 ? 'Exported evidence report' : 'Viewed audit timeline',
    timestamp: tx.timestamp,
    ip: '10.x.x.x (anonymized)',
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-5">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-sage-700/20 bg-sage-500/8 text-sage-500 mb-4">
            <Lock size={18} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-heading text-lg text-ivory-500 mb-1">Data Encryption</h3>
          <p className="text-sm text-ivory-500/45 leading-relaxed">
            All stored declarations and transaction context are encrypted at rest. Only the registered
            recipient can decrypt and view their own records.
          </p>
        </div>
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-5">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-gold-700/20 bg-gold-500/8 text-gold-500 mb-4">
            <Shield size={18} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-heading text-lg text-ivory-500 mb-1">Access Control</h3>
          <p className="text-sm text-ivory-500/45 leading-relaxed">
            Access is restricted to the recipient. Evidentiary disclosure requires explicit consent or
            a valid judicial order — logged and timestamped.
          </p>
        </div>
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-5">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-ivory-500/10 bg-graphite-700/40 text-ivory-500/50 mb-4">
            <Clock3 size={18} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-heading text-lg text-ivory-500 mb-1">Retention Policy</h3>
          <p className="text-sm text-ivory-500/45 leading-relaxed">
            Audit records are retained for 7 years to align with evidentiary requirements. Hashes are
            retained permanently for long-term integrity verification.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-ivory-500/5">
          <h3 className="font-serif-heading text-lg text-ivory-500">Data Inventory</h3>
          <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">
            What UPI-TRACE stores, how it is protected, and why
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ivory-500/8 text-micro text-ivory-500/35 uppercase tracking-wider font-medium">
                <th className="px-5 py-3">Data Point</th>
                <th className="px-5 py-3">Stored</th>
                <th className="px-5 py-3 hidden md:table-cell">Encrypted</th>
                <th className="px-5 py-3 hidden lg:table-cell">Retention</th>
                <th className="px-5 py-3 hidden xl:table-cell">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-500/4">
              {dataPoints.map((dp) => (
                <tr key={dp.label} className="hover:bg-charcoal-800/20 transition-colors">
                  <td className="px-5 py-3.5 text-sm text-ivory-500/80">{dp.label}</td>
                  <td className="px-5 py-3.5">
                    {dp.stored ? (
                      <span className="inline-flex items-center gap-1 text-micro text-sage-300 uppercase tracking-wider">
                        <Eye size={11} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-micro text-ivory-500/30 uppercase tracking-wider">
                        <Lock size={11} /> Never
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {dp.encrypted ? (
                      <span className="text-micro text-sage-300 uppercase tracking-wider">AES-256</span>
                    ) : (
                      <span className="text-micro text-ivory-500/30 uppercase tracking-wider">N/A</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-ivory-500/50">{dp.retention}</td>
                  <td className="px-5 py-3.5 hidden xl:table-cell text-sm text-ivory-500/45">{dp.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-ivory-500/5 flex items-center justify-between">
          <div>
            <h3 className="font-serif-heading text-lg text-ivory-500">Access Log</h3>
            <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">Who accessed what, and when</p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-sm text-sage-300 hover:text-sage-100 transition-colors font-medium">
            <Download size={14} />
            Export log
          </button>
        </div>
        <div className="divide-y divide-ivory-500/4">
          {accessLog.map((entry) => (
            <div key={entry.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-charcoal-800/20 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md border border-ivory-500/8 bg-charcoal-800/60 text-ivory-500/40 flex-shrink-0">
                  <FileText size={13} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-ivory-500/70 truncate">{entry.action}</div>
                  <div className="text-micro text-ivory-500/30 font-mono mt-0.5">{entry.id} &middot; {entry.ip}</div>
                </div>
              </div>
              <div className="text-micro text-ivory-500/35 whitespace-nowrap">{entry.actor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
