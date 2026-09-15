"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  CurriculumMigrationCreateRequest,
  CurriculumMigrationCreateResponse,
} from "@/types/curriculum-migrations";
import {
  CurriculumMigrationApiError,
  curriculumMigrationsService,
} from "@/services/curriculum-migrations-service";

export const CURRICULUM_MIGRATIONS_QUERY_KEY = ["curriculum-migrations"] as const;

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
      queryClient.invalidateQueries({ queryKey: CURRICULUM_MIGRATIONS_QUERY_KEY });
    },
  });
}
