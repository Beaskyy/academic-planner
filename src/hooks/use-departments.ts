"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  DepartmentGetResponse,
  DepartmentCreateRequest,
  DepartmentCreateResponse,
  DepartmentListQueryParams,
  DepartmentListResponse,
  DepartmentUpdateRequest,
  DepartmentUpdateResponse,
  DepartmentSubmitRequest,
  DepartmentSubmitResponse,
} from "@/types/departments";
import {
  DepartmentApiError,
  departmentsService,
} from "@/services/departments-service";

export const DEPARTMENTS_QUERY_KEY = ["departments"] as const;

export function useDepartment(departmentId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<DepartmentGetResponse, DepartmentApiError>({
    queryKey: [...DEPARTMENTS_QUERY_KEY, "detail", departmentId],
    queryFn: () => departmentsService.getDepartment(departmentId!, accessToken),
    enabled: Boolean(isAuthenticated && departmentId),
  });
}

export function useListDepartments(params?: DepartmentListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<DepartmentListResponse, DepartmentApiError>({
    queryKey: [...DEPARTMENTS_QUERY_KEY, params],
    queryFn: () => departmentsService.listDepartments(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    DepartmentCreateResponse,
    DepartmentApiError,
    DepartmentCreateRequest
  >({
    mutationFn: (payload) =>
      departmentsService.createDepartment(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    DepartmentUpdateResponse,
    DepartmentApiError,
    { departmentId: string; payload: DepartmentUpdateRequest }
  >({
    mutationFn: ({ departmentId, payload }) =>
      departmentsService.updateDepartment(departmentId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
    },
  });
}

export function useSubmitDepartment() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    DepartmentSubmitResponse,
    DepartmentApiError,
    { departmentId: string; payload: DepartmentSubmitRequest }
  >({
    mutationFn: ({ departmentId, payload }) =>
      departmentsService.submitDepartment(departmentId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
    },
  });
}
