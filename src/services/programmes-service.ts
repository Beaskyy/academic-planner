import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  ProgrammeCreateRequest,
  ProgrammeCreateResponse,
  ProgrammeListQueryParams,
  ProgrammeListResponse,
  ProgrammeUpdateRequest,
  ProgrammeUpdateResponse,
  ProgrammeValidationErrorItem,
  ProgrammeValidationErrorResponse,
} from "@/types/programmes";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class ProgrammeApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: ProgrammeValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: ProgrammeValidationErrorItem[],
  ) {
    super(message);
    this.name = "ProgrammeApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const programmesService = {
  async listProgrammes(
    params?: ProgrammeListQueryParams,
    accessToken?: string,
  ): Promise<ProgrammeListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.department_id) query.set("department_id", params.department_id);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/programmes${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as ProgrammeValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching programmes.";
        throw new ProgrammeApiError(message, 422, errData, rawErrors);
      }

      throw new ProgrammeApiError(
        json?.message ||
          `Failed to fetch programmes with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as ProgrammeListResponse;
  },

  async createProgramme(
    payload: ProgrammeCreateRequest,
    accessToken?: string,
  ): Promise<ProgrammeCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/programmes`,
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
        const errData = json as ProgrammeValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the programme.";
        throw new ProgrammeApiError(message, 422, errData, rawErrors);
      }

      throw new ProgrammeApiError(
        json?.message ||
          `Failed to create programme with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as ProgrammeCreateResponse;
  },

  async updateProgramme(
    programmeId: string,
    payload: ProgrammeUpdateRequest,
    accessToken?: string,
  ): Promise<ProgrammeUpdateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/programmes/${programmeId}`,
      {
        method: "PATCH",
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
        const errData = json as ProgrammeValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while updating the programme.";
        throw new ProgrammeApiError(message, 422, errData, rawErrors);
      }

      throw new ProgrammeApiError(
        json?.message ||
          `Failed to update programme with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as ProgrammeUpdateResponse;
  },
};
