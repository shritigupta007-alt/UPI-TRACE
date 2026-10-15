export type ResponseStatus = 'pending' | 'recorded' | 'declined' | 'acknowledged';
export type FlagLevel = 'none' | 'review' | 'flagged';
export type SenderRisk = 'unknown' | 'low' | 'elevated' | 'high';
export type TransactionChannel = 'upi' | 'imps' | 'neft';

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  detail: string;
}

export interface Transaction {
  id: string;
  upiRef: string;
  senderVpa: string;
  senderName: string;
  senderRisk: SenderRisk;
  amount: number;
  channel: TransactionChannel;
  timestamp: string;
  recipientVpa: string;
  recipientName: string;
  responseStatus: ResponseStatus;
  responseNote: string | null;
  respondedAt: string | null;
  flagLevel: FlagLevel;
  flagReason: string | null;
  context: {
    relation: string;
    occasion: string;
    priorContact: boolean;
    declaredPurpose: string | null;
  };
  auditTrail: AuditEvent[];
  hash: string;
  verified: boolean;
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  type: 'incoming' | 'response' | 'flag' | 'verification' | 'report';
  summary: string;
  ref: string;
}

export type PageKey =
  | 'overview'
  | 'transactions'
  | 'response'
  | 'timeline'
  | 'verification'
  | 'reports'
  | 'privacy';
