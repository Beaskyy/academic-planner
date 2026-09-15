"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  FacultyGetResponse,
  FacultyCreateRequest,
  FacultyCreateResponse,
  FacultyListQueryParams,
  FacultyListResponse,
  FacultyUpdateRequest,
  FacultyUpdateResponse,
  FacultySubmitRequest,
  FacultySubmitResponse,
} from "@/types/faculties";
import {
  FacultyApiError,
  facultiesService,
} from "@/services/faculties-service";

export const FACULTIES_QUERY_KEY = ["faculties"] as const;

export function useFaculty(facultyId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<FacultyGetResponse, FacultyApiError>({
    queryKey: [...FACULTIES_QUERY_KEY, "detail", facultyId],
    queryFn: () => facultiesService.getFaculty(facultyId!, accessToken),
    enabled: Boolean(isAuthenticated && facultyId),
  });
}

export function useListFaculties(params?: FacultyListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<FacultyListResponse, FacultyApiError>({
    queryKey: [...FACULTIES_QUERY_KEY, params],
    queryFn: () => facultiesService.listFaculties(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateFaculty() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    FacultyCreateResponse,
    FacultyApiError,
    FacultyCreateRequest
  >({
    mutationFn: (payload) =>
      facultiesService.createFaculty(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACULTIES_QUERY_KEY });
    },
  });
}

export function useUpdateFaculty() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    FacultyUpdateResponse,
    FacultyApiError,
    { facultyId: string; payload: FacultyUpdateRequest }
  >({
    mutationFn: ({ facultyId, payload }) =>
      facultiesService.updateFaculty(facultyId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACULTIES_QUERY_KEY });
    },
  });
}

export function useSubmitFaculty() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    FacultySubmitResponse,
    FacultyApiError,
    { facultyId: string; payload: FacultySubmitRequest }
  >({
    mutationFn: ({ facultyId, payload }) =>
      facultiesService.submitFaculty(facultyId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACULTIES_QUERY_KEY });
    },
  });
}
