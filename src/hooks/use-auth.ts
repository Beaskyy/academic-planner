'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginRequest, RefreshRequest, Workspace } from '@/types/auth';
import { authService, AuthApiError } from '@/services/auth-service';
import { getRoleDashboardRoute } from '@/lib/role-router';

export const AUTH_QUERY_KEY = ['auth', 'session'] as const;

/**
 * Hook for NextAuth credentials login mutation with React Query
 */
export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const callbackUrl = searchParams.get('callbackUrl');

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      // Execute NextAuth signIn
      const result = await signIn('credentials', {
        email: credentials.email.trim(),
        password: credentials.password,
        redirect: false,
      });

      if (!result) {
        throw new Error('No response from authentication server.');
      }

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      const session = await getSession();
      const workspaces = (session?.availableWorkspaces as any[]) ?? [];

      let target = callbackUrl && callbackUrl !== '/' && callbackUrl !== '/login' ? callbackUrl : null;
      if (!target) {
        if (workspaces.length > 1) {
          target = '/workspace-selector';
        } else {
          const roleName = (session?.activeRole as any)?.name ?? '';
          target = getRoleDashboardRoute(roleName);
        }
      }

      window.location.href = target;
    },
  });
}

/**
 * Direct API login mutation (independent of NextAuth session cookies if needed)
 */
export function useDirectLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return authService.login(credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}

/**
 * Direct API refresh token mutation
 */
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RefreshRequest) => {
      return authService.refresh(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}

/**
 * Custom hook to access authenticated session state and helpers
 */
export function useAuthSession() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  const logout = async (redirectUrl: string = '/login') => {
    await signOut({ callbackUrl: redirectUrl, redirect: true });
  };

  return {
    session,
    status,
    update,
    isAuthenticated,
    isLoading,
    isUnauthenticated,
    user: session?.user,
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    activeRole: session?.activeRole,
    availableWorkspaces: session?.availableWorkspaces,
    tokenExpired: session?.error === 'RefreshAccessTokenError',
    logout,
  };
}

/**
 * Hook for selecting a workspace from the workspace picker.
 * Updates the NextAuth session's activeRole and routes to the correct dashboard.
 */
export function useSelectWorkspace() {
  const { update } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: async (workspace: Workspace) => {
      // Update the session's activeRole to the selected workspace
      // The workspace name is used as the role indicator for routing
      await update({
        activeRole: { id: workspace.id, name: workspace.name },
      });
      return workspace;
    },
    onSuccess: (workspace) => {
      const route = getRoleDashboardRoute(workspace.name);
      window.location.href = route;
    },
  });
}
