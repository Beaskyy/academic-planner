"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CurriculumCreateRequest,
  CurriculumCreateResponse,
  CurriculumGetResponse,
  CurriculumCourseMappingCreateRequest,
  CurriculumCourseMappingCreateResponse,
  CurriculumCourseMappingListResponse,
  CurriculumListQueryParams,
  CurriculumListResponse,
  PinnedCurriculumQueryParams,
  PinnedCurriculumResponse,
  CurriculumSubmitRequest,
  CurriculumSubmitResponse,
} from "@/types/curricula";
import {
  curriculaService,
  CurriculumApiError,
} from "@/services/curricula-service";
import { useAuthSession } from "./use-auth";

export const CURRICULA_QUERY_KEY = ["curricula"] as const;
export const CURRICULUM_MAPPINGS_QUERY_KEY = [
  "curriculum-course-mappings",
] as const;

export function useCurriculum(curriculumId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CurriculumGetResponse, CurriculumApiError>({
    queryKey: [...CURRICULA_QUERY_KEY, "detail", curriculumId],
    queryFn: () => curriculaService.getCurriculum(curriculumId!, accessToken),
    enabled: Boolean(isAuthenticated && curriculumId),
  });
}

export function usePinnedCurriculum(params?: PinnedCurriculumQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<PinnedCurriculumResponse, CurriculumApiError>({
    queryKey: [...CURRICULA_QUERY_KEY, "pinned", params],
    queryFn: () => curriculaService.getPinnedCurriculum(params!, accessToken),
    enabled: Boolean(
      isAuthenticated && params?.programme_id && params?.cohort_intake,
    ),
  });
}

export function useListCourseMappings(curriculumId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CurriculumCourseMappingListResponse, CurriculumApiError>({
    queryKey: [...CURRICULUM_MAPPINGS_QUERY_KEY, curriculumId],
    queryFn: () =>
      curriculaService.listCourseMappings(curriculumId!, accessToken),
    enabled: Boolean(isAuthenticated && curriculumId),
  });
}

export function useListCurricula(params?: CurriculumListQueryParams) {
  const { accessToken } = useAuthSession();

  return useQuery<CurriculumListResponse, CurriculumApiError>({
    queryKey: [...CURRICULA_QUERY_KEY, params],
    queryFn: () => curriculaService.listCurricula(params, accessToken),
  });
}

/**
 * Hook for creating a curriculum using React Query mutation
 */
export function useCreateCurriculum() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumCreateResponse,
    CurriculumApiError,
    CurriculumCreateRequest
  >({
    mutationFn: async (payload: CurriculumCreateRequest) => {
      return curriculaService.createCurriculum(payload, accessToken);
    },
    onSuccess: () => {
      // Invalidate curricula query cache to ensure fresh state
      queryClient.invalidateQueries({ queryKey: CURRICULA_QUERY_KEY });
    },
  });
}

export function useSubmitCurriculum() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumSubmitResponse,
    CurriculumApiError,
    { curriculumId: string; payload: CurriculumSubmitRequest }
  >({
    mutationFn: ({ curriculumId, payload }) =>
      curriculaService.submitCurriculum(curriculumId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULA_QUERY_KEY });
    },
  });
}

export function useAddCourseMapping() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CurriculumCourseMappingCreateResponse,
    CurriculumApiError,
    { curriculumId: string; payload: CurriculumCourseMappingCreateRequest }
  >({
    mutationFn: ({ curriculumId, payload }) =>
      curriculaService.addCourseMapping(curriculumId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULA_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CURRICULUM_MAPPINGS_QUERY_KEY,
      });
    },
  });
}
