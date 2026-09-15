export interface ProgrammeCreateRequest {
  code: string;
  department_id: string;
  name: string;
  availability?: string | null;
  award_type?: string | null;
  duration?: string | null;
  level_structure?: Record<string, unknown> | null;
  mode?: string | null;
}

export interface ProgrammeResponseData {
  id: string;
  code: string;
  name: string;
  award_type?: string | null;
  duration?: string | null;
  mode?: string | null;
  level_structure?: Record<string, unknown> | null;
  availability?: string | null;
  status: string;
  department_id: string;
  version_number: number;
  predecessor_programme_id?: string | null;
  row_version: number;
}

export interface ProgrammeCreateResponse {
  status?: string;
  message?: string;
  data: ProgrammeResponseData;
}

export interface ProgrammeListQueryParams {
  department_id?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface ProgrammeListPaginationData {
  items: ProgrammeResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface ProgrammeListResponse {
  status?: string;
  message?: string;
  data: ProgrammeListPaginationData;
}

export interface ProgrammeUpdateRequest {
  row_version: number;
  availability?: string | null;
  award_type?: string | null;
  duration?: string | null;
  level_structure?: Record<string, unknown> | null;
  mode?: string | null;
  name?: string | null;
}

export interface ProgrammeUpdateResponse {
  status?: string;
  message?: string;
  data: ProgrammeResponseData;
}

export interface ProgrammeValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface ProgrammeValidationErrorResponse {
  detail?: ProgrammeValidationErrorItem[] | string;
  message?: string;
}
