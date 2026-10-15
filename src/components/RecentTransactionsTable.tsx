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
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-ivory-500/8 text-micro text-ivory-500/35 uppercase tracking-wider font-medium">
            <th className="px-4 py-3 font-medium">Transaction</th>
            <th className="px-4 py-3 font-medium">Sender</th>
            <th className="px-4 py-3 font-medium text-right">Amount</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Response</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Flag</th>
            <th className="px-4 py-3 font-medium hidden xl:table-cell">Captured</th>
            <th className="px-4 py-3 font-medium text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-500/4">
          {rows.map((tx) => (
            <tr
              key={tx.id}
              className="group hover:bg-graphite-800/30 transition-colors cursor-pointer"
              onClick={() => onSelect?.(tx)}
            >
              <td className="px-4 py-3.5">
                <div className="font-mono text-sm text-ivory-500/90">{tx.id}</div>
                <div className="text-[0.6875rem] text-ivory-500/35 font-mono mt-0.5">{tx.upiRef}</div>
              </td>
              <td className="px-4 py-3.5">
                <div className="text-sm text-ivory-500/80 truncate max-w-[180px]">{tx.senderName}</div>
                <div className="mt-1">
                  <RiskIndicator risk={tx.senderRisk} />
                </div>
              </td>
              <td className="px-4 py-3.5 text-right">
                <div className="text-sm font-semibold text-ivory-500 tabular-nums">{formatCurrency(tx.amount)}</div>
                <div className="text-[0.6875rem] text-ivory-500/35 uppercase mt-0.5">{tx.channel}</div>
              </td>
              <td className="px-4 py-3.5 hidden md:table-cell">
                <ResponseBadge status={tx.responseStatus} size="xs" />
              </td>
              <td className="px-4 py-3.5 hidden lg:table-cell">
                <FlagBadge level={tx.flagLevel} size="xs" />
              </td>
              <td className="px-4 py-3.5 hidden xl:table-cell">
                <div className="text-sm text-ivory-500/60">{formatDateTime(tx.timestamp)}</div>
                <div className="text-[0.6875rem] text-ivory-500/30 mt-0.5">{relativeTime(tx.timestamp)}</div>
              </td>
              <td className="px-4 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center justify-center h-7 w-7 rounded-md border border-ivory-500/10 text-ivory-500/40 hover:text-sage-300 hover:border-sage-700/30 transition-colors">
                    <Eye size={14} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {onNavigate && limit && transactions.length > limit && (
        <div className="px-4 py-3 border-t border-ivory-500/5 flex items-center justify-between">
          <span className="text-sm text-ivory-500/40">
            Showing {limit} of {transactions.length} transactions
          </span>
          <button
            onClick={() => onNavigate('transactions')}
            className="flex items-center gap-1.5 text-sm text-sage-300 hover:text-sage-100 transition-colors font-medium"
          >
            View all transactions
            <ArrowUpRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

