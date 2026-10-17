import { useState, useMemo } from 'react';
import type { Transaction } from '@/types';
import { transactions as allTransactions } from '@/data/demoData';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
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
    { key: 'pending', label: 'Waiting for reply' },
    { key: 'recorded', label: 'Replied' },
    { key: 'declined', label: 'Returned' },
    { key: 'acknowledged', label: 'Accepted' },
    { key: 'flagged', label: 'Needs attention' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm flex-1 max-w-md focus-within:border-ieee focus-within:ring-1 focus-within:ring-ieee/30 transition-all">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, UPI ID or payment ID"
            className="bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={14} className="text-slate-400 mr-1" />
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                filter === opt.key
                  ? 'bg-brand text-white border border-brand'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-navy'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h2 className="font-serif-heading text-lg font-semibold text-navy">All payments</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {filtered.length} of {allTransactions.length} transactions
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <ArrowDownLeft size={13} className="text-ieee" />
            Incoming only
          </div>
        </div>
        {filtered.length > 0 ? (
          <RecentTransactionsTable transactions={filtered} onSelect={onSelectTransaction} />
        ) : (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-slate-500">No transactions match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
