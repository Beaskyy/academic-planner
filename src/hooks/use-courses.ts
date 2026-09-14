'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
} from '@/types/courses';
import { coursesService, CourseApiError } from '@/services/courses-service';
import { useAuthSession } from './use-auth';

export const COURSES_QUERY_KEY = ['courses'] as const;

/**
 * Hook for fetching list of courses with pagination and department filters using React Query
 */
export function useCourses(params?: CourseListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CourseListResponse, CourseApiError>({
    queryKey: [...COURSES_QUERY_KEY, 'list', params],
    queryFn: async () => {
      return coursesService.listCourses(params, accessToken);
    },
    // Only run query once user authentication state is resolved
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}

/**
 * Hook for fetching a single course by its UUID using React Query
 */
export function useCourse(courseId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CourseDetailResponse, CourseApiError>({
    queryKey: [...COURSES_QUERY_KEY, 'detail', courseId],
    queryFn: async () => {
      if (!courseId) throw new Error('Course ID is required');
      return coursesService.getCourse(courseId, accessToken);
    },
    enabled: Boolean(isAuthenticated && courseId),
    staleTime: 1000 * 60 * 2,
  });
}

/**
 * Hook for creating a course using React Query mutation
 */
export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<CourseCreateResponse, CourseApiError, CourseCreateRequest>({
    mutationFn: async (payload: CourseCreateRequest) => {
      return coursesService.createCourse(payload, accessToken);
    },
    onSuccess: () => {
      // Invalidate course catalogue query cache to ensure fresh list
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
    },
  });
}

/**
 * Hook for updating an existing course using React Query mutation
 */
export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseUpdateResponse,
    CourseApiError,
    { courseId: string; payload: CourseUpdateRequest }
  >({
    mutationFn: async ({ courseId, payload }) => {
      return coursesService.updateCourse(courseId, payload, accessToken);
    },
    onSuccess: () => {
      // Invalidate course catalogue query cache to ensure fresh list
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
    },
  });
}

/**
 * Hook for submitting a course for review using React Query mutation
 */
export function useSubmitCourse() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseSubmitResponse,
    CourseApiError,
    { courseId: string; payload: CourseSubmitRequest }
  >({
    mutationFn: async ({ courseId, payload }) => {
      return coursesService.submitCourse(courseId, payload, accessToken);
    },
    onSuccess: () => {
      // Invalidate course catalogue query cache to ensure fresh list
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
    },
  });
}
