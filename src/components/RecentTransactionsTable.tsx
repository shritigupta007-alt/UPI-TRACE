import type { Transaction, PageKey } from '@/types';
import { formatCurrency, formatDateTime, relativeTime } from '@/lib/utils';
import { ResponseBadge, FlagBadge, RiskIndicator } from '@/components/Badges';
import { ArrowUpRight, Eye } from 'lucide-react';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  onSelect?: (tx: Transaction) => void;
  limit?: number;
  onNavigate?: (page: PageKey) => void;
}

export default function RecentTransactionsTable({ transactions, onSelect, limit, onNavigate }: RecentTransactionsTableProps) {
  const rows = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
            <th className="px-5 py-3">Transaction</th>
            <th className="px-5 py-3">Sender</th>
            <th className="px-5 py-3 text-right">Amount</th>
            <th className="px-5 py-3 hidden md:table-cell">Response</th>
            <th className="px-5 py-3 hidden lg:table-cell">Flag</th>
            <th className="px-5 py-3 hidden xl:table-cell">Captured</th>
            <th className="px-5 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((tx) => (
            <tr
              key={tx.id}
              className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
              onClick={() => onSelect?.(tx)}
            >
              <td className="px-5 py-3.5">
                <div className="font-mono text-xs font-semibold text-navy">{tx.id}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tx.upiRef}</div>
              </td>
              <td className="px-5 py-3.5">
                <div className="text-sm font-semibold text-slate-800 truncate max-w-[180px]">{tx.senderName}</div>
                <div className="mt-1">
                  <RiskIndicator risk={tx.senderRisk} />
                </div>
              </td>
              <td className="px-5 py-3.5 text-right">
                <div className="text-sm font-bold text-navy tabular-nums">{formatCurrency(tx.amount)}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5 tracking-wider">{tx.channel}</div>
              </td>
              <td className="px-5 py-3.5 hidden md:table-cell">
                <ResponseBadge status={tx.responseStatus} size="xs" />
              </td>
              <td className="px-5 py-3.5 hidden lg:table-cell">
                <FlagBadge level={tx.flagLevel} size="xs" />
              </td>
              <td className="px-5 py-3.5 hidden xl:table-cell">
                <div className="text-xs font-medium text-slate-700">{formatDateTime(tx.timestamp)}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{relativeTime(tx.timestamp)}</div>
              </td>
              <td className="px-5 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center justify-center h-7 w-7 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-ieee hover:border-ieee/40 shadow-sm transition-colors">
                    <Eye size={14} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {onNavigate && limit && transactions.length > limit && (
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Showing {limit} of {transactions.length} transactions
          </span>
          <button
            onClick={() => onNavigate('transactions')}
            className="flex items-center gap-1.5 text-xs text-ieee hover:text-ieee-dark transition-colors font-semibold"
          >
            View all transactions
            <ArrowUpRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
