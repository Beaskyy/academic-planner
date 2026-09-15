'use client';

import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { usePublicationReview } from '@/hooks/use-publication-reviews';
import {
  formatDateTime,
  formatReviewTitle,
  formatStatusLabel,
} from '../review-display';

interface ApprovalDetailProps {
  reviewId: string;
  onBackToQueue: () => void;
  onOpenReturnDialog: () => void;
  onOpenApproveDialog: () => void;
  onSwitchToMakerView?: () => void;
}

export function ApprovalDetail({
  reviewId,
  onBackToQueue,
  onOpenReturnDialog,
  onOpenApproveDialog,
  onSwitchToMakerView,
}: ApprovalDetailProps) {
  const reviewQuery = usePublicationReview(reviewId);
  const review = reviewQuery.data?.data;
  return (
    <div className="flex flex-col gap-6 max-w-[1240px] pb-20">
      {/* ── Breadcrumb & Page Title ───────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-[#808080]">
          <button
            onClick={onBackToQueue}
            className="hover:text-[#1f1f1f] transition-colors"
          >
            Approvals
          </button>
          <span>&gt;</span>
          <span>{review ? formatReviewTitle(review) : "Publication review"}</span>
          <span>&gt;</span>
          <span className="font-semibold text-[#0b0b0b]">Review</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
            {review ? `Review ${formatReviewTitle(review)}` : "Review publication"}
          </h1>
          {onSwitchToMakerView && (
            <button
              onClick={onSwitchToMakerView}
              className="text-xs font-medium text-[#fa7319] hover:underline bg-[#fef3ec] px-3 py-1.5 rounded-lg border border-[#fbd5c0] self-start sm:self-auto"
            >
              Switch to Maker Persona (Self-Approval Blocked)
            </button>
          )}
        </div>
      </div>

      {reviewQuery.isError && (
        <div
          role="alert"
          className="rounded-[12px] border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-[13px] text-[#B91C1C]"
        >
          {reviewQuery.error.message}
        </div>
      )}

      {/* ── Artifact Header Card ────────────────────────────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-[#f4ebff] text-[#7f56d9] text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {review ? formatStatusLabel(review.artifact_type) : 'Publication'}
            </span>
            <span className="text-[13px] font-normal text-[#808080]">
              ID: {review?.artifact_id ?? reviewId}
            </span>
          </div>
          <h2 className="text-[20px] font-bold text-[#0b0b0b]">
            {review ? formatReviewTitle(review) : 'Loading publication review...'}
          </h2>
          <p className="text-[13px] text-[#5c5c5c]">
            Submitted {review ? formatDateTime(review.submitted_at) : '—'}
            {review?.reason ? ` • ${review.reason}` : ''}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#1fc16b] bg-[#e0faec] px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-4 h-4" /> {review ? formatStatusLabel(review.status) : 'Loading'}
        </div>
      </div>

      {/* ── Content Grid (Left Panels + Right Sidebar) ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Timeline Comparison Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-5">
            <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
              Before / After Timeline Comparison
            </h3>

            {/* Timeline Visualizer */}
            <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 space-y-4">
              {/* Current Row */}
              <div className="space-y-2">
                <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Current Schedule (Semester 1)
                </span>
                <div className="flex items-stretch gap-1.5 h-9 overflow-x-auto text-[11px] font-medium">
                  <div className="flex-1 bg-[#e1e4ea] text-[#1f1f1f] rounded-[6px] px-3 flex items-center min-w-[130px]">
                    Weeks 1-12: Instruction
                  </div>
                  <div className="w-[120px] bg-[#ffd9c0] text-[#71330a] rounded-[6px] px-3 flex items-center shrink-0">
                    Week 13: Reading
                  </div>
                  <div className="w-[140px] bg-[#e1e4ea] text-[#1f1f1f] rounded-[6px] px-3 flex items-center shrink-0">
                    Weeks 14-15: Exams
                  </div>
                </div>
              </div>

              {/* Proposed Row */}
              <div className="space-y-2">
                <span className="block text-[11px] font-semibold text-[#046aff] uppercase tracking-wider">
                  Proposed Amendment (Slide Back 3 Days)
                </span>
                <div className="flex items-stretch gap-1.5 h-9 overflow-x-auto text-[11px] font-medium">
                  <div className="flex-1 bg-[#e1e4ea] text-[#1f1f1f] rounded-[6px] px-3 flex items-center min-w-[130px]">
                    Weeks 1-12: Instruction
                  </div>
                  <div className="w-[140px] bg-[#e0faec] border border-[#1fc16b] text-[#1fc16b] font-semibold rounded-[6px] px-3 flex items-center shrink-0 shadow-xs">
                    Week 13: Slide Back 3D
                  </div>
                  <div className="w-[140px] bg-[#e1e4ea] text-[#1f1f1f] rounded-[6px] px-3 flex items-center shrink-0">
                    Weeks 14-15: Exams
                  </div>
                </div>
              </div>
            </div>

            {/* Property Diff Details Table */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-3 pb-2 border-b border-[#f5f5f5] text-[12px] font-semibold text-[#808080]">
                <div>Property</div>
                <div>Old Value</div>
                <div>New Value</div>
              </div>
              <div className="grid grid-cols-3 py-2 text-[13px] border-b border-gray-50 items-center">
                <div className="font-medium text-[#1f1f1f]">Semester 1 Start Date</div>
                <div className="text-[#dc2626] line-through">12 Oct 2026</div>
                <div className="font-semibold text-[#1fc16b]">09 Oct 2026</div>
              </div>
              <div className="grid grid-cols-3 py-2 text-[13px] items-center">
                <div className="font-medium text-[#1f1f1f]">Reading Week Overlap</div>
                <div className="text-[#dc2626] line-through">Overlaps Regional Holiday</div>
                <div className="font-semibold text-[#1fc16b]">Adjusted (No Overlap)</div>
              </div>
            </div>
          </div>

          {/* Validation & Dependency Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-6">
            {/* Validation Section */}
            <div className="space-y-3">
              <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
                Validation Evidence
              </h3>
              <div className="space-y-2 text-[13px] text-[#1f1f1f]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1fc16b] shrink-0" />
                  <span>No scheduling overlaps across joint departments</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1fc16b] shrink-0" />
                  <span>Meets NUC minimum active teaching days criteria (75 days)</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#f5f5f5] w-full" />

            {/* Dependency Section */}
            <div className="space-y-3">
              <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
                Dependency Freshness
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#fafafa] text-[13px]">
                  <span className="font-medium text-[#1f1f1f]">
                    Academic Structures &amp; Programmes
                  </span>
                  <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Active (v4)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#fafafa] text-[13px]">
                  <span className="font-medium text-[#1f1f1f]">
                    Venues &amp; Lecture Halls Database
                  </span>
                  <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Active (v12)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Impact Assessment Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-4">
            <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
              Impact Assessment
            </h3>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-[#5c5c5c]">Affected Programmes</span>
                <span className="font-bold text-[#0b0b0b]">8 Programmes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5c5c5c]">Impacted Cohorts</span>
                <span className="font-bold text-[#0b0b0b]">24 Cohorts</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[#5c5c5c]">Total Affected Students</span>
                <span className="font-bold text-[#046aff] text-[15px]">4,120 Students</span>
              </div>
            </div>
          </div>

          {/* Warnings & Overrides Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
                Warnings &amp; Overrides
              </h3>
              <span className="bg-[#fa7319] text-white text-[11px] font-medium px-2 py-0.5 rounded-full uppercase">
                1 Warning
              </span>
            </div>

            <div className="bg-[#fef3ec] rounded-[8px] p-3 space-y-1">
              <h4 className="text-[13px] font-semibold text-[#f97316]">
                Room Calibration Delay
              </h4>
              <p className="text-[12px] text-[#1f1f1f] leading-relaxed">
                PHY 102 laboratory practical slots will start 3 days late due to machine alignment.
              </p>
            </div>

            <div className="space-y-1">
              <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Override Record
              </span>
              <p className="text-[12px] text-[#5c5c5c]">
                Approved by Dean of Faculty on Jan 11 (Reason: Equipment Maintenance Schedule)
              </p>
            </div>
          </div>

          {/* Notification Scope Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-3">
            <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
              Notification Scope
            </h3>
            <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
              Upon publication, automatic notices will be distributed via CampusOS:
            </p>
            <ul className="space-y-1.5 text-[13px] text-[#1f1f1f]">
              <li className="flex items-center gap-2">
                <span className="text-[#808080]">•</span>
                <span>Academic Registry (Admin Feed)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#808080]">•</span>
                <span>All Assigned Lecturers (Email &amp; Feed)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#808080]">•</span>
                <span>Enrolled Student Portals (Syllabus Alert)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Decision Block / Sticky Bottom Action Bar ─────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex flex-col gap-1 max-w-[520px]">
          <h4 className="text-[14px] font-semibold text-[#1f1f1f]">
            Confirm Decision
          </h4>
          <p className="text-[12px] text-[#808080]">
            As non-submitting administrator, you are eligible to approve. Action will publish to the live catalogue.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenReturnDialog}
            className="px-4 py-2.5 rounded-[10px] text-[14px] font-medium border border-[#dc2626] text-[#dc2626] hover:bg-rose-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Return to Draft
          </button>
          <button
            type="button"
            onClick={onOpenApproveDialog}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>Approve &amp; Publish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
