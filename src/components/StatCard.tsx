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
  sage: { icon: 'text-sage-500', bg: 'bg-sage-500/8', border: 'border-sage-700/20', glow: 'from-sage-500/5' },
  gold: { icon: 'text-gold-500', bg: 'bg-gold-500/8', border: 'border-gold-700/20', glow: 'from-gold-500/5' },
  amber: { icon: 'text-alert-amber', bg: 'bg-alert-amber/8', border: 'border-alert-amber/20', glow: 'from-alert-amber/5' },
  red: { icon: 'text-alert-red', bg: 'bg-alert-red/8', border: 'border-alert-red/20', glow: 'from-alert-red/5' },
};

export default function StatCard({ label, value, icon, trend, accent = 'sage', delay = 0 }: StatCardProps) {
  const ac = accentMap[accent];
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-ivory-500/6 bg-graphite-800/40 p-5 transition-all duration-300 ease-smooth hover:border-ivory-500/12 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${ac.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`flex items-center justify-center h-10 w-10 rounded-lg border ${ac.border} ${ac.bg} ${ac.icon}`}>
            {icon}
          </div>
          {trend && (
            <span className={`text-micro font-mono ${
              trend.direction === 'up' ? 'text-sage-300' : trend.direction === 'down' ? 'text-alert-red' : 'text-ivory-500/40'
            }`}>
              {trend.value}
            </span>
          )}
        </div>
        <div className="font-serif-heading text-3xl text-ivory-500 leading-none mb-1.5">
          {value}
        </div>
        <div className="text-sm text-ivory-500/50">{label}</div>
      </div>
    </div>
  );
}
