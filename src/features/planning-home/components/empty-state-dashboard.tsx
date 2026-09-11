'use client';

import React from 'react';
import { CalendarPlus, ChevronRight, Menu } from 'lucide-react';
import { StatusTag } from './status-tag';

interface EmptyStateDashboardProps {
  onPreparePeriod: () => void;
  onOpenMobileMenu?: () => void;
}

export function EmptyStateDashboard({ onPreparePeriod, onOpenMobileMenu }: EmptyStateDashboardProps) {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        {/* Title and Period */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="lg:hidden p-1.5 rounded-lg border border-[#ebebeb] text-[#1f1f1f] hover:bg-[#f5f5f5]"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Planning Home
            </h1>
          </div>
          <div className="flex items-center gap-2 pl-0.5">
            <span className="w-2 h-2 rounded-full bg-[#808080] shrink-0" />
            <p className="text-[14px] font-medium text-[#5c5c5c]">
              No Active Period — Configure Next Period
            </p>
          </div>
        </div>

        {/* Completeness */}
        <div className="flex flex-col items-end gap-1.5 self-start md:self-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[12px] font-medium text-[#808080]">Plan Completeness</span>
            <span className="text-[14px] font-bold text-[#808080]">0%</span>
          </div>
          <div className="w-[120px] h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden" />
        </div>
      </div>

      {/* ── Inactive Metrics Cards Row (5 cards) ────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {['Structures', 'Calendar', 'Offerings', 'Conflicts', 'Assignments'].map((metric, idx) => (
          <div
            key={metric}
            className={`bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between ${
              idx === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
              {metric}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">—</span>
              <StatusTag label="Inactive" variant="inactive" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Empty Content Cards ────────────────────────────────────── */}
      <div className="flex flex-col gap-6 max-w-[760px] mx-auto w-full pt-2">
        {/* Onboarding Card */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-8 sm:p-10 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col items-center text-center gap-6">
          {/* Illustration Container */}
          <div className="w-24 h-24 rounded-full bg-[#f0f8ff] flex items-center justify-center text-[#046aff] shrink-0">
            <CalendarPlus className="w-12 h-12" />
          </div>

          <div className="flex flex-col gap-2 max-w-[520px]">
            <h2 className="text-[24px] font-bold text-[#0b0b0b] leading-tight">
              No Upcoming Academic Period
            </h2>
            <p className="text-[14px] text-[#5c5c5c] leading-relaxed">
              There are no active or upcoming academic periods configured for this school. Start by
              preparing your next academic period.
            </p>
          </div>

          <button
            onClick={onPreparePeriod}
            className="inline-flex items-center justify-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none"
          >
            <span>Prepare Next Period</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Workflow Checklist Card */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 sm:p-7 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5">
          <h3 className="text-[18px] font-semibold text-[#0b0b0b]">
            Understanding the Planning Workflow
          </h3>

          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#f0f8ff] text-[#046aff] text-[13px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#0b0b0b]">
                  Define Structures &amp; Courses
                </span>
                <span className="text-[13px] text-[#5c5c5c]">
                  Set up faculties, departments, and course metadata.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#f0f8ff] text-[#046aff] text-[13px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#0b0b0b]">
                  Build Calendar &amp; Curricula
                </span>
                <span className="text-[13px] text-[#5c5c5c]">
                  Configure semester timelines, registration rules, and syllabus bounds.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#f0f8ff] text-[#046aff] text-[13px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#0b0b0b]">
                  Create Offerings &amp; Timetable
                </span>
                <span className="text-[13px] text-[#5c5c5c]">
                  Publish class sections, assign instructors, and generate room timetables.
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#f0f8ff] text-[#046aff] text-[13px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#0b0b0b]">
                  Submit, Approve &amp; Publish
                </span>
                <span className="text-[13px] text-[#5c5c5c]">
                  Run conflict checks, request VP Approvals, and publish live session.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
