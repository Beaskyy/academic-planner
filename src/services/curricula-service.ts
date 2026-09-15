import {
  CurriculumCreateRequest,
  CurriculumCreateResponse,
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
  data?: any;
  fieldErrors?: Record<string, string>;
  rawErrors?: ValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: any,
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
      token = (session as any)?.accessToken;
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
      token = (session as any)?.accessToken;
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
};
