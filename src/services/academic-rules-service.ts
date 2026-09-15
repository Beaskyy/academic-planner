import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  AcademicRuleCreateRequest,
  AcademicRuleCreateResponse,
  AcademicRuleGetResponse,
  AcademicRuleSubmitRequest,
  AcademicRuleSubmitResponse,
  AcademicRuleListQueryParams,
  AcademicRuleListResponse,
  AcademicRuleValidationErrorItem,
  AcademicRuleValidationErrorResponse,
} from "@/types/academic-rules";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class AcademicRuleApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: AcademicRuleValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: AcademicRuleValidationErrorItem[],
  ) {
    super(message);
    this.name = "AcademicRuleApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const academicRulesService = {
  async getRule(
    ruleId: string,
    accessToken?: string,
  ): Promise<AcademicRuleGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/academic-rules/${ruleId}`,
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
        const errData = json as AcademicRuleValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the academic rule.";
        throw new AcademicRuleApiError(message, 422, errData, rawErrors);
      }

      throw new AcademicRuleApiError(
        json?.message ||
          `Failed to fetch academic rule with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as AcademicRuleGetResponse;
  },
  async listRules(
    params?: AcademicRuleListQueryParams,
    accessToken?: string,
  ): Promise<AcademicRuleListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.scope) query.set("scope", params.scope);
    if (params?.scope_ref_id) query.set("scope_ref_id", params.scope_ref_id);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/academic-rules${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as AcademicRuleValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching academic rules.";
        throw new AcademicRuleApiError(message, 422, errData, rawErrors);
      }

      throw new AcademicRuleApiError(
        json?.message ||
          `Failed to fetch academic rules with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as AcademicRuleListResponse;
  },
  async createRule(
    payload: AcademicRuleCreateRequest,
    accessToken?: string,
  ): Promise<AcademicRuleCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/academic-rules`,
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
        const errData = json as AcademicRuleValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the academic rule.";
        throw new AcademicRuleApiError(message, 422, errData, rawErrors);
      }

      throw new AcademicRuleApiError(
        json?.message ||
          `Failed to create academic rule with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as AcademicRuleCreateResponse;
  },

  async submitRule(
    ruleId: string,
    payload: AcademicRuleSubmitRequest,
    accessToken?: string,
  ): Promise<AcademicRuleSubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/academic-rules/${ruleId}/submit`,
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
        const errData = json as AcademicRuleValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the academic rule.";
        throw new AcademicRuleApiError(message, 422, errData, rawErrors);
      }

      throw new AcademicRuleApiError(
        json?.message ||
          `Failed to submit academic rule with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as AcademicRuleSubmitResponse;
  },
};
