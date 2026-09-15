"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  CourseOfferingCreateRequest,
  CourseOfferingCreateResponse,
  CourseOfferingUpdateRequest,
  CourseOfferingUpdateResponse,
  CourseOfferingSubmitRequest,
  CourseOfferingSubmitResponse,
  CourseOfferingOpenRegistrationRequest,
  CourseOfferingOpenRegistrationResponse,
  CourseOfferingCloseRegistrationRequest,
  CourseOfferingCloseRegistrationResponse,
  CourseOfferingCancelRequest,
  CourseOfferingCancelResponse,
  CourseOfferingGetResponse,
  CourseOfferingListQueryParams,
  CourseOfferingListResponse,
} from "@/types/course-offerings";
import {
  CourseOfferingApiError,
  courseOfferingsService,
} from "@/services/course-offerings-service";

export const COURSE_OFFERINGS_QUERY_KEY = ["course-offerings"] as const;

export function useCourseOffering(offeringId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CourseOfferingGetResponse, CourseOfferingApiError>({
    queryKey: [...COURSE_OFFERINGS_QUERY_KEY, "detail", offeringId],
    queryFn: () => courseOfferingsService.getOffering(offeringId!, accessToken),
    enabled: Boolean(isAuthenticated && offeringId),
  });
}

export function useListCourseOfferings(params?: CourseOfferingListQueryParams) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<CourseOfferingListResponse, CourseOfferingApiError>({
    queryKey: [...COURSE_OFFERINGS_QUERY_KEY, params],
    queryFn: () => courseOfferingsService.listOfferings(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useCreateCourseOffering() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingCreateResponse,
    CourseOfferingApiError,
    CourseOfferingCreateRequest
  >({
    mutationFn: (payload) =>
      courseOfferingsService.createOffering(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}

export function useUpdateCourseOffering() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingUpdateResponse,
    CourseOfferingApiError,
    { offeringId: string; payload: CourseOfferingUpdateRequest }
  >({
    mutationFn: ({ offeringId, payload }) =>
      courseOfferingsService.updateOffering(offeringId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}

export function useSubmitCourseOffering() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingSubmitResponse,
    CourseOfferingApiError,
    { offeringId: string; payload: CourseOfferingSubmitRequest }
  >({
    mutationFn: ({ offeringId, payload }) =>
      courseOfferingsService.submitOffering(offeringId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}

export function useOpenCourseOfferingRegistration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingOpenRegistrationResponse,
    CourseOfferingApiError,
    { offeringId: string; payload: CourseOfferingOpenRegistrationRequest }
  >({
    mutationFn: ({ offeringId, payload }) =>
      courseOfferingsService.openOfferingRegistration(
        offeringId,
        payload,
        accessToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}

export function useCloseCourseOfferingRegistration() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingCloseRegistrationResponse,
    CourseOfferingApiError,
    { offeringId: string; payload: CourseOfferingCloseRegistrationRequest }
  >({
    mutationFn: ({ offeringId, payload }) =>
      courseOfferingsService.closeOfferingRegistration(
        offeringId,
        payload,
        accessToken,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}

export function useCancelCourseOffering() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    CourseOfferingCancelResponse,
    CourseOfferingApiError,
    { offeringId: string; payload: CourseOfferingCancelRequest }
  >({
    mutationFn: ({ offeringId, payload }) =>
      courseOfferingsService.cancelOffering(offeringId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_OFFERINGS_QUERY_KEY });
    },
  });
}
