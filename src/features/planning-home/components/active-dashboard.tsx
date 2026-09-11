'use client';

import React from 'react';
import {
  FileText,
  FolderOpen,
  Building2,
  Calendar,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { StatusTag } from './status-tag';

interface ActiveDashboardProps {
  onPreparePeriod: () => void;
  onOpenMobileMenu?: () => void;
}

export function ActiveDashboard({ onPreparePeriod, onOpenMobileMenu }: ActiveDashboardProps) {
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
            <span className="w-2 h-2 rounded-full bg-[#046aff] shrink-0" />
            <p className="text-[14px] font-medium text-[#5c5c5c]">
              2026/2027 Academic Session — Semester 1
            </p>
          </div>
        </div>

        {/* Completeness and CTA */}
        <div className="flex items-center gap-6 self-start md:self-auto">
          {/* Completeness block */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[12px] font-medium text-[#808080]">Plan Completeness</span>
              <span className="text-[14px] font-bold text-[#046aff]">68%</span>
            </div>
            <div className="w-[120px] h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden flex gap-[3px]">
              <div className="w-[40px] h-full bg-[#046aff]" />
              <div className="w-[40px] h-full bg-[#046aff]" />
              <div className="w-[20px] h-full bg-[#046aff]" />
              <div className="w-[20px] h-full bg-transparent" />
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onPreparePeriod}
            className="inline-flex items-center justify-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none shrink-0"
          >
            <span>Prepare Next Period</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Metrics Cards Row (5 cards) ────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {/* 1. Structures */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Structures
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">24</span>
            <StatusTag label="Published" variant="published" />
          </div>
        </div>

        {/* 2. Calendar */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Calendar
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">Draft</span>
            <StatusTag label="In Review" variant="in-review" />
          </div>
        </div>

        {/* 3. Offerings */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Offerings
          </span>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">18</span>
              <span className="text-[12px] text-[#808080]">/ 6 Pub</span>
            </div>
            <StatusTag label="Mixed" variant="mixed" />
          </div>
        </div>

        {/* 4. Conflicts */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Conflicts
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">3</span>
            <StatusTag label="Unresolved" variant="unresolved" />
          </div>
        </div>

        {/* 5. Assignments */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Assignments
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">2 Gaps</span>
            <StatusTag label="Action Req" variant="action-req" />
          </div>
        </div>
      </div>

      {/* ── Main Dashboard Grid (2 Columns) ────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
        {/* ── Left Column (flex-1) ── */}
        <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
          {/* Card: My Planning Work */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-[#0b0b0b]">My Planning Work</h2>
              <span className="text-[12px] text-[#808080]">4 Active Artifacts</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Row 1 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#f5f5f5] pb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-[#808080] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-medium text-[#1f1f1f] truncate">
                      BSc Computer Science Curriculum v3
                    </span>
                    <span className="text-[12px] text-[#808080]">Edited 45m ago</span>
                  </div>
                </div>
                <StatusTag label="Draft" variant="draft" />
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#f5f5f5] pb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FolderOpen className="w-5 h-5 text-[#808080] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-medium text-[#1f1f1f] truncate">
                      Semester 1 Offerings batch
                    </span>
                    <span className="text-[12px] text-[#808080]">Edited 2h ago</span>
                  </div>
                </div>
                <StatusTag label="Draft" variant="draft" />
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#f5f5f5] pb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Building2 className="w-5 h-5 text-[#808080] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-medium text-[#1f1f1f] truncate">
                      Room allocation review
                    </span>
                    <span className="text-[12px] text-[#808080]">Edited 1d ago</span>
                  </div>
                </div>
                <StatusTag label="In Progress" variant="in-progress" />
              </div>

              {/* Row 4 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#f5f5f5] pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Calendar className="w-5 h-5 text-[#808080] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-medium text-[#1f1f1f] truncate">
                      Add/Drop window dates
                    </span>
                    <span className="text-[12px] text-[#808080]">Edited 3d ago</span>
                  </div>
                </div>
                <StatusTag label="Draft" variant="draft" />
              </div>
            </div>
          </div>

          {/* Card: Returned to Me */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 w-full">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Returned to Me</h2>

            <div className="bg-[#fef0f0] rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-semibold text-[#0b0b0b] truncate">
                  Faculty of Science calendar amendment
                </span>
                <StatusTag label="Returned" variant="returned" />
              </div>
              <p className="text-[13px] text-[#1f1f1f] leading-relaxed">
                &ldquo;Review date constraints: Reading week overlaps with regional holiday. Please
                slide back by 3 calendar days.&rdquo;
              </p>
              <span className="text-[11px] text-[#808080]">
                Reviewed by Dr. Marcus (VP Academic) • 4h ago
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column (420px on desktop) ── */}
        <div className="flex flex-col gap-5 w-full lg:w-[420px] shrink-0">
          {/* Card: Dependency Checklist */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 w-full">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Dependency Checklist</h2>

            <div className="flex flex-col gap-3">
              {/* Checklist Row 1 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Academic Structures &amp; Programmes
                  </span>
                </div>
                <StatusTag label="Published ✓" variant="published" />
              </div>

              {/* Checklist Row 2 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Academic Session &amp; Calendar
                  </span>
                </div>
                <StatusTag label="In Review" variant="in-review" />
              </div>

              {/* Checklist Row 3 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Course Catalogue Versions
                  </span>
                </div>
                <StatusTag label="Published ✓" variant="published" />
              </div>

              {/* Checklist Row 4 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#808080] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Curriculum &amp; Registration Rules
                  </span>
                </div>
                <StatusTag label="Draft Required" variant="draft-required" />
              </div>

              {/* Checklist Row 5 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#808080] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Course Offerings &amp; Assignments
                  </span>
                </div>
                <StatusTag label="Draft Required" variant="draft-required" />
              </div>

              {/* Checklist Row 6 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Venues &amp; Resources
                  </span>
                </div>
                <StatusTag label="Published ✓" variant="published" />
              </div>

              {/* Checklist Row 7 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Teaching Timetable
                  </span>
                </div>
                <StatusTag label="Blocked" variant="blocked" />
              </div>
            </div>
          </div>

          {/* Card: Review & Approvals Panel */}
          <div className="flex flex-col gap-4 w-full">
            {/* Awaiting Review Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-3">
              <h3 className="text-[14px] font-semibold text-[#0b0b0b]">Awaiting Review (2)</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Academic Calendar 2026/27
                  </span>
                  <span className="text-[11px] text-[#808080] shrink-0">Submitted 2d ago</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] text-[#1f1f1f] truncate">
                    Programme structure updates
                  </span>
                  <span className="text-[11px] text-[#808080] shrink-0">Submitted 5d ago</span>
                </div>
              </div>
            </div>

            {/* My Approvals Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[#0b0b0b]">My Approvals</h3>
                <StatusTag label="Pending" variant="pending" />
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Faculty of Arts Curriculum v2
                </span>
                <div className="flex items-center gap-2">
                  <button className="bg-[#335cff] hover:bg-[#254bdb] text-white px-3 py-1 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer">
                    Approve
                  </button>
                  <button className="bg-white border border-[#ebebeb] hover:bg-[#f5f5f5] text-[#5c5c5c] px-3 py-1 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row Grid (2 Cards) ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* Card: Blocking Issues (3) */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Blocking Issues (3)</h2>
            <StatusTag label="Urgent" variant="urgent" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="border-b border-[#f5f5f5] pb-3 flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[#1f1f1f]">
                Missing lead instructor for SEC 201-A
              </span>
              <span className="text-[11px] text-[#808080]">Owner: Identity &amp; Access</span>
            </div>
            <div className="border-b border-[#f5f5f5] pb-3 flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[#1f1f1f]">
                Venue G-201 capacity unverified
              </span>
              <span className="text-[11px] text-[#808080]">Owner: Facilities</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[#1f1f1f]">
                Circular prerequisite in CSC 301
              </span>
              <span className="text-[11px] text-[#808080]">Owner: Academic Planning</span>
            </div>
          </div>
        </div>

        {/* Card: Publication Health */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Publication Health</h2>

          <div className="flex flex-col gap-3">
            <div className="border-b border-[#f5f5f5] pb-3 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Academic Structures v4
                </span>
                <span className="text-[11px] text-[#808080]">Delivered</span>
              </div>
              <StatusTag label="Published ✓" variant="published" />
            </div>

            <div className="border-b border-[#f5f5f5] pb-3 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Course Catalogue v7
                </span>
                <span className="text-[11px] text-[#808080]">2 pending acks</span>
              </div>
              <StatusTag label="Published ✓" variant="draft" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-[#1f1f1f]">
                  Calendar 2025/26
                </span>
                <span className="text-[11px] text-[#808080]">Archived</span>
              </div>
              <StatusTag label="Superseded" variant="superseded" />
            </div>
          </div>
        </div>
      </div>

      {/* ── External Module Handoffs Card (Full-width) ─────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#0b0b0b]">External Module Handoffs</h2>
          <span className="text-[12px] text-[#808080]">Read-Only integrations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Handoff Block 1 */}
          <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                SIS Integration
              </span>
              <StatusTag label="Live" variant="live" />
            </div>
            <span className="text-[13px] font-semibold text-[#1f1f1f]">
              SIS projection refresh
            </span>
            <span className="text-[12px] text-[#808080]">last updated 2h ago</span>
          </div>

          {/* Handoff Block 2 */}
          <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                Admissions module
              </span>
              <StatusTag label="Ready" variant="ready" />
            </div>
            <span className="text-[13px] font-semibold text-[#1f1f1f]">
              Admission application dates
            </span>
            <span className="text-[12px] text-[#808080]">confirmed</span>
          </div>

          {/* Handoff Block 3 */}
          <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide">
                Examinations module
              </span>
              <StatusTag label="Pending" variant="pending" />
            </div>
            <span className="text-[13px] font-semibold text-[#1f1f1f]">
              Exam schedule
            </span>
            <span className="text-[12px] text-[#808080]">awaiting semester config</span>
          </div>
        </div>
      </div>
    </div>
  );
}
