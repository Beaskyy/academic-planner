'use client';

import React from 'react';
import {
  FileText,
  FolderOpen,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export function ContextRestoredView() {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Dashboard Header ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] sm:text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Planning Home — Context Restored
          </h1>
          <div className="flex items-center gap-2 text-[13px] text-[#1fc16b] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#1fc16b]" />
            <span>
              Returned to 2026/2027 Semester 1 • My Planning Work • Previous filters restored
            </span>
          </div>
        </div>

        {/* Plan Completeness & Action */}
        <div className="flex items-center gap-4 bg-white border border-[#ebebeb] rounded-[12px] p-2.5 shadow-xs">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1f1f1f]">
              <span className="text-[#808080]">Plan Completeness</span>
              <span className="text-[#046aff]">68%</span>
            </div>
            {/* Segmented Progress Track */}
            <div className="flex items-center gap-1 w-32">
              <div className="h-1.5 w-10 rounded-full bg-[#046aff]" />
              <div className="h-1.5 w-10 rounded-full bg-[#046aff]" />
              <div className="h-1.5 w-6 rounded-full bg-[#046aff]" />
              <div className="h-1.5 w-6 rounded-full bg-gray-200" />
            </div>
          </div>

          <button
            type="button"
            className="px-3.5 py-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white text-xs font-medium rounded-[8px] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            Export Status Summary
          </button>
        </div>
      </div>

      {/* ── Metrics Cards Row (5 cards) ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Structures */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-bold text-[#808080] uppercase tracking-wider">
            Structures
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-[26px] font-bold text-[#0b0b0b] leading-none">24</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b] border border-[#d1f2e1]">
              Published ✓
            </span>
          </div>
        </div>

        {/* Metric 2: Calendar */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-bold text-[#808080] uppercase tracking-wider">
            Calendar
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-[26px] font-bold text-[#0b0b0b] leading-none">Draft</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fef6ee] text-[#ea580c] border border-[#fed7aa]">
              In Review
            </span>
          </div>
        </div>

        {/* Metric 3: Offerings */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-bold text-[#808080] uppercase tracking-wider">
            Offerings
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[26px] font-bold text-[#0b0b0b] leading-none">18</span>
              <span className="text-[11px] text-[#808080]">/ 6 Pub</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#046aff] border border-blue-200">
              Mixed
            </span>
          </div>
        </div>

        {/* Metric 4: Conflicts */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-bold text-[#808080] uppercase tracking-wider">
            Conflicts
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-[26px] font-bold text-[#0b0b0b] leading-none">3</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fff1f2] text-[#fb3748] border border-[#fecdd3]">
              Unresolved
            </span>
          </div>
        </div>

        {/* Metric 5: Assignments */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-col justify-between shadow-xs col-span-2 sm:col-span-1">
          <span className="text-xs font-bold text-[#808080] uppercase tracking-wider">
            Assignments
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-[26px] font-bold text-[#0b0b0b] leading-none">2 Gaps</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fff1f2] text-[#fb3748] border border-[#fecdd3]">
              Action Req
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Dashboard Grid (2 Columns) ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* My Planning Work Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#f0f0f0] pb-3">
              <h2 className="text-[16px] font-bold text-[#0b0b0b]">
                My Planning Work — Curriculum drafts filter
              </h2>
              <span className="text-[11px] text-[#808080]">
                Previous scroll position restored after revalidation
              </span>
            </div>

            <div className="flex flex-col divide-y divide-[#f5f5f5]">
              {/* Item 1 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#046aff] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                      BSc Computer Science Curriculum v3 — last opened item
                    </div>
                    <div className="text-[11px] text-[#808080] mt-0.5">
                      Revalidated just now • source freshness confirmed
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                  Draft
                </span>
              </div>

              {/* Item 2 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#ea580c] flex items-center justify-center shrink-0">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                      Semester 1 Offerings batch
                    </div>
                    <div className="text-[11px] text-[#808080] mt-0.5">
                      Edited 2h ago
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                  Draft
                </span>
              </div>

              {/* Item 3 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                      Room allocation review
                    </div>
                    <div className="text-[11px] text-[#808080] mt-0.5">
                      Edited 1d ago
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  In Progress
                </span>
              </div>

              {/* Item 4 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1fc16b] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                      Add/Drop window dates
                    </div>
                    <div className="text-[11px] text-[#808080] mt-0.5">
                      Edited 3d ago
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700">
                  Draft
                </span>
              </div>
            </div>
          </div>

          {/* Returned to Me Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#0b0b0b]">
                Returned to Me
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fff1f2] text-[#fb3748] border border-[#fecdd3]">
                Returned
              </span>
            </div>

            <div className="p-4 rounded-[12px] bg-[#fff1f2]/40 border border-[#fecdd3] flex flex-col gap-2">
              <span className="text-[14px] font-bold text-[#0b0b0b]">
                Faculty of Science calendar amendment
              </span>
              <p className="text-[13px] text-[#1f1f1f] italic leading-relaxed">
                &ldquo;Review date constraints: Reading week overlaps with regional holiday. Please slide back by 3 calendar days.&rdquo;
              </p>
              <span className="text-[11px] text-[#808080] mt-1">
                Reviewed by Dr. Marcus (VP Academic) • 4h ago
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="flex flex-col gap-6">
          {/* Dependency Checklist */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-[#0b0b0b]">
              Dependency Checklist
            </h2>

            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Academic Structures &amp; Programmes</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Published ✓
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Academic Session &amp; Calendar</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fef6ee] text-[#ea580c]">
                  In Review
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Course Catalogue Versions</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Published ✓
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Curriculum &amp; Registration Rules</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                  Draft Required
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Course Offerings &amp; Assignments</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                  Draft Required
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Venues &amp; Resources</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Published ✓
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1f1f1f]">Teaching Timetable</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fff1f2] text-[#fb3748]">
                  Blocked
                </span>
              </div>
            </div>
          </div>

          {/* Review & Approvals Panel */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-[16px] font-bold text-[#0b0b0b]">
              Awaiting Review (2)
            </h2>

            <div className="flex flex-col gap-2.5 text-xs text-[#5c5c5c]">
              <div className="flex items-center justify-between py-1.5 border-b border-[#f5f5f5]">
                <span className="font-semibold text-[#1f1f1f]">Academic Calendar 2026/27</span>
                <span>Submitted 2d ago</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-semibold text-[#1f1f1f]">Programme structure updates</span>
                <span>Submitted 5d ago</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#f0f0f0] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#0b0b0b]">My Approvals</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                  Pending
                </span>
              </div>
              <span className="text-xs text-[#5c5c5c]">Faculty of Arts Curriculum v2</span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  className="flex-1 py-1 bg-[#335cff] text-white text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="flex-1 py-1 bg-white border border-[#ebebeb] text-[#1f1f1f] text-xs font-semibold rounded-[6px] hover:bg-gray-50 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blocking Issues Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0b0b0b]">
              Blocking Issues (3)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fff1f2] text-[#fb3748]">
              Urgent
            </span>
          </div>

          <div className="flex flex-col gap-3 text-[13px]">
            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex flex-col">
              <span className="font-semibold text-[#0b0b0b]">
                Missing lead instructor for SEC 201-A
              </span>
              <span className="text-[11px] text-[#808080] mt-0.5">
                Owner: Identity &amp; Access
              </span>
            </div>

            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex flex-col">
              <span className="font-semibold text-[#0b0b0b]">
                Venue G-201 capacity unverified
              </span>
              <span className="text-[11px] text-[#808080] mt-0.5">
                Owner: Facilities
              </span>
            </div>

            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex flex-col">
              <span className="font-semibold text-[#0b0b0b]">
                Circular prerequisite in CSC 301
              </span>
              <span className="text-[11px] text-[#808080] mt-0.5">
                Owner: Academic Planning
              </span>
            </div>
          </div>
        </div>

        {/* Publication Health Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <h2 className="text-[16px] font-bold text-[#0b0b0b]">
            Publication Health
          </h2>

          <div className="flex flex-col gap-3 text-[13px]">
            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-[#0b0b0b]">Academic Structures v4</span>
                <span className="text-[11px] text-[#808080]">Delivered</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                Published ✓
              </span>
            </div>

            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-[#0b0b0b]">Course Catalogue v7</span>
                <span className="text-[11px] text-[#808080]">2 pending acks</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                Published ✓
              </span>
            </div>

            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-[#0b0b0b]">Calendar 2025/26</span>
                <span className="text-[11px] text-[#808080]">Archived</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700">
                Superseded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── External Handoffs Card ──────────────────────────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#0b0b0b]">
            External Module Handoffs
          </h2>
          <span className="text-xs text-[#808080]">Read-Only integrations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#808080] uppercase">SIS Integration</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                Live
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#0b0b0b]">SIS projection refresh</div>
              <div className="text-[11px] text-[#808080] mt-0.5">last updated 2h ago</div>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#808080] uppercase">Admissions module</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#046aff]">
                Ready
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#0b0b0b]">Admission application dates</div>
              <div className="text-[11px] text-[#808080] mt-0.5">confirmed</div>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#808080] uppercase">Examinations module</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                Pending
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#0b0b0b]">Exam schedule</div>
              <div className="text-[11px] text-[#808080] mt-0.5">awaiting semester config</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
