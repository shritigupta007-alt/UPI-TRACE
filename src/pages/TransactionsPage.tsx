import { useState, useMemo } from 'react';
import type { Transaction } from '@/types';
import { transactions as allTransactions } from '@/data/demoData';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import { ResponseBadge, FlagBadge, RiskIndicator } from '@/components/Badges';
import { Search, Filter, ArrowDownLeft } from 'lucide-react';

interface TransactionsPageProps {
  onSelectTransaction: (tx: Transaction) => void;
}

type FilterStatus = 'all' | 'pending' | 'recorded' | 'declined' | 'acknowledged' | 'flagged';

export default function TransactionsPage({ onSelectTransaction }: TransactionsPageProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filtered = useMemo(() => {
    return allTransactions.filter((tx) => {
      const matchesSearch =
        tx.senderName.toLowerCase().includes(search.toLowerCase()) ||
        tx.senderVpa.toLowerCase().includes(search.toLowerCase()) ||
        tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.upiRef.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ? true :
        filter === 'flagged' ? tx.flagLevel === 'flagged' || tx.flagLevel === 'review' :
        tx.responseStatus === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const filterOptions: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'recorded', label: 'Recorded' },
    { key: 'declined', label: 'Declined' },
    { key: 'acknowledged', label: 'Acknowledged' },
    { key: 'flagged', label: 'Flagged' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-ivory-500/8 bg-graphite-800/40 flex-1 max-w-md">
          <Search size={16} className="text-ivory-500/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender name, VPA, or transaction ID..."
            className="bg-transparent text-sm text-ivory-500 placeholder:text-ivory-500/30 outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={14} className="text-ivory-500/30 mr-1" />
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === opt.key
                  ? 'bg-sage-500/15 text-sage-300 border border-sage-700/25'
                  : 'text-ivory-500/45 hover:text-ivory-500/70 border border-transparent hover:border-ivory-500/8'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-ivory-500/5 flex items-center justify-between">
          <div>
            <h3 className="font-serif-heading text-lg text-ivory-500">Transaction Log</h3>
            <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">
              {filtered.length} of {allTransactions.length} transactions
            </p>
          </div>
          <div className="flex items-center gap-2 text-micro text-ivory-500/30 uppercase tracking-wider">
            <ArrowDownLeft size={12} className="text-sage-500" />
            Incoming only
          </div>
        </div>
        {filtered.length > 0 ? (
          <RecentTransactionsTable transactions={filtered} onSelect={onSelectTransaction} />
        ) : (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-ivory-500/40">No transactions match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
