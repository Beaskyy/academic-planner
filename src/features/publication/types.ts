export interface VersionItem {
  id: string;
  version: string;
  title: string;
  status: 'published' | 'superseded' | 'failed';
  publishedDate: string;
  author: string;
  changes?: string[];
  failureDetails?: {
    statusText: string;
    errors: string[];
    correlationId: string;
  };
  details?: {
    artifactType: string;
    commitHash: string;
    publicationsReference: string;
    downstreamIntegrations: Array<{
      name: string;
      status: 'synced' | 'pending' | 'failed' | 'acknowledged';
    }>;
  };
}

export interface DeliveryEvent {
  id: string;
  artifactName: string;
  version: string;
  consumerModule: string;
  status: 'delivered' | 'pending' | 'failed';
  sentAt: string;
  acknowledgedAt?: string;
  correlationId: string;
  idempotencyKey: string;
  attempts: string;
  acknowledgementHash: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: 'PUBLISHED' | 'APPROVED' | 'RETURNED' | 'CREATED';
  artifactType: string;
  version: string;
  actor: {
    name: string;
    role?: string;
    avatar?: string;
  };
  changeSummary: string;
  effectiveTime: string;
  reference: string;
  diff?: {
    before: string;
    after: string;
    dependencySnapshots: string;
    approvalTrail: string;
    eventCorrelationIds: string;
  };
}
