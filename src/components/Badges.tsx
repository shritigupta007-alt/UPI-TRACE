import type { ResponseStatus, FlagLevel, SenderRisk } from '@/types';

const responseConfig: Record<ResponseStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  pending: { label: 'Pending', dot: 'bg-status-pending', text: 'text-alert-amber', bg: 'bg-alert-amber/10', border: 'border-alert-amber/20' },
  recorded: { label: 'Recorded', dot: 'bg-status-recorded', text: 'text-sage-300', bg: 'bg-sage-500/10', border: 'border-sage-700/30' },
  declined: { label: 'Declined', dot: 'bg-status-declined', text: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-700/30' },
  acknowledged: { label: 'Acknowledged', dot: 'bg-status-acknowledged', text: 'text-sage-300', bg: 'bg-sage-500/10', border: 'border-sage-700/30' },
};

const flagConfig: Record<FlagLevel, { label: string; text: string; bg: string; border: string }> = {
  none: { label: 'Clear', text: 'text-sage-300', bg: 'bg-sage-500/5', border: 'border-sage-700/15' },
  review: { label: 'Under Review', text: 'text-alert-amber', bg: 'bg-alert-amber/10', border: 'border-alert-amber/20' },
  flagged: { label: 'Flagged', text: 'text-alert-red', bg: 'bg-alert-red/10', border: 'border-alert-red/25' },
};

const riskConfig: Record<SenderRisk, { label: string; text: string }> = {
  unknown: { label: 'Unknown', text: 'text-ivory-500/50' },
  low: { label: 'Low Risk', text: 'text-sage-300' },
  elevated: { label: 'Elevated', text: 'text-alert-amber' },
  high: { label: 'High Risk', text: 'text-alert-red' },
};

export function ResponseBadge({ status, size = 'sm' }: { status: ResponseStatus; size?: 'sm' | 'xs' }) {
  const cfg = responseConfig[status];
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[0.625rem]' : 'px-2.5 py-1 text-micro';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.text} ${pad} font-medium uppercase tracking-wider`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function FlagBadge({ level, size = 'sm' }: { level: FlagLevel; size?: 'sm' | 'xs' }) {
  const cfg = flagConfig[level];
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[0.625rem]' : 'px-2.5 py-1 text-micro';
  return (
    <span className={`inline-flex items-center rounded border ${cfg.border} ${cfg.bg} ${cfg.text} ${pad} font-medium uppercase tracking-wider`}>
      {cfg.label}
    </span>
  );
}

export function RiskIndicator({ risk }: { risk: SenderRisk }) {
  const cfg = riskConfig[risk];
  const dots: Record<SenderRisk, number> = { unknown: 0, low: 1, elevated: 2, high: 3 };
  const active = dots[risk];
  const dotColor = risk === 'high' ? 'bg-alert-red' : risk === 'elevated' ? 'bg-alert-amber' : risk === 'low' ? 'bg-sage-500' : 'bg-ivory-500/20';
  return (
    <span className={`inline-flex items-center gap-1.5 ${cfg.text}`}>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1 w-1 rounded-full ${i < active ? dotColor : 'bg-ivory-500/15'}`}
          />
        ))}
      </span>
      <span className="text-micro uppercase tracking-wider font-medium">{cfg.label}</span>
    </span>
  );
}
