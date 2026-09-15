export interface CurriculumCreateRequest {
  programme_id: string;
  cohort_intake: string;
  level_period_structure?: Record<string, any> | null;
  minimum_credits?: number | null;
  total_credits?: number | null;
}

export interface CurriculumResponseData {
  id: string;
  programme_id: string;
  cohort_intake: string;
  level_period_structure?: Record<string, any> | null;
  total_credits?: string | number | null;
  minimum_credits?: string | number | null;
  status: string;
  version_number: number;
  predecessor_curriculum_id?: string | null;
  row_version: number;
}

export interface CurriculumCreateResponse {
  status?: string;
  message?: string;
  data: CurriculumResponseData;
}

export interface CurriculumListQueryParams {
  programme_id?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface CurriculumListPaginationData {
  items: CurriculumResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface CurriculumListResponse {
  status?: string;
  message?: string;
  data: CurriculumListPaginationData;
}

export interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: Record<string, any>;
}

export interface CurriculumValidationErrorResponse {
  detail?: ValidationErrorItem[] | string;
  message?: string;
}
