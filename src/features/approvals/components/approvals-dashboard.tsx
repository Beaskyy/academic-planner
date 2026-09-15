"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useAuthSession } from "@/hooks/use-auth";
import { useListPublicationReviews } from "@/hooks/use-publication-reviews";
import { PublicationReviewResponseData } from "@/types/publication-reviews";
import {
  formatDateTime,
  formatReviewTitle,
  formatStatusLabel,
  isReviewPending,
} from "../review-display";

interface ApprovalsDashboardProps {
  onSelectProposal: (review: PublicationReviewResponseData) => void;
  onSelectOwnProposal: (review: PublicationReviewResponseData) => void;
  onSubmitNewReview: () => void;
}

export function ApprovalsDashboard({
  onSelectProposal,
  onSelectOwnProposal,
  onSubmitNewReview,
}: ApprovalsDashboardProps) {
  const [activeTab, setActiveTab] = useState<"my-approvals" | "awaiting" | "all">(
    "my-approvals",
  );
  const { user } = useAuthSession();
  const reviewsQuery = useListPublicationReviews({ limit: 200, offset: 0 });
  const reviews = reviewsQuery.data?.data.items ?? [];
  const userId = user?.id;
  const myReviews = reviews.filter((review) => review.maker_id === userId);
  const awaitingReviews = reviews.filter(
    (review) => isReviewPending(review) && review.maker_id !== userId,
  );

  const visibleOwnReviews =
    activeTab === "awaiting" ? [] : activeTab === "all" ? reviews : myReviews;
  const visibleAwaitingReviews =
    activeTab === "all"
      ? reviews.filter((review) => isReviewPending(review))
      : awaitingReviews;

  return (
    <div className="flex flex-col gap-6 max-w-[1160px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#808080]">
            Academic Planning
          </span>
          <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Approvals
          </h1>
        </div>

        <button
          type="button"
          onClick={onSubmitNewReview}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>Submit for Review</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white border border-[#f5f5f5] rounded-[8px] p-1 inline-flex items-center gap-1 self-start shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("my-approvals")}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === "my-approvals"
              ? "bg-[#f0f8ff] text-[#046aff] font-semibold"
              : "text-[#5c5c5c] font-medium hover:text-[#1f1f1f]"
          }`}
        >
          My Approvals
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("awaiting")}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === "awaiting"
              ? "bg-[#f0f8ff] text-[#046aff] font-semibold"
              : "text-[#5c5c5c] font-medium hover:text-[#1f1f1f]"
          }`}
        >
          Awaiting My Review ({awaitingReviews.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === "all"
              ? "bg-[#f0f8ff] text-[#046aff] font-semibold"
              : "text-[#5c5c5c] font-medium hover:text-[#1f1f1f]"
          }`}
        >
          All Submissions
        </button>
      </div>

      {reviewsQuery.isError && (
        <div
          role="alert"
          className="rounded-[12px] border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-[13px] text-[#B91C1C]"
        >
          {reviewsQuery.error.message}
        </div>
      )}

      {(activeTab === "my-approvals" || activeTab === "all") && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[14px] font-semibold text-[#5c5c5c]">
            {activeTab === "all" ? "All publication reviews" : "My Submitted Proposals"}
          </h2>

          <div className="flex flex-col gap-3">
            {reviewsQuery.isLoading && (
              <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 text-[13px] text-[#808080]">
                Loading publication reviews...
              </div>
            )}
            {!reviewsQuery.isLoading && visibleOwnReviews.length === 0 && (
              <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 text-[13px] text-[#808080]">
                No publication reviews found.
              </div>
            )}
            {visibleOwnReviews.map((review) => {
              const isOwn = review.maker_id === userId;
              return (
                <div
                  key={review.id}
                  onClick={() =>
                    isOwn ? onSelectOwnProposal(review) : onSelectProposal(review)
                  }
                  className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex items-center justify-between hover:border-[#d2e4ff] transition-all cursor-pointer group"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[14px] font-semibold text-[#0b0b0b] group-hover:text-[#046aff] transition-colors">
                      {formatReviewTitle(review)}
                    </h3>
                    <p className="text-[12px] text-[#808080]">
                      Submitted {formatDateTime(review.submitted_at)} • Status:{" "}
                      {formatStatusLabel(review.status)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#046aff] transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "my-approvals" && <div className="h-px bg-[#ebebeb] w-full my-1" />}

      {(activeTab === "my-approvals" || activeTab === "awaiting") && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[14px] font-semibold text-[#5c5c5c]">
            Awaiting My Review (Action Required)
          </h2>

          <div className="flex flex-col gap-4">
            {reviewsQuery.isLoading && (
              <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 text-[13px] text-[#808080]">
                Loading reviews awaiting action...
              </div>
            )}
            {!reviewsQuery.isLoading && visibleAwaitingReviews.length === 0 && (
              <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 text-[13px] text-[#808080]">
                No reviews are waiting for your decision.
              </div>
            )}
            {visibleAwaitingReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex flex-col gap-4 hover:border-[#d2e4ff] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[14px] font-semibold text-[#0b0b0b]">
                      {formatReviewTitle(review)}
                    </h3>
                    <p className="text-[12px] text-[#808080]">
                      Artifact {review.artifact_id} • Submitted{" "}
                      {formatDateTime(review.submitted_at)}
                    </p>
                  </div>
                  <span className="bg-[#7b7b7b] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    {formatStatusLabel(review.status)}
                  </span>
                </div>

                <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
                  <span className="font-semibold text-[#1f1f1f]">
                    Review ID:{" "}
                  </span>
                  <span>{review.id}</span>
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] font-semibold text-[#808080]">
                      Maker:
                    </span>
                    <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {review.maker_id}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      review.maker_id === userId
                        ? onSelectOwnProposal(review)
                        : onSelectProposal(review)
                    }
                    className="inline-flex items-center justify-center gap-1 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[8px] px-3.5 py-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Review Proposal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
