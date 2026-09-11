'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Menu } from 'lucide-react';

interface ImpactPreviewProps {
  onBack: () => void;
  onSubmit: () => void;
  onOpenMobileMenu?: () => void;
}

export function ImpactPreview({ onBack, onSubmit, onOpenMobileMenu }: ImpactPreviewProps) {
  const [curriculaOpen, setCurriculaOpen] = useState(true);
  const [offeringsOpen, setOfferingsOpen] = useState(true);

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Page Header ───────────────────────────────────────────── */}
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
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[#808080]">
              Academic Calendar &gt; 2026/27 Session &gt; Semester 1 &gt; Impact Preview
            </span>
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Calendar Change Impact Preview
            </h1>
          </div>
        </div>
      </div>

      {/* ── Proposed Timeline Adjustments Card ─────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-3">
        <h2 className="text-[14px] font-semibold uppercase tracking-wider text-[#808080]">
          Proposed Timeline Adjustments
        </h2>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-[14px] text-[#1f1f1f]">
            <span className="w-2 h-2 rounded-full bg-[#046aff] shrink-0" />
            <span>
              Teaching start date shifted backward:{' '}
              <strong className="text-[#0b0b0b]">Sep 12, 2026 → Sep 19, 2026</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[14px] text-[#1f1f1f]">
            <span className="w-2 h-2 rounded-full bg-[#046aff] shrink-0" />
            <span>
              Late registration window extended by{' '}
              <strong className="text-[#046aff]">5 calendar days</strong> (Closes Oct 5)
            </span>
          </div>
        </div>
      </div>

      {/* ── Curricula Impact Card ──────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div
          onClick={() => setCurriculaOpen(!curriculaOpen)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[16px] font-semibold text-[#0b0b0b]">Curricula Impact</h3>
            <span className="text-[13px] text-[#808080]">
              Direct syllabus structural impacts
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#f0f8ff] text-[#046aff] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              4 Affected
            </span>
            {curriculaOpen ? (
              <ChevronUp className="w-4 h-4 text-[#808080]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#808080]" />
            )}
          </div>
        </div>

        {curriculaOpen && (
          <div className="flex flex-col divide-y divide-[#f5f5f5] pt-2 border-t border-[#f5f5f5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
              <span className="text-[14px] font-semibold text-[#1f1f1f]">
                BSc Computer Science
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-[#808080]">v3.2 Draft</span>
                <span className="text-[13px] font-semibold text-[#dc2626]">
                  Teaching weeks reduced: 16 → 15
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
              <span className="text-[14px] font-semibold text-[#1f1f1f]">
                BEng Mechanical Engineering
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-[#808080]">v2.1 Approved</span>
                <span className="text-[13px] font-semibold text-[#dc2626]">
                  Workshop hours deficit: -4 hrs
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Course Offerings Impact Card ───────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 overflow-x-auto">
        <div
          onClick={() => setOfferingsOpen(!offeringsOpen)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
              Course Offerings Impact
            </h3>
            <span className="text-[13px] text-[#808080]">
              Active course deliveries mapped to altered dates
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#ffd9c0] text-[#71330a] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              48 Active
            </span>
            {offeringsOpen ? (
              <ChevronUp className="w-4 h-4 text-[#808080]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#808080]" />
            )}
          </div>
        </div>

        {offeringsOpen && (
          <div className="min-w-[600px] pt-2 border-t border-[#f5f5f5]">
            <div className="grid grid-cols-12 gap-3 pb-2 text-[12px] font-semibold uppercase tracking-wider text-[#808080]">
              <div className="col-span-2">Course</div>
              <div className="col-span-2">Section</div>
              <div className="col-span-8">Scheduling Resolution</div>
            </div>
            <div className="flex flex-col divide-y divide-[#f5f5f5]">
              <div className="grid grid-cols-12 gap-3 items-center py-2.5 text-[13px]">
                <div className="col-span-2 font-bold text-[#1f1f1f]">CSC 301</div>
                <div className="col-span-2 text-[#5c5c5c]">Section A</div>
                <div className="col-span-8 text-[#1f1f1f]">
                  Requires 1 virtual make-up lecture session
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3 items-center py-2.5 text-[13px]">
                <div className="col-span-2 font-bold text-[#1f1f1f]">MTH 202</div>
                <div className="col-span-2 text-[#5c5c5c]">Section B</div>
                <div className="col-span-8 text-[#1f1f1f]">
                  Recitation hours rescheduled to mid-term week
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 2-Column Impact Cards: Conflicts & Registration Scope ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Card: Schedule Conflicts */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-[16px] font-semibold text-[#0b0b0b]">Schedule Conflicts</h3>
              <span className="text-[13px] text-[#808080]">
                Timetable meetings disrupted
              </span>
            </div>
            <span className="bg-[#fef0f0] text-[#dc2626] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              12 Flagged
            </span>
          </div>
          <div className="flex flex-col gap-2 text-[13px] text-[#1f1f1f] leading-relaxed">
            <p>• 8 Room allocation collisions created on shifted Mondays</p>
            <p>• 4 Faculty availability overlaps discovered in Computer Science</p>
          </div>
        </div>

        {/* Card: Registration Scope */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-[16px] font-semibold text-[#0b0b0b]">Registration Scope</h3>
              <span className="text-[13px] text-[#808080]">
                Admissions window variations
              </span>
            </div>
            <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              1,840 Students
            </span>
          </div>
          <div className="flex flex-col gap-2 text-[13px] text-[#1f1f1f] leading-relaxed">
            <p>• Overlapping student payment clearing cycles accommodated</p>
            <p>• Extension prevents automatic late-fee triggers for late-adds</p>
          </div>
        </div>
      </div>

      {/* ── Downstream Integration Status Card ─────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
            Downstream Integration Status
          </h3>
          <span className="text-[13px] text-[#808080]">
            Notification broadcasts to linked operational microservices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#808080]">
              SIS Integration
            </span>
            <span className="text-[14px] font-bold text-[#1fc16b]">
              Synced Pending Approval
            </span>
            <span className="text-[12px] text-[#5c5c5c]">
              1,420 prospective student records impacted
            </span>
          </div>

          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#808080]">
              Learning Management (LMS)
            </span>
            <span className="text-[14px] font-bold text-[#f59e0b]">
              Update Scheduled
            </span>
            <span className="text-[12px] text-[#5c5c5c]">
              Automatic course section term shifting ready
            </span>
          </div>
        </div>
      </div>

      {/* ── Action Bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ebebeb]">
        <button
          onClick={onBack}
          className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none"
        >
          Back to Calendar Editor
        </button>
        <button
          onClick={onSubmit}
          className="bg-[#335cff] hover:bg-[#254bdb] text-white px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-xs cursor-pointer select-none"
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
}
