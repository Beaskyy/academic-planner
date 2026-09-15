"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  ProgrammeCreateRequest,
  ProgrammeCreateResponse,
  ProgrammeListQueryParams,
  ProgrammeListResponse,
  ProgrammeUpdateRequest,
  ProgrammeUpdateResponse,
} from "@/types/programmes";
import {
  ProgrammeApiError,
  programmesService,
} from "@/services/programmes-service";

export const PROGRAMMES_QUERY_KEY = ["programmes"] as const;

export function useListProgrammes(params?: ProgrammeListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<ProgrammeListResponse, ProgrammeApiError>({
    queryKey: [...PROGRAMMES_QUERY_KEY, params],
    queryFn: () => programmesService.listProgrammes(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateProgramme() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    ProgrammeCreateResponse,
    ProgrammeApiError,
    ProgrammeCreateRequest
  >({
    mutationFn: (payload) =>
      programmesService.createProgramme(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRAMMES_QUERY_KEY });
    },
  });
}

export function useUpdateProgramme() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    ProgrammeUpdateResponse,
    ProgrammeApiError,
    { programmeId: string; payload: ProgrammeUpdateRequest }
  >({
    mutationFn: ({ programmeId, payload }) =>
      programmesService.updateProgramme(programmeId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRAMMES_QUERY_KEY });
    },
  });
}
