export interface AcademicRuleCreateRequest {
  rule_definition: Record<string, unknown>;
  rule_type: string;
  scope: string;
  scope_ref_id: string;
  target_course_id?: string | null;
}

export interface AcademicRuleResponseData {
  id: string;
  scope: string;
  scope_ref_id: string;
  rule_type: string;
  rule_definition: Record<string, unknown>;
  target_course_id?: string | null;
  status: string;
  version_number: number;
  predecessor_academic_rule_id?: string | null;
  row_version: number;
}

export interface AcademicRuleCreateResponse {
  status?: string;
  message?: string;
  data: AcademicRuleResponseData;
}

export interface AcademicRuleGetResponse {
  status?: string;
  message?: string;
  data: AcademicRuleResponseData;
}

export interface AcademicRuleSubmitRequest {
  row_version: number;
}

export interface AcademicRuleSubmitResponse {
  status?: string;
  message?: string;
  data: AcademicRuleResponseData;
}

export interface AcademicRuleListQueryParams {
  scope?: string | null;
  scope_ref_id?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface AcademicRuleListPaginationData {
  items: AcademicRuleResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface AcademicRuleListResponse {
  status?: string;
  message?: string;
  data: AcademicRuleListPaginationData;
}

export interface AcademicRuleValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface AcademicRuleValidationErrorResponse {
  detail?: AcademicRuleValidationErrorItem[] | string;
  message?: string;
}
