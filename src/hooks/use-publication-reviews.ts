"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./use-auth";
import {
  PublicationReviewApproveRequest,
  PublicationReviewApproveResponse,
  PublicationReviewReturnRequest,
  PublicationReviewReturnResponse,
  PublicationReviewGetResponse,
  PublicationReviewListQueryParams,
  PublicationReviewListResponse,
} from "@/types/publication-reviews";
import {
  PublicationReviewApiError,
  publicationReviewsService,
} from "@/services/publication-reviews-service";

export const PUBLICATION_REVIEWS_QUERY_KEY = ["publication-reviews"] as const;

export function usePublicationReview(reviewId?: string) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<PublicationReviewGetResponse, PublicationReviewApiError>({
    queryKey: [...PUBLICATION_REVIEWS_QUERY_KEY, "detail", reviewId],
    queryFn: () => publicationReviewsService.getReview(reviewId!, accessToken),
    enabled: Boolean(isAuthenticated && reviewId),
  });
}

export function useListPublicationReviews(
  params?: PublicationReviewListQueryParams,
) {
  const { accessToken, isAuthenticated } = useAuthSession();

  return useQuery<PublicationReviewListResponse, PublicationReviewApiError>({
    queryKey: [...PUBLICATION_REVIEWS_QUERY_KEY, params],
    queryFn: () => publicationReviewsService.listReviews(params, accessToken),
    enabled: isAuthenticated,
  });
}

export function useApprovePublicationReview() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    PublicationReviewApproveResponse,
    PublicationReviewApiError,
    { reviewId: string; payload: PublicationReviewApproveRequest }
  >({
    mutationFn: ({ reviewId, payload }) =>
      publicationReviewsService.approveReview(reviewId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PUBLICATION_REVIEWS_QUERY_KEY,
      });
    },
  });
}

export function useReturnPublicationReview() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthSession();

  return useMutation<
    PublicationReviewReturnResponse,
    PublicationReviewApiError,
    { reviewId: string; payload: PublicationReviewReturnRequest }
  >({
    mutationFn: ({ reviewId, payload }) =>
      publicationReviewsService.returnReview(reviewId, payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PUBLICATION_REVIEWS_QUERY_KEY,
      });
    },
  });
}
