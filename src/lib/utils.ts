import type { Transaction } from '@/types';
import { transactions } from '@/data/demoData';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function relativeTime(iso: string): string {
  const now = new Date('2026-10-10T09:00:00+05:30');
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'just now';
}

export interface DashboardStats {
  total: number;
  responsesRecorded: number;
  awaitingResponse: number;
  flaggedForReview: number;
}

export function getDashboardStats(data: Transaction[] = transactions): DashboardStats {
  return {
    total: data.length,
    responsesRecorded: data.filter((t) => t.responseStatus === 'recorded' || t.responseStatus === 'acknowledged' || t.responseStatus === 'declined').length,
    awaitingResponse: data.filter((t) => t.responseStatus === 'pending').length,
    flaggedForReview: data.filter((t) => t.flagLevel === 'flagged' || t.flagLevel === 'review').length,
  };
}
