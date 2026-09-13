export interface ActiveRole {
  id: string;
  name: string;
}

export interface Workspace {
  id: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  active_role?: ActiveRole;
  available_workspaces?: Workspace[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
  correlation_id?: string;
}

export interface LoginErrorData {
  detail?: string;
  errors?: string[];
}

export interface ValidationErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginErrorResponse {
  success?: boolean;
  message: string;
  data?: LoginErrorData;
  correlation_id?: string;
  errors?: Record<string, string[]>;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponseData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: RefreshResponseData;
  correlation_id?: string;
}

export interface RefreshErrorResponse {
  success?: boolean;
  message: string;
  data?: {
    detail?: string;
    errors?: string[];
  };
  correlation_id?: string;
  errors?: Record<string, string[]>;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  tokenType: string;
  activeRole?: ActiveRole;
  availableWorkspaces?: Workspace[];
}
