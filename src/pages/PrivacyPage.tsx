import { Lock, Eye, Download, Shield, Clock3, FileText } from 'lucide-react';
import { transactions as allTransactions } from '@/data/demoData';

export default function PrivacyPage() {
  const dataPoints = [
    { label: 'Sender UPI ID', stored: true, encrypted: true, retention: '7 years', purpose: 'Transaction identification & risk assessment' },
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-ieee/20 bg-ieee-light text-ieee mb-4">
            <Lock size={18} strokeWidth={2} />
          </div>
          <h2 className="font-serif-heading text-lg font-semibold text-navy mb-1">Data Encryption</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            All stored declarations and transaction context are encrypted at rest. Only the registered
            recipient can decrypt and view their own records.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-amber/30 bg-amber-soft text-amber-dark mb-4">
            <Shield size={18} strokeWidth={2} />
          </div>
          <h2 className="font-serif-heading text-lg font-semibold text-navy mb-1">Access Control</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            Access is restricted to the recipient. Evidentiary disclosure requires explicit consent or
            a valid judicial order — logged and timestamped.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 mb-4">
            <Clock3 size={18} strokeWidth={2} />
          </div>
          <h2 className="font-serif-heading text-lg font-semibold text-navy mb-1">Retention Policy</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            Audit records are retained for 7 years to align with evidentiary requirements. Hashes are
            retained permanently for long-term integrity verification.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="font-serif-heading text-lg font-semibold text-navy">Data Inventory</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            What UPI-TRACE stores, how it is protected, and why
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] text-slate-500 font-semibold">
                <th className="px-6 py-3">Data Point</th>
                <th className="px-6 py-3">Stored</th>
                <th className="px-6 py-3 hidden md:table-cell">Encrypted</th>
                <th className="px-6 py-3 hidden lg:table-cell">Retention</th>
                <th className="px-6 py-3 hidden xl:table-cell">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataPoints.map((dp) => (
                <tr key={dp.label} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">{dp.label}</td>
                  <td className="px-6 py-3.5">
                    {dp.stored ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald font-semibold">
                        <Eye size={12} /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Lock size={12} /> Never
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 hidden md:table-cell">
                    {dp.encrypted ? (
                      <span className="text-xs font-mono font-semibold text-ieee bg-ieee-light px-2 py-0.5 rounded border border-ieee/20">AES-256</span>
                    ) : (
                      <span className="text-xs text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 hidden lg:table-cell text-xs font-medium text-slate-600">{dp.retention}</td>
                  <td className="px-6 py-3.5 hidden xl:table-cell text-xs text-slate-500">{dp.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h2 className="font-serif-heading text-lg font-semibold text-navy">Access Log</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Who accessed what, and when</p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs text-ieee hover:text-ieee-dark transition-colors font-semibold">
            <Download size={13} />
            Export log
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {accessLog.map((entry) => (
            <div key={entry.id} className="px-6 py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 flex-shrink-0">
                  <FileText size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{entry.action}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{entry.id} &middot; {entry.ip}</div>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-600 whitespace-nowrap">{entry.actor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
