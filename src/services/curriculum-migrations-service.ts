import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  CurriculumMigrationCreateRequest,
  CurriculumMigrationCreateResponse,
  CurriculumMigrationSubmitRequest,
  CurriculumMigrationSubmitResponse,
  CurriculumMigrationApproveResponse,
  CurriculumMigrationRejectResponse,
  CurriculumMigrationPreviewResponse,
  CurriculumMigrationGetResponse,
  CurriculumMigrationListQueryParams,
  CurriculumMigrationListResponse,
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
  async getMigration(
    migrationId: string,
    accessToken?: string,
  ): Promise<CurriculumMigrationGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations/${migrationId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumMigrationValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to fetch curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationGetResponse;
  },
  async previewMigration(
    migrationId: string,
    accessToken?: string,
  ): Promise<CurriculumMigrationPreviewResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations/${migrationId}/preview`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumMigrationValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while previewing the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to preview curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationPreviewResponse;
  },
  async listMigrations(
    params?: CurriculumMigrationListQueryParams,
    accessToken?: string,
  ): Promise<CurriculumMigrationListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumMigrationValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching curriculum migrations.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to fetch curriculum migrations with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationListResponse;
  },
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
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to create curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationCreateResponse;
  },

  async submitMigration(
    migrationId: string,
    payload: CurriculumMigrationSubmitRequest,
    accessToken?: string,
  ): Promise<CurriculumMigrationSubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations/${migrationId}/submit`,
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
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to submit curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationSubmitResponse;
  },

  async approveMigration(
    migrationId: string,
    payload: CurriculumMigrationSubmitRequest,
    accessToken?: string,
  ): Promise<CurriculumMigrationApproveResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations/${migrationId}/approve`,
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
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while approving the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to approve curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationApproveResponse;
  },

  async rejectMigration(
    migrationId: string,
    payload: CurriculumMigrationSubmitRequest,
    accessToken?: string,
  ): Promise<CurriculumMigrationRejectResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curriculum-migrations/${migrationId}/reject`,
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
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while rejecting the curriculum migration.";
        throw new CurriculumMigrationApiError(message, 422, errData, rawErrors);
      }

      throw new CurriculumMigrationApiError(
        json?.message ||
          `Failed to reject curriculum migration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumMigrationRejectResponse;
  },
};
