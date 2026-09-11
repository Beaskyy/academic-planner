'use client';

import React from 'react';
import { ArrowLeft, ChevronRight, Menu, Edit3, GitFork } from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';

interface ProgrammeDetailProps {
  programmeName?: string;
  onBack: () => void;
  onEdit: () => void;
  onCreateRevision: () => void;
  onOpenMobileMenu?: () => void;
}

export function ProgrammeDetail({
  programmeName = 'BSc Computer Science',
  onBack,
  onEdit,
  onCreateRevision,
  onOpenMobileMenu,
}: ProgrammeDetailProps) {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Header Area ───────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
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
                Academic Structures &gt; Faculty of Science &gt; Dept of Computer Science
              </span>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                  {programmeName}
                </h1>
                <StatusTag label="Published" variant="published" />
              </div>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] px-3.5 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={onCreateRevision}
            className="inline-flex items-center gap-1.5 border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] px-3.5 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
          >
            <GitFork className="w-4 h-4 text-[#046aff]" />
            <span>Create Revision</span>
          </button>
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors shadow-xs cursor-pointer select-none"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Programme</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Content Layout (2 Columns) ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Stream */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          {/* Card 1: Programme Overview */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5">
            <h2 className="text-[18px] font-semibold text-[#0b0b0b]">Programme Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
              {/* Item 1 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Programme Code
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">CSC-BSC-001</span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Degree Level
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  Undergraduate (BSc)
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Credit Requirement
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">120 Credits</span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Parent Department
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  Department of Computer Science
                </span>
              </div>

              {/* Item 5 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Faculty
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  Faculty of Science
                </span>
              </div>

              {/* Item 6 */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Duration &amp; Status
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  4 Years (Full-Time)
                </span>
              </div>

              {/* Item 7 */}
              <div className="flex flex-col gap-1 sm:col-span-3">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                  Effective Dates
                </span>
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  01 Sep 2026 – Indefinite
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Associated Courses */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 overflow-x-auto">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Associated Courses</h2>

            <div className="min-w-[620px]">
              {/* Headers */}
              <div className="grid grid-cols-12 gap-3 pb-3 border-b border-[#f5f5f5] text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
                <div className="col-span-2">Course Code</div>
                <div className="col-span-4">Course Title</div>
                <div className="col-span-2">Level</div>
                <div className="col-span-1">Credits</div>
                <div className="col-span-1.5">Role</div>
                <div className="col-span-1.5 text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="flex flex-col divide-y divide-[#f5f5f5]">
                {/* Row 1 */}
                <div className="grid grid-cols-12 gap-3 items-center py-3">
                  <div className="col-span-2 text-[13px] font-bold text-[#1f1f1f]">CSC 301</div>
                  <div className="col-span-4 text-[13px] font-medium text-[#1f1f1f]">
                    Software Engineering Methodologies
                  </div>
                  <div className="col-span-2 text-[13px] text-[#5c5c5c]">Year 3</div>
                  <div className="col-span-1 text-[13px] text-[#5c5c5c]">4</div>
                  <div className="col-span-1.5">
                    <StatusTag label="Required" variant="mixed" />
                  </div>
                  <div className="col-span-1.5 text-right">
                    <StatusTag label="Published" variant="published" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 gap-3 items-center py-3">
                  <div className="col-span-2 text-[13px] font-bold text-[#1f1f1f]">CSC 305</div>
                  <div className="col-span-4 text-[13px] font-medium text-[#1f1f1f]">
                    Database Management Systems
                  </div>
                  <div className="col-span-2 text-[13px] text-[#5c5c5c]">Year 3</div>
                  <div className="col-span-1 text-[13px] text-[#5c5c5c]">4</div>
                  <div className="col-span-1.5">
                    <StatusTag label="Required" variant="mixed" />
                  </div>
                  <div className="col-span-1.5 text-right">
                    <StatusTag label="Published" variant="published" />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 gap-3 items-center py-3">
                  <div className="col-span-2 text-[13px] font-bold text-[#1f1f1f]">CSC 310</div>
                  <div className="col-span-4 text-[13px] font-medium text-[#1f1f1f]">
                    Distributed Systems &amp; Cloud
                  </div>
                  <div className="col-span-2 text-[13px] text-[#5c5c5c]">Year 3</div>
                  <div className="col-span-1 text-[13px] text-[#5c5c5c]">4</div>
                  <div className="col-span-1.5">
                    <StatusTag label="Elective" variant="action-req" />
                  </div>
                  <div className="col-span-1.5 text-right">
                    <StatusTag label="Published" variant="published" />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-12 gap-3 items-center py-3">
                  <div className="col-span-2 text-[13px] font-bold text-[#1f1f1f]">MTH 302</div>
                  <div className="col-span-4 text-[13px] font-medium text-[#1f1f1f]">
                    Numerical Analysis
                  </div>
                  <div className="col-span-2 text-[13px] text-[#5c5c5c]">Year 3</div>
                  <div className="col-span-1 text-[13px] text-[#5c5c5c]">3</div>
                  <div className="col-span-1.5">
                    <StatusTag label="Required" variant="mixed" />
                  </div>
                  <div className="col-span-1.5 text-right">
                    <StatusTag label="Published" variant="published" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Linked Curricula */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Linked Curricula</h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-[#f5f5f5] bg-[#fafafa] gap-2">
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  BSc Computer Science Curriculum v2.0
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-[#5c5c5c]">120 Credits</span>
                  <StatusTag label="Active" variant="published" />
                  <span className="text-[12px] text-[#808080]">Effective: Sep 2026</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-[#f5f5f5] bg-[#fafafa] gap-2">
                <span className="text-[14px] font-semibold text-[#1f1f1f]">
                  BSc Computer Science Curriculum v3.0
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-[#5c5c5c]">120 Credits</span>
                  <StatusTag label="Draft" variant="draft" />
                  <span className="text-[12px] text-[#808080]">In Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Programme Dependencies */}
        <div className="w-full lg:w-[400px] shrink-0 bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5">
          <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Programme Dependencies</h2>

          {/* Upstream */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#808080]">
              Upstream (Parents)
            </span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b]" />
                <span className="text-[13px] font-medium text-[#1f1f1f]">Faculty of Science</span>
              </div>
              <StatusTag label="Faculty" variant="mixed" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b]" />
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Dept of Computer Science
                </span>
              </div>
              <StatusTag label="Department" variant="mixed" />
            </div>
          </div>

          <div className="w-full h-px bg-[#f0f0f0]" />

          {/* Downstream */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#808080]">
              Downstream (Children)
            </span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b]" />
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  BSc CSC Curriculum v2.0
                </span>
              </div>
              <StatusTag label="Active Curric." variant="published" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Semester Offerings (18)
                </span>
              </div>
              <StatusTag label="Offerings" variant="action-req" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#808080]" />
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  2026/27 Timetable Entries
                </span>
              </div>
              <StatusTag label="Timetable" variant="action-req" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
