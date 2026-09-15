'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { useListPublicationReviews } from '@/hooks/use-publication-reviews';
import {
  formatDateTime,
  formatReviewTitle,
  formatStatusLabel,
} from '@/features/approvals/review-display';

interface VersionHistoryProps {
  isFailureState?: boolean;
  onToggleFailureState?: (failed: boolean) => void;
}

export function VersionHistory({
  isFailureState = false,
  onToggleFailureState,
}: VersionHistoryProps) {
  const router = useRouter();
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [artifactTypeFilter, setArtifactTypeFilter] = useState('All');
  const [isRetrying, setIsRetrying] = useState(false);
  const reviewsQuery = useListPublicationReviews({ limit: 200, offset: 0 });
  const reviews = reviewsQuery.data?.data.items ?? [];

  const artifactTypes = useMemo(
    () =>
      Array.from(new Set(reviews.map((review) => review.artifact_type))).sort(),
    [reviews],
  );

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = `${formatReviewTitle(review)} ${review.id} ${review.artifact_id}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      artifactTypeFilter === 'All' || review.artifact_type === artifactTypeFilter;
    return matchesSearch && matchesType;
  });

  const selectedReview =
    filteredReviews.find((review) => review.id === selectedReviewId) ??
    filteredReviews[0];

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      if (onToggleFailureState) {
        onToggleFailureState(false);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by artifact or version..."
            className="w-full bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[13px] text-[#1f1f1f] placeholder:text-[#808080] focus:outline-none focus:border-[#046aff] shadow-2xs"
          />
        </div>

        <div className="relative">
          <select
            value={artifactTypeFilter}
            onChange={(e) => setArtifactTypeFilter(e.target.value)}
            className="bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[14px] font-medium text-[#5c5c5c] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-8 shadow-2xs"
          >
            <option value="All">Artifact Type: All</option>
            {artifactTypes.map((type) => (
              <option key={type} value={type}>
                {formatStatusLabel(type)}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>
      </div>

      {reviewsQuery.isError && (
        <div
          role="alert"
          className="rounded-[12px] border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-[13px] text-[#B91C1C]"
        >
          {reviewsQuery.error.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        <div className="lg:col-span-7 flex flex-col gap-4">
          {isFailureState && (
            <div className="bg-white border-2 border-[#fb3748] rounded-[16px] p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#fb3748] shrink-0 mt-1" />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                      Publication delivery failed
                    </h3>
                    <span className="bg-[#fb3748] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      PUBLICATION FAILED
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#fbd5c0] rounded-[10px] p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-[#fb3748] text-[13px] font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Status: Partial — retry downstream events</span>
                </div>
              </div>
            </div>
          )}

          {reviewsQuery.isLoading && (
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 text-[13px] text-[#808080]">
              Loading publication reviews...
            </div>
          )}

          {!reviewsQuery.isLoading && filteredReviews.length === 0 && (
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 text-[13px] text-[#808080]">
              No publication reviews found.
            </div>
          )}

          {filteredReviews.map((review) => {
            const isSelected = selectedReview?.id === review.id;
            return (
              <div
                key={review.id}
                onClick={() => setSelectedReviewId(review.id)}
                className={`bg-white rounded-[16px] p-5 shadow-xs flex flex-col gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#046aff]'
                    : 'border border-[#ebebeb] hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 mt-1 ${
                      isSelected ? 'bg-[#046aff]' : 'bg-[#808080]'
                    }`}
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[#0b0b0b]">
                          v{review.artifact_version_number}
                        </span>
                        <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                          {formatReviewTitle(review)}
                        </h3>
                      </div>
                      <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {formatStatusLabel(review.status)}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#808080]">
                      Submitted {formatDateTime(review.submitted_at)}
                      {review.decided_at
                        ? ` • Decided ${formatDateTime(review.decided_at)}`
                        : ''}
                    </p>
                  </div>
                </div>
                {review.reason && (
                  <div className="bg-[#fafafa] rounded-[8px] p-3.5 ml-6">
                    <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Decision note
                    </span>
                    <p className="text-[12px] text-[#1f1f1f] leading-relaxed">
                      {review.reason}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {isFailureState ? (
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#0b0b0b]">
                Recovery &amp; Action Center
              </h3>
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{isRetrying ? 'Retrying Failed Events...' : 'Retry Failed Events'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#0b0b0b]">
                {selectedReview
                  ? `${formatReviewTitle(selectedReview)} details`
                  : 'Review details'}
              </h3>
              {selectedReview ? (
                <div className="space-y-3 text-[13px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#808080]">Artifact Type</span>
                    <span className="font-semibold text-[#1f1f1f]">
                      {formatStatusLabel(selectedReview.artifact_type)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#808080]">Artifact ID</span>
                    <span className="font-semibold font-mono text-[#1f1f1f] break-all text-right">
                      {selectedReview.artifact_id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#808080]">Review ID</span>
                    <span className="font-semibold font-mono text-[#1f1f1f] break-all text-right">
                      {selectedReview.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#808080]">Decision</span>
                    <span className="font-semibold text-[#1f1f1f]">
                      {formatStatusLabel(selectedReview.decision)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#808080]">Row version</span>
                    <span className="font-semibold text-[#1f1f1f]">
                      {selectedReview.row_version}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] text-[#808080]">
                  Select a publication review to inspect its details.
                </p>
              )}
              <button
                type="button"
                onClick={() => router.push('/approvals')}
                className="w-full py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Open in approvals</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
