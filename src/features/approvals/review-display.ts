import { PublicationReviewResponseData } from "@/types/publication-reviews";

export function formatReviewTitle(review: PublicationReviewResponseData) {
  const artifactType = review.artifact_type.replace(/[_-]/g, " ");
  return `${artifactType} v${review.artifact_version_number}`;
}

export function formatDateTime(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function formatStatusLabel(value?: string | null) {
  if (!value) return "Unknown";
  return value.replace(/[_-]/g, " ");
}

export function isReviewPending(review: PublicationReviewResponseData) {
  const status = (review.status || "").toLowerCase();
  const decision = (review.decision || "").toLowerCase();
  if (decision && !["pending", "none", "null"].includes(decision)) {
    return false;
  }
  return !["approved", "returned", "rejected", "cancelled", "published"].includes(
    status,
  );
}
