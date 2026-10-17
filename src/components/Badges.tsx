import type { ResponseStatus, FlagLevel, SenderRisk } from '@/types';

const responseConfig: Record<ResponseStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  pending: {
    label: 'Waiting for reply',
    dot: 'bg-amber-500',
    text: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  recorded: {
    label: 'Replied',
    dot: 'bg-emerald',
    text: 'text-emerald-800',
    bg: 'bg-emerald-light',
    border: 'border-emerald/20',
  },
  declined: {
    label: 'Returned',
    dot: 'bg-amber-700',
    text: 'text-amber-900',
    bg: 'bg-amber-100',
    border: 'border-amber-300',
  },
  acknowledged: {
    label: 'Accepted',
    dot: 'bg-ieee',
    text: 'text-ieee-dark',
    bg: 'bg-ieee-light',
    border: 'border-ieee/20',
  },
};

const flagConfig: Record<FlagLevel, { label: string; text: string; bg: string; border: string }> = {
  none: {
    label: 'All clear',
    text: 'text-emerald-800',
    bg: 'bg-emerald-light',
    border: 'border-emerald/20',
  },
  review: {
    label: 'Check this',
    text: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  flagged: {
    label: 'Needs attention',
    text: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

const riskConfig: Record<SenderRisk, { label: string; text: string }> = {
  unknown: { label: 'Unknown sender', text: 'text-slate-500' },
  low: { label: 'Low risk', text: 'text-emerald' },
  elevated: { label: 'Medium risk', text: 'text-amber-dark' },
  high: { label: 'High risk', text: 'text-red-600' },
};

export function ResponseBadge({ status, size = 'sm' }: { status: ResponseStatus; size?: 'sm' | 'xs' }) {
  const cfg = responseConfig[status];
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.text} ${pad} font-semibold`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function FlagBadge({ level, size = 'sm' }: { level: FlagLevel; size?: 'sm' | 'xs' }) {
  const cfg = flagConfig[level];
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center rounded border ${cfg.border} ${cfg.bg} ${cfg.text} ${pad} font-semibold`}>
      {cfg.label}
    </span>
  );
}

export function RiskIndicator({ risk }: { risk: SenderRisk }) {
  const cfg = riskConfig[risk];
  const dots: Record<SenderRisk, number> = { unknown: 0, low: 1, elevated: 2, high: 3 };
  const active = dots[risk];
  const dotColor = risk === 'high' ? 'bg-red-500' : risk === 'elevated' ? 'bg-amber-500' : risk === 'low' ? 'bg-emerald' : 'bg-slate-300';
  return (
    <span className={`inline-flex items-center gap-1.5 ${cfg.text}`}>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i < active ? dotColor : 'bg-slate-200'}`}
          />
        ))}
      </span>
      <span className="text-[10px] font-semibold">{cfg.label}</span>
    </span>
  );
}
