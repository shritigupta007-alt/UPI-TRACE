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
      <div className="relative overflow-hidden rounded-3xl bg-navy-hero p-7 lg:p-10 text-white shadow-xl shadow-brand/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
              Got money from someone you don&apos;t know? Put your side on record.
            </h1>
            <p className="text-base text-white/85 leading-relaxed mb-6">
              UPI-TRACE saves what you say about a payment, with the date and time. It does not decide
              whether a payment is wrong, and it does not replace a court.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('response')}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand shadow-md transition active:scale-95 hover:bg-brand-light"
              >
                <Clock3 size={16} />
                Reply to {stats.awaitingResponse} waiting {stats.awaitingResponse === 1 ? 'payment' : 'payments'}
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <FileText size={16} />
                See reports
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full lg:w-[360px] flex-shrink-0">
            {[
              { l: 'Money received', v: formatCurrency(totalValue) },
              { l: 'Needs a closer look', v: formatCurrency(flaggedValue) },
              { l: 'Records checked', v: `${allTransactions.filter((t) => t.verified).length} of ${allTransactions.length}` },
              { l: 'Events saved', v: String(allTransactions.reduce((sum, t) => sum + t.auditTrail.length, 0)) },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl bg-white/12 border border-white/20 px-4 py-3.5 backdrop-blur">
                <div className="text-xs text-white/70 mb-1">{x.l}</div>
                <div className="text-xl font-extrabold tabular-nums">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy mb-4">How it works</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: ArrowLeftRight, t: 'A payment arrives', d: 'We note who sent it, how much, and whether you have dealt with them before.' },
            { icon: CheckCircle2, t: 'You reply', d: 'Say if you know the sender, accept it, or return it. Your words are saved as you wrote them.' },
            { icon: ShieldCheck, t: 'The record is sealed', d: 'A digital fingerprint is added, so any later change to the record can be spotted.' },
          ].map((s, n) => (
            <li key={s.t} className="flex gap-3.5 rounded-xl bg-brand-light/60 p-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-white"><s.icon size={18} /></span>
              <div>
                <div className="text-sm font-bold text-navy">Step {n + 1}: {s.t}</div>
                <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Metric Stat Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Payments received"
          value={stats.total}
          icon={<ArrowLeftRight size={20} strokeWidth={2} />}
          accent="sage"
          trend={{ value: 'This week', direction: 'neutral' }}
          delay={0}
        />
        <StatCard
          label="Replied"
          value={stats.responsesRecorded}
          icon={<CheckCircle2 size={20} strokeWidth={2} />}
          accent="gold"
          trend={{ value: `${Math.round((stats.responsesRecorded / stats.total) * 100)}% done`, direction: 'up' }}
          delay={60}
        />
        <StatCard
          label="Waiting for your reply"
          value={stats.awaitingResponse}
          icon={<Clock3 size={20} strokeWidth={2} />}
          accent="amber"
          trend={{ value: 'Reply soon', direction: 'neutral' }}
          delay={120}
        />
        <StatCard
          label="Needs a closer look"
          value={stats.flaggedForReview}
          icon={<Flag size={20} strokeWidth={2} />}
          accent="red"
          trend={{ value: 'Look first', direction: 'down' }}
          delay={180}
        />
      </div>

      {/* ── Main Content Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent payments Table */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <div>
              <h2 className="font-serif-heading text-lg font-semibold text-navy">Recent payments</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Newest payments and your replies</p>
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

        {/* Latest activity */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <h2 className="font-serif-heading text-lg font-semibold text-navy">Latest activity</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">What just happened</p>
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
              <h2 className="font-serif-heading text-lg font-semibold text-navy">How you've replied</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Your replies so far</p>
            </div>
            <button
              onClick={() => onNavigate('response')}
              className="text-sm text-ieee hover:text-ieee-dark transition-colors font-semibold flex items-center gap-1"
            >
              See replies <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-3.5">
            {[
              { label: 'Replied', count: responseBreakdown.recorded, color: 'bg-emerald', text: 'text-emerald' },
              { label: 'Accepted', count: responseBreakdown.acknowledged, color: 'bg-ieee', text: 'text-ieee' },
              { label: 'Returned to sender', count: responseBreakdown.declined, color: 'bg-amber', text: 'text-amber-dark' },
              { label: 'Waiting for reply', count: responseBreakdown.pending, color: 'bg-red-500', text: 'text-red-600' },
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
              <h2 className="font-serif-heading text-lg font-semibold text-navy">Waiting for your reply</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Payments waiting on you</p>
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
