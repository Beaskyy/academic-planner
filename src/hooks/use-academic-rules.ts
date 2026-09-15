"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AcademicRuleCreateRequest,
  AcademicRuleCreateResponse,
  AcademicRuleGetResponse,
  AcademicRuleListQueryParams,
  AcademicRuleListResponse,
  AcademicRuleSubmitRequest,
  AcademicRuleSubmitResponse,
} from "@/types/academic-rules";
import {
  AcademicRuleApiError,
  academicRulesService,
} from "@/services/academic-rules-service";
import { useAuthSession } from "./use-auth";

export const ACADEMIC_RULES_QUERY_KEY = ["academic-rules"] as const;

export function useAcademicRule(ruleId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<AcademicRuleGetResponse, AcademicRuleApiError>({
    queryKey: [...ACADEMIC_RULES_QUERY_KEY, "detail", ruleId],
    queryFn: () => academicRulesService.getRule(ruleId!, accessToken),
    enabled: Boolean(isAuthenticated && ruleId),
  });
}

export function useListAcademicRules(params?: AcademicRuleListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<AcademicRuleListResponse, AcademicRuleApiError>({
    queryKey: [...ACADEMIC_RULES_QUERY_KEY, params],
    queryFn: () => academicRulesService.listRules(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateAcademicRule() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    AcademicRuleCreateResponse,
    AcademicRuleApiError,
    AcademicRuleCreateRequest
  >({
    mutationFn: (payload) =>
      academicRulesService.createRule(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACADEMIC_RULES_QUERY_KEY });
    },
  });
}

export function useSubmitAcademicRule() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    AcademicRuleSubmitResponse,
    AcademicRuleApiError,
    { ruleId: string; payload: AcademicRuleSubmitRequest }
  >({
    mutationFn: ({ ruleId, payload }) =>
      academicRulesService.submitRule(ruleId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACADEMIC_RULES_QUERY_KEY });
    },
  });
}
