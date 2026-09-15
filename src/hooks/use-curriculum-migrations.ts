"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  CurriculumMigrationCreateRequest,
  CurriculumMigrationCreateResponse,
  CurriculumMigrationListQueryParams,
  CurriculumMigrationListResponse,
  CurriculumMigrationSubmitRequest,
  CurriculumMigrationSubmitResponse,
  CurriculumMigrationApproveResponse,
  CurriculumMigrationRejectResponse,
  CurriculumMigrationPreviewResponse,
  CurriculumMigrationGetResponse,
} from "@/types/curriculum-migrations";
import {
  CurriculumMigrationApiError,
  curriculumMigrationsService,
} from "@/services/curriculum-migrations-service";

export const CURRICULUM_MIGRATIONS_QUERY_KEY = [
  "curriculum-migrations",
] as const;

export function useCurriculumMigration(migrationId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CurriculumMigrationGetResponse, CurriculumMigrationApiError>({
    queryKey: [...CURRICULUM_MIGRATIONS_QUERY_KEY, "detail", migrationId],
    queryFn: () => curriculumMigrationsService.getMigration(migrationId!, accessToken),
    enabled: Boolean(isAuthenticated && migrationId),
  });
}

export function usePreviewCurriculumMigration(migrationId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CurriculumMigrationPreviewResponse, CurriculumMigrationApiError>({
    queryKey: [...CURRICULUM_MIGRATIONS_QUERY_KEY, "preview", migrationId],
    queryFn: () => curriculumMigrationsService.previewMigration(migrationId!, accessToken),
    enabled: Boolean(isAuthenticated && migrationId),
  });
}

export function useListCurriculumMigrations(
  params?: CurriculumMigrationListQueryParams,
) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CurriculumMigrationListResponse, CurriculumMigrationApiError>({
    queryKey: [...CURRICULUM_MIGRATIONS_QUERY_KEY, params],
    queryFn: () => curriculumMigrationsService.listMigrations(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateCurriculumMigration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumMigrationCreateResponse,
    CurriculumMigrationApiError,
    CurriculumMigrationCreateRequest
  >({
    mutationFn: (payload) =>
      curriculumMigrationsService.createMigration(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CURRICULUM_MIGRATIONS_QUERY_KEY,
      });
    },
  });
}

export function useSubmitCurriculumMigration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumMigrationSubmitResponse,
    CurriculumMigrationApiError,
    { migrationId: string; payload: CurriculumMigrationSubmitRequest }
  >({
    mutationFn: ({ migrationId, payload }) =>
      curriculumMigrationsService.submitMigration(migrationId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_MIGRATIONS_QUERY_KEY });
    },
  });
}

export function useApproveCurriculumMigration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumMigrationApproveResponse,
    CurriculumMigrationApiError,
    { migrationId: string; payload: CurriculumMigrationSubmitRequest }
  >({
    mutationFn: ({ migrationId, payload }) =>
      curriculumMigrationsService.approveMigration(migrationId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_MIGRATIONS_QUERY_KEY });
    },
  });
}

export function useRejectCurriculumMigration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumMigrationRejectResponse,
    CurriculumMigrationApiError,
    { migrationId: string; payload: CurriculumMigrationSubmitRequest }
  >({
    mutationFn: ({ migrationId, payload }) =>
      curriculumMigrationsService.rejectMigration(migrationId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_MIGRATIONS_QUERY_KEY });
    },
  });
}
