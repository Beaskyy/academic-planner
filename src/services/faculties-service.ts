import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  FacultyGetResponse,
  FacultyCreateRequest,
  FacultyCreateResponse,
  FacultyListQueryParams,
  FacultyListResponse,
  FacultyUpdateRequest,
  FacultyUpdateResponse,
  FacultySubmitRequest,
  FacultySubmitResponse,
  FacultyValidationErrorItem,
  FacultyValidationErrorResponse,
} from "@/types/faculties";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class FacultyApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: FacultyValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: FacultyValidationErrorItem[],
  ) {
    super(message);
    this.name = "FacultyApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const facultiesService = {
  async getFaculty(
    facultyId: string,
    accessToken?: string,
  ): Promise<FacultyGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/faculties/${facultyId}`,
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
        const errData = json as FacultyValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the faculty.";
        throw new FacultyApiError(message, 422, errData, rawErrors);
      }

      throw new FacultyApiError(
        json?.message || `Failed to fetch faculty with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as FacultyGetResponse;
  },

  async listFaculties(
    params?: FacultyListQueryParams,
    accessToken?: string,
  ): Promise<FacultyListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/faculties${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as FacultyValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching faculties.";
        throw new FacultyApiError(message, 422, errData, rawErrors);
      }

      throw new FacultyApiError(
        json?.message || `Failed to fetch faculties with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as FacultyListResponse;
  },

  async createFaculty(
    payload: FacultyCreateRequest,
    accessToken?: string,
  ): Promise<FacultyCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/faculties`,
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
        const errData = json as FacultyValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the faculty.";
        throw new FacultyApiError(message, 422, errData, rawErrors);
      }

      throw new FacultyApiError(
        json?.message || `Failed to create faculty with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as FacultyCreateResponse;
  },

  async updateFaculty(
    facultyId: string,
    payload: FacultyUpdateRequest,
    accessToken?: string,
  ): Promise<FacultyUpdateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/faculties/${facultyId}`,
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
        const errData = json as FacultyValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while updating the faculty.";
        throw new FacultyApiError(message, 422, errData, rawErrors);
      }

      throw new FacultyApiError(
        json?.message || `Failed to update faculty with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as FacultyUpdateResponse;
  },

  async submitFaculty(
    facultyId: string,
    payload: FacultySubmitRequest,
    accessToken?: string,
  ): Promise<FacultySubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/faculties/${facultyId}/submit`,
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
        const errData = json as FacultyValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the faculty.";
        throw new FacultyApiError(message, 422, errData, rawErrors);
      }

      throw new FacultyApiError(
        json?.message || `Failed to submit faculty with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as FacultySubmitResponse;
  },
};
