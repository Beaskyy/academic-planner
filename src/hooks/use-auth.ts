'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginRequest, RefreshRequest } from '@/types/auth';
import { authService, AuthApiError } from '@/services/auth-service';

export const AUTH_QUERY_KEY = ['auth', 'session'] as const;

/**
 * Hook for NextAuth credentials login mutation with React Query
 */
export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

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
      router.push(callbackUrl);
      router.refresh();
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
