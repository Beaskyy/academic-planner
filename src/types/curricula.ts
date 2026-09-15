export interface CurriculumCreateRequest {
  programme_id: string;
  cohort_intake: string;
  level_period_structure?: Record<string, unknown> | null;
  minimum_credits?: number | null;
  total_credits?: number | null;
}

export interface CurriculumResponseData {
  id: string;
  programme_id: string;
  cohort_intake: string;
  level_period_structure?: Record<string, unknown> | null;
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

export interface CurriculumGetResponse {
  status?: string;
  message?: string;
  data: CurriculumResponseData;
}

export interface CurriculumSubmitRequest {
  row_version: number;
}

export interface CurriculumSubmitResponse {
  status?: string;
  message?: string;
  data: CurriculumResponseData;
}

export interface PinnedCurriculumQueryParams {
  programme_id: string;
  cohort_intake: string;
}

export interface PinnedCurriculumResponse {
  status?: string;
  message?: string;
  data: CurriculumResponseData;
}

export interface CurriculumCourseMappingCreateRequest {
  course_id: string;
  credits_counted: number;
  level_period: string;
  requirement_type: string;
  elective_group?: string | null;
}

export interface CurriculumCourseMappingResponseData {
  id: string;
  curriculum_id: string;
  course_id: string;
  level_period: string;
  requirement_type: string;
  credits_counted: string | number;
  elective_group?: string | null;
  row_version: number;
}

export interface CurriculumCourseMappingCreateResponse {
  status?: string;
  message?: string;
  data: CurriculumCourseMappingResponseData;
}

export interface CurriculumCourseMappingListResponse {
  status?: string;
  message?: string;
  data: CurriculumCourseMappingResponseData[];
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
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface CurriculumValidationErrorResponse {
  detail?: ValidationErrorItem[] | string;
  message?: string;
}
