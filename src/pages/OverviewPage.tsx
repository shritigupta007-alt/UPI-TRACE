import type { PageKey, Transaction } from '@/types';
import { transactions as allTransactions, activityFeed } from '@/data/demoData';
import { getDashboardStats, formatCurrency } from '@/lib/utils';
import StatCard from '@/components/StatCard';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import ActivityFeed from '@/components/ActivityFeed';
import { ResponseBadge } from '@/components/Badges';
import {
  ArrowLeftRight,
  CheckCircle2,
  Clock3,
  Flag,
  Play,
  ArrowUpRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (page: PageKey) => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export default function OverviewPage({ onNavigate, onSelectTransaction }: OverviewPageProps) {
  const stats = getDashboardStats(allTransactions);
  const responseBreakdown = {
    recorded: allTransactions.filter((t) => t.responseStatus === 'recorded').length,
    acknowledged: allTransactions.filter((t) => t.responseStatus === 'acknowledged').length,
    declined: allTransactions.filter((t) => t.responseStatus === 'declined').length,
    pending: allTransactions.filter((t) => t.responseStatus === 'pending').length,
  };
  const totalValue = allTransactions.reduce((sum, t) => sum + t.amount, 0);
  const flaggedValue = allTransactions
    .filter((t) => t.flagLevel === 'flagged' || t.flagLevel === 'review')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Hero / Demo banner */}
      <div className="relative overflow-hidden rounded-2xl border border-ivory-500/6 bg-gradient-to-br from-graphite-800/60 via-charcoal-700/40 to-charcoal-800 p-6 lg:p-8">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sage-500/5 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-700/25 bg-gold-500/8 px-2.5 py-1 text-micro text-gold-300 uppercase tracking-wider font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse-soft" />
                Demo Workspace Active
              </span>
              <span className="text-micro text-ivory-500/30 font-mono">v0.1.0 &middot; Prototype</span>
            </div>
            <h2 className="font-serif-heading text-display text-ivory-500 leading-tight mb-3">
              Consent &amp; Context Layer for Incoming UPI Payments
            </h2>
            <p className="text-sm text-ivory-500/50 leading-relaxed mb-5">
              UPI-TRACE preserves the recipient's declared response and transaction context in a
              timestamped audit trail. It does not determine whether a payment is bribery or replace
              judicial scrutiny.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('transactions')}
                className="group inline-flex items-center gap-2 rounded-lg bg-sage-500 px-5 py-2.5 text-sm font-medium text-charcoal-900 transition-all duration-200 hover:bg-sage-300 hover:shadow-card"
              >
                <Play size={15} className="fill-charcoal-900" />
                Launch Interactive Demo
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="inline-flex items-center gap-2 rounded-lg border border-ivory-500/10 px-4 py-2.5 text-sm text-ivory-500/70 hover:text-ivory-500 hover:border-ivory-500/20 transition-colors"
              >
                <FileText size={15} />
                View Evidence Reports
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 hidden lg:block">
            <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-ivory-500/8 bg-ivory-500/4">
              <div className="bg-charcoal-800/80 px-5 py-4">
                <div className="text-micro text-ivory-500/35 uppercase tracking-wider mb-1">Total Tracked Value</div>
                <div className="font-serif-heading text-2xl text-ivory-500 tabular-nums">{formatCurrency(totalValue)}</div>
              </div>
              <div className="bg-charcoal-800/80 px-5 py-4">
                <div className="text-micro text-ivory-500/35 uppercase tracking-wider mb-1">Flagged Value</div>
                <div className="font-serif-heading text-2xl text-alert-red tabular-nums">{formatCurrency(flaggedValue)}</div>
              </div>
              <div className="bg-charcoal-800/80 px-5 py-4">
                <div className="text-micro text-ivory-500/35 uppercase tracking-wider mb-1">Integrity Verified</div>
                <div className="font-serif-heading text-2xl text-sage-300 tabular-nums">
                  {allTransactions.filter((t) => t.verified).length}<span className="text-ivory-500/30 text-lg">/{allTransactions.length}</span>
                </div>
              </div>
              <div className="bg-charcoal-800/80 px-5 py-4">
                <div className="text-micro text-ivory-500/35 uppercase tracking-wider mb-1">Audit Events</div>
                <div className="font-serif-heading text-2xl text-ivory-500 tabular-nums">
                  {allTransactions.reduce((sum, t) => sum + t.auditTrail.length, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Simulated Transactions"
          value={stats.total}
          icon={<ArrowLeftRight size={20} strokeWidth={1.5} />}
          accent="sage"
          trend={{ value: 'Last 7 days', direction: 'neutral' }}
          delay={0}
        />
        <StatCard
          label="Responses Recorded"
          value={stats.responsesRecorded}
          icon={<CheckCircle2 size={20} strokeWidth={1.5} />}
          accent="gold"
          trend={{ value: `${Math.round((stats.responsesRecorded / stats.total) * 100)}% response rate`, direction: 'up' }}
          delay={60}
        />
        <StatCard
          label="Awaiting Response"
          value={stats.awaitingResponse}
          icon={<Clock3 size={20} strokeWidth={1.5} />}
          accent="amber"
          trend={{ value: 'Action required', direction: 'neutral' }}
          delay={120}
        />
        <StatCard
          label="Flagged for Review"
          value={stats.flaggedForReview}
          icon={<Flag size={20} strokeWidth={1.5} />}
          accent="red"
          trend={{ value: 'High priority', direction: 'down' }}
          delay={180}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent transactions — spans 2 cols */}
        <div className="xl:col-span-2 rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-500/5">
            <div>
              <h3 className="font-serif-heading text-lg text-ivory-500">Recent Transactions</h3>
              <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">Latest incoming payments &amp; responses</p>
            </div>
            <button
              onClick={() => onNavigate('transactions')}
              className="text-sm text-sage-300 hover:text-sage-100 transition-colors font-medium flex items-center gap-1"
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <RecentTransactionsTable
            transactions={allTransactions}
            onSelect={onSelectTransaction}
            limit={6}
            onNavigate={onNavigate}
          />
        </div>

        {/* Activity feed */}
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 overflow-hidden animate-fade-in">
          <div className="px-5 py-4 border-b border-ivory-500/5">
            <h3 className="font-serif-heading text-lg text-ivory-500">Activity Feed</h3>
            <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">Real-time workspace events</p>
          </div>
          <div className="px-5 py-5 max-h-[420px] overflow-y-auto scrollbar-thin">
            <ActivityFeed items={activityFeed} limit={8} />
          </div>
        </div>
      </div>

      {/* Response status overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif-heading text-lg text-ivory-500">Response Status Distribution</h3>
              <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">How recipients have engaged</p>
            </div>
            <button
              onClick={() => onNavigate('response')}
              className="text-sm text-sage-300 hover:text-sage-100 transition-colors font-medium flex items-center gap-1"
            >
              Manage <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Recorded', count: responseBreakdown.recorded, color: 'bg-sage-500', text: 'text-sage-300' },
              { label: 'Acknowledged', count: responseBreakdown.acknowledged, color: 'bg-sage-700', text: 'text-sage-300' },
              { label: 'Declined & Returned', count: responseBreakdown.declined, color: 'bg-gold-500', text: 'text-gold-300' },
              { label: 'Pending', count: responseBreakdown.pending, color: 'bg-alert-amber', text: 'text-alert-amber' },
            ].map((row) => {
              const pct = (row.count / stats.total) * 100;
              return (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-ivory-500/70">{row.label}</span>
                    <span className={`text-sm font-medium tabular-nums ${row.text}`}>{row.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-ivory-500/5 overflow-hidden">
                    <div
                      className={`h-full ${row.color} rounded-full transition-all duration-700 ease-smooth`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-ivory-500/6 bg-graphite-800/30 p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif-heading text-lg text-ivory-500">Awaiting Response</h3>
              <p className="text-micro text-ivory-500/35 uppercase tracking-wider mt-0.5">Transactions needing attention</p>
            </div>
            <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-full border border-alert-amber/25 bg-alert-amber/10 text-alert-amber text-micro font-semibold">
              {stats.awaitingResponse} pending
            </span>
          </div>
          {allTransactions.filter((t) => t.responseStatus === 'pending').length > 0 ? (
            <div className="space-y-2.5">
              {allTransactions
                .filter((t) => t.responseStatus === 'pending')
                .slice(0, 4)
                .map((tx) => (
                  <button
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-ivory-500/6 hover:border-ivory-500/12 bg-charcoal-800/40 hover:bg-charcoal-700/40 transition-all duration-200 text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-ivory-500/90 truncate">{tx.senderName}</div>
                      <div className="text-[0.6875rem] text-ivory-500/35 font-mono mt-0.5">{tx.id} &middot; {formatCurrency(tx.amount)}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ResponseBadge status={tx.responseStatus} size="xs" />
                      <ArrowUpRight size={14} className="text-ivory-500/30 group-hover:text-sage-300 transition-colors" />
                    </div>
                  </button>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShieldCheck size={32} className="text-sage-500/50 mb-2" />
              <p className="text-sm text-ivory-500/40">All transactions have been addressed.</p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer footer */}
      <div className="rounded-lg border border-ivory-500/4 bg-charcoal-900/40 px-5 py-4">
        <p className="text-[0.75rem] text-ivory-500/30 leading-relaxed">
          <strong className="text-ivory-500/45 font-semibold">Disclaimer:</strong> UPI-TRACE is a prototype
          consent-and-context layer. It preserves the recipient's declared response and relevant transaction
          context in a timestamped audit trail. It does not determine whether a payment is bribery and does not
          replace judicial scrutiny. All data shown is fictional and for demonstration purposes only.
        </p>
      </div>
    </div>
  );
}
