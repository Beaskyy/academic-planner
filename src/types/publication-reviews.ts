export interface PublicationReviewResponseData {
  id: string;
  artifact_type: string;
  artifact_id: string;
  artifact_version_number: number;
  maker_id: string;
  status: string;
  reviewer_id?: string | null;
  decision?: string | null;
  reason?: string | null;
  submitted_at: string;
  decided_at?: string | null;
  row_version: number;
}

export interface PublicationReviewListQueryParams {
  artifact_type?: string | null;
  review_status?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface PublicationReviewListPaginationData {
  items: PublicationReviewResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface PublicationReviewListResponse {
  status?: string;
  message?: string;
  data: PublicationReviewListPaginationData;
}

export interface PublicationReviewGetResponse {
  status?: string;
  message?: string;
  data: PublicationReviewResponseData;
}

export interface PublicationReviewApproveRequest {
  row_version: number;
  reason?: string | null;
}

export interface PublicationReviewApproveResponse {
  status?: string;
  message?: string;
  data: PublicationReviewResponseData;
}

export interface PublicationReviewReturnRequest {
  row_version: number;
  reason?: string | null;
}

export interface PublicationReviewReturnResponse {
  status?: string;
  message?: string;
  data: PublicationReviewResponseData;
}

export interface PublicationReviewValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface PublicationReviewValidationErrorResponse {
  detail?: PublicationReviewValidationErrorItem[] | string;
  message?: string;
}
