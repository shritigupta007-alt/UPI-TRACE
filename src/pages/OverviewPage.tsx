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
      {/* ── NCEA-SSEM Inspired Navy Hero Banner ───────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-navy-hero border border-navy-light/40 shadow-xl p-7 lg:p-9 text-white">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/15 px-3 py-1 text-xs text-amber font-semibold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
                Demo Workspace Active
              </span>
              <span className="text-xs text-white/50 font-mono">v0.1.0 &middot; Prototype</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white leading-tight mb-4 tracking-tight">
              Consent &amp; Context Layer for Incoming UPI Payments
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
              UPI-TRACE preserves the recipient&apos;s declared response and transaction context in a
              timestamped audit trail. It does not determine whether a payment is bribery or replace
              judicial scrutiny.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('transactions')}
                className="group inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-md shadow-amber/25 transition-all duration-200 hover:brightness-105 active:scale-95"
              >
                <Play size={16} className="fill-navy-deep" />
                Launch Interactive Demo
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                <FileText size={16} />
                View Evidence Reports
              </button>
            </div>
          </div>

          {/* Stat panel in Hero */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
              <div className="bg-navy-deep/80 px-5 py-4">
                <div className="text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">Total Tracked Value</div>
                <div className="font-serif-heading text-2xl font-bold text-white tabular-nums">{formatCurrency(totalValue)}</div>
              </div>
              <div className="bg-navy-deep/80 px-5 py-4">
                <div className="text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">Flagged Value</div>
                <div className="font-serif-heading text-2xl font-bold text-red-400 tabular-nums">{formatCurrency(flaggedValue)}</div>
              </div>
              <div className="bg-navy-deep/80 px-5 py-4">
                <div className="text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">Integrity Verified</div>
                <div className="font-serif-heading text-2xl font-bold text-emerald-400 tabular-nums">
                  {allTransactions.filter((t) => t.verified).length}
                  <span className="text-white/40 text-lg font-normal">/{allTransactions.length}</span>
                </div>
              </div>
              <div className="bg-navy-deep/80 px-5 py-4">
                <div className="text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">Audit Events</div>
                <div className="font-serif-heading text-2xl font-bold text-amber tabular-nums">
                  {allTransactions.reduce((sum, t) => sum + t.auditTrail.length, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metric Stat Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Simulated Transactions"
          value={stats.total}
          icon={<ArrowLeftRight size={20} strokeWidth={2} />}
          accent="sage"
          trend={{ value: 'Last 7 days', direction: 'neutral' }}
          delay={0}
        />
        <StatCard
          label="Responses Recorded"
          value={stats.responsesRecorded}
          icon={<CheckCircle2 size={20} strokeWidth={2} />}
          accent="gold"
          trend={{ value: `${Math.round((stats.responsesRecorded / stats.total) * 100)}% response rate`, direction: 'up' }}
          delay={60}
        />
        <StatCard
          label="Awaiting Response"
          value={stats.awaitingResponse}
          icon={<Clock3 size={20} strokeWidth={2} />}
          accent="amber"
          trend={{ value: 'Action required', direction: 'neutral' }}
          delay={120}
        />
        <StatCard
          label="Flagged for Review"
          value={stats.flaggedForReview}
          icon={<Flag size={20} strokeWidth={2} />}
          accent="red"
          trend={{ value: 'High priority', direction: 'down' }}
          delay={180}
        />
      </div>

      {/* ── Main Content Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <div>
              <h2 className="font-serif-heading text-lg font-semibold text-navy">Recent Transactions</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Latest incoming payments &amp; responses</p>
            </div>
            <button
              onClick={() => onNavigate('transactions')}
              className="text-sm text-ieee hover:text-ieee-dark transition-colors font-semibold flex items-center gap-1"
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

        {/* Activity Feed */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <h2 className="font-serif-heading text-lg font-semibold text-navy">Activity Feed</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Real-time workspace events</p>
          </div>
          <div className="px-6 py-5 max-h-[420px] overflow-y-auto scrollbar-thin">
            <ActivityFeed items={activityFeed} limit={8} />
          </div>
        </div>
      </div>

      {/* ── Distribution & Pending Action ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif-heading text-lg font-semibold text-navy">Response Status Distribution</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">How recipients have engaged</p>
            </div>
            <button
              onClick={() => onNavigate('response')}
              className="text-sm text-ieee hover:text-ieee-dark transition-colors font-semibold flex items-center gap-1"
            >
              Manage <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-3.5">
            {[
              { label: 'Recorded', count: responseBreakdown.recorded, color: 'bg-emerald', text: 'text-emerald' },
              { label: 'Acknowledged', count: responseBreakdown.acknowledged, color: 'bg-ieee', text: 'text-ieee' },
              { label: 'Declined & Returned', count: responseBreakdown.declined, color: 'bg-amber', text: 'text-amber-dark' },
              { label: 'Pending', count: responseBreakdown.pending, color: 'bg-red-500', text: 'text-red-600' },
            ].map((row) => {
              const pct = (row.count / stats.total) * 100;
              return (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{row.label}</span>
                    <span className={`text-sm font-bold tabular-nums ${row.text}`}>{row.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${row.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif-heading text-lg font-semibold text-navy">Awaiting Response</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Transactions needing attention</p>
            </div>
            <span className="inline-flex items-center justify-center h-7 px-3 rounded-full border border-amber/30 bg-amber-soft text-amber-dark text-xs font-semibold">
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
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:border-ieee/40 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200 text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-navy truncate">{tx.senderName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{tx.id} &middot; {formatCurrency(tx.amount)}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ResponseBadge status={tx.responseStatus} size="xs" />
                      <ArrowUpRight size={14} className="text-slate-400 group-hover:text-ieee transition-colors" />
                    </div>
                  </button>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShieldCheck size={32} className="text-emerald/50 mb-2" />
              <p className="text-sm text-slate-500">All transactions have been addressed.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Disclaimer Footer ────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong className="text-navy font-semibold">Disclaimer:</strong> UPI-TRACE is a prototype
          consent-and-context layer. It preserves the recipient&apos;s declared response and relevant transaction
          context in a timestamped audit trail. It does not determine whether a payment is bribery and does not
          replace judicial scrutiny. All data shown is fictional and for demonstration purposes only.
        </p>
      </div>
    </div>
  );
}
