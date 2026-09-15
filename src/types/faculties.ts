export interface FacultyCreateRequest {
  code: string;
  name: string;
  description?: string | null;
}

export interface FacultyResponseData {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  status: string;
  version_number: number;
  predecessor_faculty_id?: string | null;
  row_version: number;
}

export interface FacultyCreateResponse {
  status?: string;
  message?: string;
  data: FacultyResponseData;
}

export interface FacultyListQueryParams {
  limit?: number | null;
  offset?: number | null;
}

export interface FacultyListPaginationData {
  items: FacultyResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface FacultyListResponse {
  status?: string;
  message?: string;
  data: FacultyListPaginationData;
}

export interface FacultyUpdateRequest {
  row_version: number;
  description?: string | null;
  name?: string | null;
}

export interface FacultyUpdateResponse {
  status?: string;
  message?: string;
  data: FacultyResponseData;
}

export interface FacultyGetResponse {
  status?: string;
  message?: string;
  data: FacultyResponseData;
}

export interface FacultySubmitRequest {
  row_version: number;
  description?: string | null;
  name?: string | null;
}

export interface FacultySubmitResponse {
  status?: string;
  message?: string;
  data: FacultyResponseData;
}

export interface FacultyValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface FacultyValidationErrorResponse {
  detail?: FacultyValidationErrorItem[] | string;
  message?: string;
}
