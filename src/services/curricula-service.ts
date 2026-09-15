import {
  CurriculumCreateRequest,
  CurriculumCreateResponse,
  CurriculumGetResponse,
  CurriculumSubmitRequest,
  CurriculumSubmitResponse,
  PinnedCurriculumQueryParams,
  PinnedCurriculumResponse,
  CurriculumCourseMappingCreateRequest,
  CurriculumCourseMappingCreateResponse,
  CurriculumCourseMappingListResponse,
  CurriculumListQueryParams,
  CurriculumListResponse,
  CurriculumValidationErrorResponse,
  ValidationErrorItem,
} from "@/types/curricula";
import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class CurriculumApiError extends Error {
  status: number;
  data?: unknown;
  fieldErrors?: Record<string, string>;
  rawErrors?: ValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    fieldErrors?: Record<string, string>,
    rawErrors?: ValidationErrorItem[],
  ) {
    super(message);
    this.name = "CurriculumApiError";
    this.status = status;
    this.data = data;
    this.fieldErrors = fieldErrors;
    this.rawErrors = rawErrors;
  }
}

/**
 * Service for Curricula API operations
 */
export const curriculaService = {
  async getCurriculum(
    curriculumId: string,
    accessToken?: string,
  ): Promise<CurriculumGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula/${curriculumId}`,
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
        const errData = json as CurriculumValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the curriculum.";
        throw new CurriculumApiError(
          message,
          422,
          errData,
          undefined,
          rawErrors,
        );
      }

      throw new CurriculumApiError(
        json?.message || `Failed to fetch curriculum with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumGetResponse;
  },
  async getPinnedCurriculum(
    params: PinnedCurriculumQueryParams,
    accessToken?: string,
  ): Promise<PinnedCurriculumResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams({
      programme_id: params.programme_id,
      cohort_intake: params.cohort_intake,
    });
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula/pinned?${query.toString()}`,
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
        const errData = json as CurriculumValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the pinned curriculum.";
        throw new CurriculumApiError(
          message,
          422,
          errData,
          undefined,
          rawErrors,
        );
      }

      throw new CurriculumApiError(
        json?.message ||
          `Failed to fetch pinned curriculum with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as PinnedCurriculumResponse;
  },
  /**
   * List Curricula with pagination & programme filtering
   * GET /api/v1/curricula
   * Auth Required
   */
  async listCurricula(
    params?: CurriculumListQueryParams,
    accessToken?: string,
  ): Promise<CurriculumListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const query = new URLSearchParams();
    if (params?.programme_id) {
      query.set("programme_id", params.programme_id);
    }
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(params.limit));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(params.offset));
    }

    const queryString = query.toString();
    const url = `${GATEWAY_BASE_URL}/api/v1/curricula${queryString ? `?${queryString}` : ""}`;

    const res = await fetchWithAuthHandling(url, {
      method: "GET",
      headers,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while fetching curricula.";

        if (Array.isArray(errData?.detail)) {
          const messages = errData.detail.map((item) => {
            const field =
              item.loc && item.loc.length > 0
                ? String(item.loc[item.loc.length - 1])
                : "field";
            fieldErrors[field] = item.msg;
            return `${field}: ${item.msg}`;
          });
          formattedMessage = messages.join("; ");
        } else if (typeof errData?.detail === "string") {
          formattedMessage = errData.detail;
        } else if (errData?.message) {
          formattedMessage = errData.message;
        }

        throw new CurriculumApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CurriculumApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message || `Failed to fetch curricula with status ${res.status}`;
      throw new CurriculumApiError(message, res.status, json);
    }

    return json as CurriculumListResponse;
  },

  /**
   * Create a new Curriculum
   * POST /api/v1/curricula
   * Auth Required
   */
  async createCurriculum(
    payload: CurriculumCreateRequest,
    accessToken?: string,
  ): Promise<CurriculumCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CurriculumValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while creating curriculum.";

        if (Array.isArray(errData?.detail)) {
          const messages = errData.detail.map((item) => {
            const field =
              item.loc && item.loc.length > 0
                ? String(item.loc[item.loc.length - 1])
                : "field";
            fieldErrors[field] = item.msg;
            return `${field}: ${item.msg}`;
          });
          formattedMessage = messages.join("; ");
        } else if (typeof errData?.detail === "string") {
          formattedMessage = errData.detail;
        } else if (errData?.message) {
          formattedMessage = errData.message;
        }

        throw new CurriculumApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CurriculumApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message ||
        `Failed to create curriculum with status ${res.status}`;
      throw new CurriculumApiError(message, res.status, json);
    }

    return json as CurriculumCreateResponse;
  },

  async submitCurriculum(
    curriculumId: string,
    payload: CurriculumSubmitRequest,
    accessToken?: string,
  ): Promise<CurriculumSubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula/${curriculumId}/submit`,
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
        const errData = json as CurriculumValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the curriculum.";
        throw new CurriculumApiError(
          message,
          422,
          errData,
          undefined,
          rawErrors,
        );
      }

      throw new CurriculumApiError(
        json?.message ||
          `Failed to submit curriculum with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumSubmitResponse;
  },

  async addCourseMapping(
    curriculumId: string,
    payload: CurriculumCourseMappingCreateRequest,
    accessToken?: string,
  ): Promise<CurriculumCourseMappingCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula/${curriculumId}/course-mappings`,
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
        const errData = json as CurriculumValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while adding the course mapping.";
        throw new CurriculumApiError(
          message,
          422,
          errData,
          undefined,
          rawErrors,
        );
      }

      throw new CurriculumApiError(
        json?.message ||
          `Failed to add course mapping with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumCourseMappingCreateResponse;
  },

  async listCourseMappings(
    curriculumId: string,
    accessToken?: string,
  ): Promise<CurriculumCourseMappingListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/curricula/${curriculumId}/course-mappings`,
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
        const errData = json as CurriculumValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching course mappings.";
        throw new CurriculumApiError(
          message,
          422,
          errData,
          undefined,
          rawErrors,
        );
      }

      throw new CurriculumApiError(
        json?.message ||
          `Failed to fetch course mappings with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CurriculumCourseMappingListResponse;
  },
};
