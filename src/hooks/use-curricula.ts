'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CurriculumCreateRequest,
  CurriculumCreateResponse,
} from '@/types/curricula';
import { curriculaService, CurriculumApiError } from '@/services/curricula-service';
import { useAuthSession } from './use-auth';

export const CURRICULA_QUERY_KEY = ['curricula'] as const;

/**
 * Hook for creating a curriculum using React Query mutation
 */
export function useCreateCurriculum() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<CurriculumCreateResponse, CurriculumApiError, CurriculumCreateRequest>({
    mutationFn: async (payload: CurriculumCreateRequest) => {
      return curriculaService.createCurriculum(payload, accessToken);
    },
    onSuccess: () => {
      // Invalidate curricula query cache to ensure fresh state
      queryClient.invalidateQueries({ queryKey: CURRICULA_QUERY_KEY });
    },
  });
}
