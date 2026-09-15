export interface DepartmentCreateRequest {
  code: string;
  faculty_id: string;
  name: string;
  description?: string | null;
}

export interface DepartmentResponseData {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  status: string;
  faculty_id: string;
  version_number: number;
  predecessor_department_id?: string | null;
  row_version: number;
}

export interface DepartmentCreateResponse {
  status?: string;
  message?: string;
  data: DepartmentResponseData;
}

export interface DepartmentListQueryParams {
  faculty_id?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface DepartmentListPaginationData {
  items: DepartmentResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface DepartmentListResponse {
  status?: string;
  message?: string;
  data: DepartmentListPaginationData;
}

export interface DepartmentUpdateRequest {
  row_version: number;
  description?: string | null;
  name?: string | null;
}

export interface DepartmentUpdateResponse {
  status?: string;
  message?: string;
  data: DepartmentResponseData;
}

export interface DepartmentGetResponse {
  status?: string;
  message?: string;
  data: DepartmentResponseData;
}

export interface DepartmentSubmitRequest {
  row_version: number;
  description?: string | null;
  name?: string | null;
}

export interface DepartmentSubmitResponse {
  status?: string;
  message?: string;
  data: DepartmentResponseData;
}

export interface DepartmentValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface DepartmentValidationErrorResponse {
  detail?: DepartmentValidationErrorItem[] | string;
  message?: string;
}
