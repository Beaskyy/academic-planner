import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  CurriculumMigrationCreateRequest,
  CurriculumMigrationCreateResponse,
  CurriculumMigrationValidationErrorItem,
  CurriculumMigrationValidationErrorResponse,
} from "@/types/curriculum-migrations";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class CurriculumMigrationApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: CurriculumMigrationValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: CurriculumMigrationValidationErrorItem[],
  ) {
    super(message);
    this.name = "CurriculumMigrationApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const curriculumMigrationsService = {
  async createMigration(
    payload: CurriculumMigrationCreateRequest,
    accessToken?: string,
  ): Promise<CurriculumMigrationCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumMigrationValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail) ? errData.detail : undefined;
        const message = rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message || `Failed to create curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationCreateResponse;
  },
};
