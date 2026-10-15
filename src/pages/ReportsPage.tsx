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
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="rounded-lg border border-ivory-500/4 bg-graphite-800/30 px-5 py-4 flex-1">
          <p className="text-sm text-ivory-500/50 leading-relaxed">
            Generate exportable evidence summaries combining transaction records, recipient declarations,
            and audit trail hashes. Reports are formatted for evidentiary submission and include
            integrity verification metadata.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-sage-500 px-4 py-2.5 text-sm font-medium text-charcoal-900 hover:bg-sage-300 transition-colors">
          <FileText size={15} />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {reports.map((rpt) => (
          <div
            key={rpt.id}
            className="group rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-5 hover:border-ivory-500/12 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-ivory-500/8 bg-charcoal-800/60 text-ivory-500/40 group-hover:text-sage-300 group-hover:border-sage-700/20 transition-colors">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <span className={`inline-flex items-center gap-1.5 text-micro uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${
                rpt.status === 'ready'
                  ? 'border-sage-700/25 bg-sage-500/8 text-sage-300'
                  : 'border-alert-amber/20 bg-alert-amber/8 text-alert-amber'
              }`}>
                {rpt.status === 'ready' ? <FileCheck2 size={10} /> : <Calendar size={10} />}
                {rpt.status === 'ready' ? 'Ready' : 'Draft'}
              </span>
            </div>
            <div className="text-micro text-ivory-500/30 font-mono mb-1">{rpt.id}</div>
            <h3 className="font-serif-heading text-lg text-ivory-500 leading-tight mb-1">{rpt.title}</h3>
            <p className="text-sm text-ivory-500/40 mb-4">{rpt.period}</p>

            <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-ivory-500/5">
              <div>
                <div className="text-micro text-ivory-500/30 uppercase tracking-wider mb-0.5">TXs</div>
                <div className="text-sm font-semibold text-ivory-500 tabular-nums">{rpt.txCount}</div>
              </div>
              <div>
                <div className="text-micro text-ivory-500/30 uppercase tracking-wider mb-0.5">Value</div>
                <div className="text-sm font-semibold text-ivory-500 tabular-nums">{formatCurrency(rpt.totalValue)}</div>
              </div>
              <div>
                <div className="text-micro text-ivory-500/30 uppercase tracking-wider mb-0.5">Responses</div>
                <div className="text-sm font-semibold text-ivory-500 tabular-nums">{rpt.responses}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-micro text-ivory-500/30">
                Generated {formatDate(rpt.generated)}
              </span>
              <button
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  rpt.status === 'ready' ? 'text-sage-300 hover:text-sage-100' : 'text-ivory-500/30'
                }`}
                disabled={rpt.status !== 'ready'}
              >
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
