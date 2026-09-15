import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  DepartmentGetResponse,
  DepartmentCreateRequest,
  DepartmentCreateResponse,
  DepartmentListQueryParams,
  DepartmentListResponse,
  DepartmentUpdateRequest,
  DepartmentUpdateResponse,
  DepartmentSubmitRequest,
  DepartmentSubmitResponse,
  DepartmentValidationErrorItem,
  DepartmentValidationErrorResponse,
} from "@/types/departments";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class DepartmentApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: DepartmentValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: DepartmentValidationErrorItem[],
  ) {
    super(message);
    this.name = "DepartmentApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const departmentsService = {
  async getDepartment(
    departmentId: string,
    accessToken?: string,
  ): Promise<DepartmentGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/departments/${departmentId}`,
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
        const errData = json as DepartmentValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the department.";
        throw new DepartmentApiError(message, 422, errData, rawErrors);
      }

      throw new DepartmentApiError(
        json?.message ||
          `Failed to fetch department with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as DepartmentGetResponse;
  },

  async listDepartments(
    params?: DepartmentListQueryParams,
    accessToken?: string,
  ): Promise<DepartmentListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.faculty_id) query.set("faculty_id", params.faculty_id);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/departments${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as DepartmentValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching departments.";
        throw new DepartmentApiError(message, 422, errData, rawErrors);
      }

      throw new DepartmentApiError(
        json?.message ||
          `Failed to fetch departments with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as DepartmentListResponse;
  },

  async createDepartment(
    payload: DepartmentCreateRequest,
    accessToken?: string,
  ): Promise<DepartmentCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/departments`,
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
        const errData = json as DepartmentValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the department.";
        throw new DepartmentApiError(message, 422, errData, rawErrors);
      }

      throw new DepartmentApiError(
        json?.message ||
          `Failed to create department with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as DepartmentCreateResponse;
  },

  async updateDepartment(
    departmentId: string,
    payload: DepartmentUpdateRequest,
    accessToken?: string,
  ): Promise<DepartmentUpdateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/departments/${departmentId}`,
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
        const errData = json as DepartmentValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while updating the department.";
        throw new DepartmentApiError(message, 422, errData, rawErrors);
      }

      throw new DepartmentApiError(
        json?.message ||
          `Failed to update department with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as DepartmentUpdateResponse;
  },

  async submitDepartment(
    departmentId: string,
    payload: DepartmentSubmitRequest,
    accessToken?: string,
  ): Promise<DepartmentSubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/departments/${departmentId}/submit`,
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
        const errData = json as DepartmentValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the department.";
        throw new DepartmentApiError(message, 422, errData, rawErrors);
      }

      throw new DepartmentApiError(
        json?.message ||
          `Failed to submit department with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as DepartmentSubmitResponse;
  },
};
