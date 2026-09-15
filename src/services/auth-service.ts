import {
  LoginRequest,
  LoginResponse,
  LoginErrorResponse,
  RefreshRequest,
  RefreshResponse,
  RefreshErrorResponse,
} from "@/types/auth";
import { fetchWithAuthHandling } from "@/services/api-client";

const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_GATEWAY_API_URL ||
  process.env.GATEWAY_API_URL ||
  "https://gateway.onesignaltech.com";

export class AuthApiError extends Error {
  status: number;
  data?: any;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    data?: any,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}

/**
 * Direct API client for Authentication Endpoints
 */
export const authService = {
  /**
   * Authenticate with email and password
   * POST /api/v1/auth/login
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 401) {
        const errorData = json as LoginErrorResponse;
        const detail =
          errorData?.data?.detail ||
          errorData?.message ||
          "Authentication failed. Please check your credentials.";
        throw new AuthApiError(detail, 401, errorData?.data, errorData?.errors);
      }

      if (res.status === 422) {
        const errorData = json as LoginErrorResponse;
        const msg =
          errorData?.message ||
          "Validation failed. Please check the provided information.";
        throw new AuthApiError(msg, 422, errorData?.data, errorData?.errors);
      }

      const fallbackMsg =
        json?.message || `Login failed with status ${res.status}`;
      throw new AuthApiError(fallbackMsg, res.status, json?.data, json?.errors);
    }

    return json as LoginResponse;
  },

  /**
   * Refresh access token using rotated refresh token
   * POST /api/v1/auth/refresh
   */
  async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
    const res = await fetchWithAuthHandling(
      `${GATEWAY_BASE_URL}/api/v1/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 401) {
        const errorData = json as RefreshErrorResponse;
        const detail =
          errorData?.data?.detail ||
          errorData?.message ||
          "Invalid, expired, or revoked refresh token.";
        throw new AuthApiError(detail, 401, errorData?.data, errorData?.errors);
      }

      if (res.status === 422) {
        const errorData = json as RefreshErrorResponse;
        const msg =
          errorData?.message || "Validation error while refreshing token.";
        throw new AuthApiError(msg, 422, errorData?.data, errorData?.errors);
      }

      const fallbackMsg =
        json?.message || `Token refresh failed with status ${res.status}`;
      throw new AuthApiError(fallbackMsg, res.status, json?.data, json?.errors);
    }

    return json as RefreshResponse;
  },
};
