'use client';

import React from 'react';
import { AlertTriangle, Menu } from 'lucide-react';

interface CurriculumEditorBlockedProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onCompareDiff: () => void;
  onOpenMobileMenu?: () => void;
}

const mappingData = {
  year1: {
    title: 'Year 1 Mapping',
    totalCredits: 30,
    rows: [
      { period: 'Semester 1', code: 'CSC 101', title: 'Introduction to Programming', role: 'Required', credits: 4, group: 'None' },
      { period: 'Semester 1', code: 'MTH 101', title: 'Calculus I', role: 'Required', credits: 4, group: 'None' },
      { period: 'Semester 2', code: 'GST 102', title: 'Philosophy & Logic', role: 'Elective', credits: 2, group: 'Group GenEd' },
    ],
  },
  year2: {
    title: 'Year 2 Mapping',
    totalCredits: 32,
    rows: [
      { period: 'Semester 1', code: 'CSC 201', title: 'Data Structures & Algorithms', role: 'Required', credits: 4, group: 'None' },
      { period: 'Semester 2', code: 'CSC 212', title: 'Introduction to Cyber Security', role: 'Elective', credits: 3, group: 'Group Tech' },
    ],
  },
};

const roleBadgeClass = (role: string) =>
  role === 'Required'
    ? 'bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]'
    : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]';

const validationChecks = [
  { label: 'Total Credit Check', badge: 'Fail', description: 'Draft is 4 credits below the published target.', fail: true },
  { label: 'Prerequisite Chains', badge: 'Fail', description: 'Circular dependency found: CSC 301 ↔ CSC 305.', fail: true },
  { label: 'Elective Group Minimums', badge: 'Fail', description: 'Group Tech requires 12 credits; only 8 are mapped.', fail: true },
  { label: 'Applicability & Required Courses', badge: '2 blockers', description: 'Overlapping cohort applicability and one required course missing.', fail: true },
];

export function CurriculumEditorBlocked({
  onCancel,
  onSaveDraft,
  onCompareDiff,
  onOpenMobileMenu,
}: CurriculumEditorBlockedProps) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* ── Header Area ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 border-b border-[#f0f0f0]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="lg:hidden p-1.5 rounded-lg border border-[#ebebeb] text-[#1f1f1f] hover:bg-[#f5f5f5] mt-1"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-[#808080]">
                Curricula &amp; Rules &gt; BSc Computer Science &gt; Curriculum v3.0 (Draft)
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                  Curriculum Editor — Validation Blocked
                </h1>
                <span className="inline-flex items-center bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                  5 Blockers
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <button
              onClick={onCancel}
              className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSaveDraft}
              className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              onClick={onCompareDiff}
              className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Compare Diff
            </button>
            <button
              disabled
              className="bg-[#ebebeb] text-[#a0a0a0] px-5 py-2 rounded-[8px] text-[13px] font-medium cursor-not-allowed"
            >
              Submit Blocked
            </button>
          </div>
        </div>
      </div>

      {/* ── Summary Card ───────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white border border-[#f0f0f0] rounded-[12px] px-5 py-4 flex flex-wrap gap-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#808080] font-medium">Programme</span>
              <span className="text-[14px] font-semibold text-[#1f1f1f]">BSc Computer Science</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#808080] font-medium">Intake / Cohort Range</span>
              <span className="text-[14px] font-semibold text-[#1f1f1f]">2027 – 2030 Cohorts</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#808080] font-medium">Total Target Credits</span>
              <span className="text-[14px] font-semibold text-[#1f1f1f]">120 Credits</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#808080] font-medium">Base Version</span>
              <span className="text-[14px] font-semibold text-[#1f1f1f]">v2.0 (Published)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Editor Columns ─────────────────────────────────────────── */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Editor Stream */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Year 1 Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold text-[#0b0b0b]">{mappingData.year1.title}</h3>
                <span className="text-[13px] text-[#808080] font-medium">Total: {mappingData.year1.totalCredits} Credits</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-[#f0f0f0]">
                      {['Period', 'Course Code', 'Course Title', 'Role', 'Credits', 'Elective Group'].map((h) => (
                        <th key={h} className="pb-3 text-left text-[12px] font-semibold text-[#808080] pr-4 last:pr-0 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mappingData.year1.rows.map((row, i) => (
                      <tr key={i} className="border-b border-[#f5f5f5] last:border-0">
                        <td className="py-3 text-[13px] text-[#5c5c5c] pr-4 whitespace-nowrap">{row.period}</td>
                        <td className="py-3 text-[13px] font-semibold text-[#1f1f1f] pr-4">{row.code}</td>
                        <td className="py-3 text-[13px] text-[#1f1f1f] pr-4">{row.title}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${roleBadgeClass(row.role)}`}>
                            {row.role}
                          </span>
                        </td>
                        <td className="py-3 text-[13px] text-[#1f1f1f] pr-4">{row.credits}</td>
                        <td className="py-3 text-[13px] text-[#808080]">{row.group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-[13px] text-[#046aff] font-medium hover:text-[#254bdb] transition-colors cursor-pointer">
                + Add Course to Year 1
              </button>
            </div>

            {/* Year 2 Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold text-[#0b0b0b]">{mappingData.year2.title}</h3>
                <span className="text-[13px] text-[#808080] font-medium">Total: {mappingData.year2.totalCredits} Credits</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-[#f0f0f0]">
                      {['Period', 'Course Code', 'Course Title', 'Role', 'Credits', 'Elective Group'].map((h) => (
                        <th key={h} className="pb-3 text-left text-[12px] font-semibold text-[#808080] pr-4 last:pr-0 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mappingData.year2.rows.map((row, i) => (
                      <tr key={i} className="border-b border-[#f5f5f5] last:border-0">
                        <td className="py-3 text-[13px] text-[#5c5c5c] pr-4 whitespace-nowrap">{row.period}</td>
                        <td className="py-3 text-[13px] font-semibold text-[#1f1f1f] pr-4">{row.code}</td>
                        <td className="py-3 text-[13px] text-[#1f1f1f] pr-4">{row.title}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${roleBadgeClass(row.role)}`}>
                            {row.role}
                          </span>
                        </td>
                        <td className="py-3 text-[13px] text-[#1f1f1f] pr-4">{row.credits}</td>
                        <td className="py-3 text-[13px] text-[#808080]">{row.group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-[13px] text-[#046aff] font-medium hover:text-[#254bdb] transition-colors cursor-pointer">
                + Add Course to Year 2
              </button>
            </div>

            {/* Grand Total Bar */}
            <div className="bg-white border border-[#f0f0f0] rounded-[12px] px-6 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#0b0b0b]">Grand Total Draft Credits</span>
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-bold text-[#1f1f1f]">116 / 120 Credits</span>
                <span className="inline-flex items-center bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                  Not aligned
                </span>
              </div>
            </div>
          </div>

          {/* Right Validation Panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h3 className="text-[15px] font-semibold text-[#0b0b0b] mb-5">Curriculum Validation — Action Required</h3>
              <div className="flex flex-col divide-y divide-[#f5f5f5]">
                {validationChecks.map((check, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-semibold text-[#1f1f1f]">{check.label}</span>
                      <span className="inline-flex items-center bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {check.badge}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#808080] leading-relaxed">{check.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
