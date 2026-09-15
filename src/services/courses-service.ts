import {
  CourseCreateRequest,
  CourseCreateResponse,
  CourseUpdateRequest,
  CourseUpdateResponse,
  CourseSubmitRequest,
  CourseSubmitResponse,
  CourseDetailResponse,
  CourseListQueryParams,
  CourseListResponse,
  CourseValidationErrorResponse,
  ValidationErrorItem,
} from "@/types/courses";
import { getSession } from "next-auth/react";
import { fetchWithAuthHandling } from "@/services/api-client";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class CourseApiError extends Error {
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
    this.name = "CourseApiError";
    this.status = status;
    this.data = data;
    this.fieldErrors = fieldErrors;
    this.rawErrors = rawErrors;
  }
}

/**
 * Service for Courses API operations
 */
export const coursesService = {
  /**
   * List Courses with pagination & department filtering
   * GET /api/v1/courses
   * Auth Required
   */
  async listCourses(
    params?: CourseListQueryParams,
    accessToken?: string,
  ): Promise<CourseListResponse> {
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
    if (params?.department_id) {
      query.set("department_id", params.department_id);
    }
    if (params?.limit !== undefined && params.limit !== null) {
      query.set("limit", String(params.limit));
    }
    if (params?.offset !== undefined && params.offset !== null) {
      query.set("offset", String(params.offset));
    }

    const queryString = query.toString();
    const url = `${GATEWAY_BASE_URL}/api/v1/courses${queryString ? `?${queryString}` : ""}`;

    const res = await fetchWithAuthHandling(url, {
      method: "GET",
      headers,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CourseValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while fetching courses.";

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

        throw new CourseApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CourseApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message || `Failed to fetch courses with status ${res.status}`;
      throw new CourseApiError(message, res.status, json);
    }

    return json as CourseListResponse;
  },

  /**
   * Create a new Course
   * POST /api/v1/courses
   * Auth Required
   */
  async createCourse(
    payload: CourseCreateRequest,
    accessToken?: string,
  ): Promise<CourseCreateResponse> {
    // If no explicit token provided, retrieve from current NextAuth session
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
      `${GATEWAY_BASE_URL}/api/v1/courses`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CourseValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while creating course.";

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

        throw new CourseApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CourseApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message || `Failed to create course with status ${res.status}`;
      throw new CourseApiError(message, res.status, json);
    }

    return json as CourseCreateResponse;
  },

  /**
   * Get Course by ID
   * GET /api/v1/courses/{course_id}
   * Auth Required
   */
  async getCourse(
    courseId: string,
    accessToken?: string,
  ): Promise<CourseDetailResponse> {
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

    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/courses/${courseId}`,
      {
        method: "GET",
        headers,
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CourseValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while fetching course.";

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

        throw new CourseApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CourseApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      if (res.status === 404) {
        throw new CourseApiError(
          json?.message || "Course not found.",
          404,
          json,
        );
      }

      const message =
        json?.message || `Failed to fetch course with status ${res.status}`;
      throw new CourseApiError(message, res.status, json);
    }

    return json as CourseDetailResponse;
  },

  /**
   * Update an existing Course
   * PATCH /api/v1/courses/{course_id}
   * Auth Required
   */
  async updateCourse(
    courseId: string,
    payload: CourseUpdateRequest,
    accessToken?: string,
  ): Promise<CourseUpdateResponse> {
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
      `${GATEWAY_BASE_URL}/api/v1/courses/${courseId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CourseValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while updating course.";

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

        throw new CourseApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CourseApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message || `Failed to update course with status ${res.status}`;
      throw new CourseApiError(message, res.status, json);
    }

    return json as CourseUpdateResponse;
  },

  /**
   * Submit Course for review & lifecycle promotion
   * POST /api/v1/courses/{course_id}/submit
   * Auth Required
   */
  async submitCourse(
    courseId: string,
    payload: CourseSubmitRequest,
    accessToken?: string,
  ): Promise<CourseSubmitResponse> {
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
      `${GATEWAY_BASE_URL}/api/v1/courses/${courseId}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 422) {
        const errData = json as CourseValidationErrorResponse;
        const fieldErrors: Record<string, string> = {};
        let formattedMessage =
          "Validation error occurred while submitting course.";

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

        throw new CourseApiError(
          formattedMessage,
          422,
          errData,
          fieldErrors,
          Array.isArray(errData?.detail) ? errData.detail : undefined,
        );
      }

      if (res.status === 401) {
        throw new CourseApiError(
          "Authentication required or session expired. Please sign in again.",
          401,
          json,
        );
      }

      const message =
        json?.message || `Failed to submit course with status ${res.status}`;
      throw new CourseApiError(message, res.status, json);
    }

    return json as CourseSubmitResponse;
  },
};
