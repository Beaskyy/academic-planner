export interface CourseOfferingCreateRequest {
  academic_session_id: string;
  capacity: number;
  course_id: string;
  section_label: string;
  academic_period_id?: string | null;
  delivery_mode?: string | null;
  eligible_curriculum_ids?: string[];
  eligible_programme_ids?: string[];
  registration_availability?: string | null;
}

export interface CourseOfferingResponseData {
  id: string;
  course_id: string;
  academic_session_id: string;
  academic_period_id?: string | null;
  section_label: string;
  capacity: number;
  eligible_programme_ids: string[];
  eligible_curriculum_ids: string[];
  delivery_mode?: string | null;
  registration_availability?: string | null;
  status: string;
  version_number: number;
  predecessor_course_offering_id?: string | null;
  row_version: number;
}

export interface CourseOfferingCreateResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingUpdateRequest {
  row_version: number;
  capacity?: number | null;
  delivery_mode?: string | null;
  registration_availability?: string | null;
}

export interface CourseOfferingUpdateResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingSubmitRequest {
  row_version: number;
}

export interface CourseOfferingSubmitResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingOpenRegistrationRequest {
  row_version: number;
}

export interface CourseOfferingOpenRegistrationResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingCloseRegistrationRequest {
  row_version: number;
}

export interface CourseOfferingCloseRegistrationResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingCancelRequest {
  row_version: number;
}

export interface CourseOfferingCancelResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingGetResponse {
  status?: string;
  message?: string;
  data: CourseOfferingResponseData;
}

export interface CourseOfferingListQueryParams {
  course_id?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface CourseOfferingListPaginationData {
  items: CourseOfferingResponseData[];
  total: number;
  limit: number;
  offset: number;
}

export interface CourseOfferingListResponse {
  status?: string;
  message?: string;
  data: CourseOfferingListPaginationData;
}

export interface CourseOfferingValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface CourseOfferingValidationErrorResponse {
  detail?: CourseOfferingValidationErrorItem[] | string;
  message?: string;
}
