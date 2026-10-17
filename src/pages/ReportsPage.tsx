import { transactions as allTransactions } from '@/data/demoData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, Download, FileCheck2, Calendar } from 'lucide-react';

interface ReportsPageProps {
  onNavigate: (page: 'overview') => void;
}

export default function ReportsPage({ onNavigate: _onNavigate }: ReportsPageProps) {
  const reports = [
    {
      id: 'RPT-2026-W40',
      title: 'Weekly Evidence Summary — Week 40',
      period: '29 Sep – 05 Oct 2026',
      generated: '2026-10-05T20:00:00+05:30',
      txCount: 5,
      totalValue: allTransactions.slice(7, 12).reduce((s, t) => s + t.amount, 0),
      responses: allTransactions.slice(7, 12).filter((t) => t.responseStatus !== 'pending').length,
      status: 'ready',
    },
    {
      id: 'RPT-2026-W41',
      title: 'Weekly Evidence Summary — Week 41',
      period: '06 Oct – 12 Oct 2026',
      generated: '2026-10-10T09:00:00+05:30',
      txCount: 7,
      totalValue: allTransactions.slice(0, 7).reduce((s, t) => s + t.amount, 0),
      responses: allTransactions.slice(0, 7).filter((t) => t.responseStatus !== 'pending').length,
      status: 'draft',
    },
    {
      id: 'RPT-2026-FLAG',
      title: 'Flagged Transactions Review — Oct 2026',
      period: '01 Oct – 10 Oct 2026',
      generated: '2026-10-10T08:30:00+05:30',
      txCount: allTransactions.filter((t) => t.flagLevel === 'flagged' || t.flagLevel === 'review').length,
      totalValue: allTransactions.filter((t) => t.flagLevel === 'flagged' || t.flagLevel === 'review').reduce((s, t) => s + t.amount, 0),
      responses: allTransactions.filter((t) => (t.flagLevel === 'flagged' || t.flagLevel === 'review') && t.responseStatus !== 'pending').length,
      status: 'ready',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex-1">
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate exportable evidence summaries combining transaction records, recipient declarations,
            and audit trail hashes. Reports are formatted for evidentiary submission and include
            integrity verification metadata.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-dark shadow-sm transition-all active:scale-95">
          <FileText size={16} />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {reports.map((rpt) => (
          <div
            key={rpt.id}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-ieee/20 bg-ieee-light text-ieee">
                <FileText size={18} strokeWidth={2} />
              </div>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                rpt.status === 'ready'
                  ? 'border-emerald/20 bg-emerald-light text-emerald'
                  : 'border-amber/30 bg-amber-soft text-amber-dark'
              }`}>
                {rpt.status === 'ready' ? <FileCheck2 size={12} /> : <Calendar size={12} />}
                {rpt.status === 'ready' ? 'Ready' : 'Draft'}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mb-1">{rpt.id}</div>
            <h2 className="font-serif-heading text-lg font-semibold text-navy leading-snug mb-1">{rpt.title}</h2>
            <p className="text-xs text-slate-500 mb-4">{rpt.period}</p>

            <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">TXs</div>
                <div className="text-sm font-bold text-navy tabular-nums">{rpt.txCount}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">Value</div>
                <div className="text-sm font-bold text-navy tabular-nums">{formatCurrency(rpt.totalValue)}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">Responses</div>
                <div className="text-sm font-bold text-navy tabular-nums">{rpt.responses}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Generated {formatDate(rpt.generated)}
              </span>
              <button
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-all ${
                  rpt.status === 'ready'
                    ? 'border-slate-200 bg-white text-navy hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                    : 'border-transparent text-slate-300 cursor-not-allowed'
                }`}
                disabled={rpt.status !== 'ready'}
              >
                <Download size={13} />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
