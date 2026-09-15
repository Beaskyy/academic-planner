export interface CurriculumMigrationCreateRequest {
  affected_student_scope: Record<string, unknown>;
  source_curriculum_id: string;
  target_curriculum_id: string;
  course_equivalence_mapping?: Record<string, unknown> | null;
  credit_treatment?: Record<string, unknown> | null;
  effective_at?: string | null;
  unmet_requirement_handling?: Record<string, unknown> | null;
}

export interface CurriculumMigrationResponseData {
  id: string;
  source_curriculum_id: string;
  target_curriculum_id: string;
  affected_student_scope: Record<string, unknown>;
  course_equivalence_mapping?: Record<string, unknown> | null;
  credit_treatment?: Record<string, unknown> | null;
  unmet_requirement_handling?: Record<string, unknown> | null;
  status: string;
  maker_id?: string | null;
  reviewer_id?: string | null;
  reason?: string | null;
  effective_at?: string | null;
  decided_at?: string | null;
  row_version: number;
}

export interface CurriculumMigrationCreateResponse {
  status?: string;
  message?: string;
  data: CurriculumMigrationResponseData;
}

export interface CurriculumMigrationValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface CurriculumMigrationValidationErrorResponse {
  detail?: CurriculumMigrationValidationErrorItem[] | string;
  message?: string;
}
