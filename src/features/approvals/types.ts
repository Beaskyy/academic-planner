export interface ProposalItem {
  id: string;
  title: string;
  type: string;
  submittedDate: string;
  submittedBy: string;
  reviewer: string;
  timeAgo: string;
  status: 'awaiting' | 'under-review' | 'approved' | 'rejected' | 'draft';
  priority?: 'high' | 'normal';
  changeSummary?: string;
  impactCount?: {
    programmes: number;
    courses?: number;
    venues?: number;
  };
  isOwnSubmission?: boolean;
}

export interface TimelineDiffItem {
  property: string;
  oldValue: string;
  newValue: string;
}

export interface DependencyItem {
  name: string;
  version: string;
  status: 'active' | 'pending';
}

export interface EligibleApprover {
  name: string;
  role: string;
  statusText: string;
  isOnline: boolean;
}
