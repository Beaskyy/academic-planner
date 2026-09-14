export interface CourseCreateRequest {
  code: string;
  title: string;
  department_id: string;
  credits: number;
  description?: string | null;
  delivery_attributes?: Record<string, any> | null;
}

export interface CourseUpdateRequest {
  row_version: number;
  title?: string | null;
  credits?: number | null;
  description?: string | null;
  delivery_attributes?: Record<string, any> | null;
}

export interface CourseSubmitRequest {
  row_version: number;
}

export interface CourseResponseData {
  id: string;
  code: string;
  title: string;
  department_id: string;
  credits: string | number;
  description: string | null;
  delivery_attributes?: Record<string, any> | null;
  status: string;
  version_number: number;
  predecessor_course_id?: string | null;
  row_version: number;
}

export interface CourseCreateResponse {
  status?: string;
  message?: string;
  data: CourseResponseData;
}

export interface CourseUpdateResponse {
  status?: string;
  message?: string;
  data: CourseResponseData;
}

export interface CourseSubmitResponse {
  status?: string;
  message?: string;
  data: CourseResponseData;
}

export interface CourseDetailResponse {
  status?: string;
  message?: string;
  data: CourseResponseData;
}

export interface CourseListQueryParams {
  department_id?: string | null;
  limit?: number;
  offset?: number;
}

export interface CourseListPaginationData {
  items: CourseResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface CourseListResponse {
  status?: string;
  message?: string;
  data: CourseListPaginationData;
}

export interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: Record<string, any>;
}

export interface CourseValidationErrorResponse {
  detail?: ValidationErrorItem[] | string;
  message?: string;
}
