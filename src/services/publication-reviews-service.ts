import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";
import {
  PublicationReviewApproveRequest,
  PublicationReviewApproveResponse,
  PublicationReviewReturnRequest,
  PublicationReviewReturnResponse,
  PublicationReviewGetResponse,
  PublicationReviewListQueryParams,
  PublicationReviewListResponse,
  PublicationReviewValidationErrorItem,
  PublicationReviewValidationErrorResponse,
} from "@/types/publication-reviews";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class PublicationReviewApiError extends Error {
  status: number;
  data?: unknown;
  rawErrors?: PublicationReviewValidationErrorItem[];

  constructor(
    message: string,
    status: number,
    data?: unknown,
    rawErrors?: PublicationReviewValidationErrorItem[],
  ) {
    super(message);
    this.name = "PublicationReviewApiError";
    this.status = status;
    this.data = data;
    this.rawErrors = rawErrors;
  }
}

export const publicationReviewsService = {
  async getReview(
    reviewId: string,
    accessToken?: string,
  ): Promise<PublicationReviewGetResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/publication-reviews/${reviewId}`,
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
        const errData = json as PublicationReviewValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching the publication review.";
        throw new PublicationReviewApiError(message, 422, errData, rawErrors);
      }

      throw new PublicationReviewApiError(
        json?.message ||
          `Failed to fetch publication review with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as PublicationReviewGetResponse;
  },

  async listReviews(
    params?: PublicationReviewListQueryParams,
    accessToken?: string,
  ): Promise<PublicationReviewListResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const query = new URLSearchParams();
    if (params?.artifact_type) query.set("artifact_type", params.artifact_type);
    if (params?.review_status) query.set("review_status", params.review_status);
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(Math.min(Math.max(params.limit, 1), 200)));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(Math.max(params.offset, 0)));
    }

    const queryString = query.toString();
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/publication-reviews${queryString ? `?${queryString}` : ""}`,
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
        const errData = json as PublicationReviewValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while fetching publication reviews.";
        throw new PublicationReviewApiError(message, 422, errData, rawErrors);
      }

      throw new PublicationReviewApiError(
        json?.message ||
          `Failed to fetch publication reviews with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as PublicationReviewListResponse;
  },

  async approveReview(
    reviewId: string,
    payload: PublicationReviewApproveRequest,
    accessToken?: string,
  ): Promise<PublicationReviewApproveResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/publication-reviews/${reviewId}/approve`,
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
        const errData = json as PublicationReviewValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while approving the publication review.";
        throw new PublicationReviewApiError(message, 422, errData, rawErrors);
      }

      throw new PublicationReviewApiError(
        json?.message ||
          `Failed to approve publication review with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as PublicationReviewApproveResponse;
  },

  async returnReview(
    reviewId: string,
    payload: PublicationReviewReturnRequest,
    accessToken?: string,
  ): Promise<PublicationReviewReturnResponse> {
    let token = accessToken;
    if (!token) {
      const session = await getSession();
      token = (session as { accessToken?: string } | null)?.accessToken;
    }

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/publication-reviews/${reviewId}/return`,
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
        const errData = json as PublicationReviewValidationErrorResponse;
        const rawErrors = Array.isArray(errData?.detail)
          ? errData.detail
          : undefined;
        const message =
          rawErrors?.map((error) => error.msg).join("; ") ||
          errData?.message ||
          "Validation error occurred while returning the publication review.";
        throw new PublicationReviewApiError(message, 422, errData, rawErrors);
      }

      throw new PublicationReviewApiError(
        json?.message ||
          `Failed to return publication review with status ${res.status}`,
        res.status,
        json,
      );
    }

    return json as PublicationReviewReturnResponse;
  },
};
