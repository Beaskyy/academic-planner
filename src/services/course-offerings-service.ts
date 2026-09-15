import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  CourseOfferingCreateRequest,
  CourseOfferingCreateResponse,
  CourseOfferingUpdateRequest,
  CourseOfferingUpdateResponse,
  CourseOfferingSubmitRequest,
  CourseOfferingSubmitResponse,
  CourseOfferingOpenRegistrationRequest,
  CourseOfferingOpenRegistrationResponse,
  CourseOfferingCloseRegistrationRequest,
  CourseOfferingCloseRegistrationResponse,
  CourseOfferingCancelRequest,
  CourseOfferingCancelResponse,
  CourseOfferingGetResponse,
  CourseOfferingListQueryParams,
  CourseOfferingListResponse,
  CourseOfferingValidationErrorItem,
  CourseOfferingValidationErrorResponse,
} from "@/types/course-offerings";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class CourseOfferingApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: CourseOfferingValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: CourseOfferingValidationErrorItem[],
  ) {
    super(message);
    this.name = "CourseOfferingApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const courseOfferingsService = {
  async getOffering(
    offeringId: string,
    accessToken?: string,
  ): Promise<CourseOfferingGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to fetch course offering with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingGetResponse;
  },
  async listOfferings(
    params?: CourseOfferingListQueryParams,
    accessToken?: string,
  ): Promise<CourseOfferingListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.course_id) query.set("course_id", params.course_id);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching course offerings.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to fetch course offerings with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingListResponse;
  },
  async createOffering(
    payload: CourseOfferingCreateRequest,
    accessToken?: string,
  ): Promise<CourseOfferingCreateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while creating the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to create course offering with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingCreateResponse;
  },

  async updateOffering(
    offeringId: string,
    payload: CourseOfferingUpdateRequest,
    accessToken?: string,
  ): Promise<CourseOfferingUpdateResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while updating the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to update course offering with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingUpdateResponse;
  },

  async submitOffering(
    offeringId: string,
    payload: CourseOfferingSubmitRequest,
    accessToken?: string,
  ): Promise<CourseOfferingSubmitResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}/submit`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while submitting the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to submit course offering with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingSubmitResponse;
  },

  async openOfferingRegistration(
    offeringId: string,
    payload: CourseOfferingOpenRegistrationRequest,
    accessToken?: string,
  ): Promise<CourseOfferingOpenRegistrationResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}/open-registration`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while opening registration for the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to open course offering registration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingOpenRegistrationResponse;
  },

  async closeOfferingRegistration(
    offeringId: string,
    payload: CourseOfferingCloseRegistrationRequest,
    accessToken?: string,
  ): Promise<CourseOfferingCloseRegistrationResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}/close-registration`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while closing registration for the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to close course offering registration with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingCloseRegistrationResponse;
  },

  async cancelOffering(
    offeringId: string,
    payload: CourseOfferingCancelRequest,
    accessToken?: string,
  ): Promise<CourseOfferingCancelResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/course-offerings/${offeringId}/cancel`,
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
        const errData = json as CourseOfferingValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while cancelling the course offering.";
        throw new CourseOfferingApiError(message, 422, errData, rawErrors);
      }

      throw new CourseOfferingApiError(
        json?.message ||
          `Failed to cancel course offering with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as CourseOfferingCancelResponse;
  },
};
