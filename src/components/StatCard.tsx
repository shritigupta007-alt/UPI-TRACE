import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' };
  accent?: 'sage' | 'gold' | 'amber' | 'red';
  delay?: number;
}

const accentMap = {
  sage: {
    icon: 'text-ieee',
    bg: 'bg-ieee-light',
    border: 'border-ieee/20',
  },
  gold: {
    icon: 'text-amber-dark',
    bg: 'bg-amber-soft',
    border: 'border-amber/30',
  },
  amber: {
    icon: 'text-amber-dark',
    bg: 'bg-amber-soft',
    border: 'border-amber/30',
  },
  red: {
    icon: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export default function StatCard({ label, value, icon, trend, accent = 'sage', delay = 0 }: StatCardProps) {
  const ac = accentMap[accent];
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`flex items-center justify-center h-10 w-10 rounded-lg border ${ac.border} ${ac.bg} ${ac.icon}`}>
            {icon}
          </div>
          {trend && (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                trend.direction === 'up'
                  ? 'bg-emerald-light text-emerald border-emerald/20'
                  : trend.direction === 'down'
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
        <div className="font-serif-heading text-3xl font-bold text-navy leading-none mb-1.5 tabular-nums">
          {value}
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</div>
      </div>
    </div>
  );
}
