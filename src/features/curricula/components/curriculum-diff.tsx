'use client';

import React from 'react';
import {
  ChevronRight,
  ArrowLeft,
  PlusCircle,
  MinusCircle,
  AlertCircle,
  ArrowRight,
  Menu,
} from 'lucide-react';

interface CurriculumDiffProps {
  onBack: () => void;
  onProceedToMigration: () => void;
  onOpenMobileMenu?: () => void;
}

export function CurriculumDiff({
  onBack,
  onProceedToMigration,
  onOpenMobileMenu,
}: CurriculumDiffProps) {
  const publishedCourses = [
    { title: 'CSC 301 — Software Engineering (3 Cr)', status: 'modified' },
    { title: 'CSC 305 — Database Systems (4 Cr)', status: 'unchanged' },
    { title: 'MTH 302 — Numerical Analysis (4 Cr)', status: 'removed' },
  ];

  const draftCourses = [
    { title: 'CSC 301 — Software Engineering Methodologies (4 Cr)', status: 'modified' },
    { title: 'CSC 305 — Database Systems (4 Cr)', status: 'unchanged' },
    { title: 'CSC 310 — Distributed Systems & Cloud (4 Cr)', status: 'added' },
  ];

  const impactRows = [
    {
      code: 'CSC 301',
      title: 'Software Engineering Methodologies',
      type: 'Modified',
      note: 'Credits increased from 3 to 4',
      badgeClass: 'bg-[#fef3c7] text-[#b45309] border border-[#fde68a]',
    },
    {
      code: 'CSC 305',
      title: 'Database Management Systems',
      type: 'Unchanged',
      note: 'No changes',
      badgeClass: 'bg-[#f5f5f5] text-[#5c5c5c] border border-[#e5e5e5]',
    },
    {
      code: 'CSC 310',
      title: 'Distributed Systems & Cloud',
      type: 'Added',
      note: 'New elective added',
      badgeClass: 'bg-[#dcfce7] text-[#15803d] border border-[#86efac]',
    },
    {
      code: 'MTH 302',
      title: 'Numerical Analysis',
      type: 'Removed',
      note: 'Removed from core requirements',
      badgeClass: 'bg-[#fee2e2] text-[#b91c1c] border border-[#fecaca]',
    },
  ];

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Top Header */}
      <header className="px-6 sm:px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0f0f0] bg-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#808080] mb-1.5 flex-wrap">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1 -ml-1 mr-1 text-[#5c5c5c] hover:text-[#1f1f1f] rounded-md hover:bg-[#f5f5f5]"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span>Curricula &amp; Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span>BSc Computer Science</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span className="text-[#1f1f1f] font-semibold">Compare Versions</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Compare Versions: BSc Computer Science
          </h1>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* Summary Banner */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span className="text-sm font-semibold text-[#1f1f1f]">Addition</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#fee2e2] text-[#b91c1c] flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span className="text-sm font-semibold text-[#1f1f1f]">Removal</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span className="text-sm font-semibold text-[#1f1f1f]">Modification</span>
          </div>
        </div>

        {/* Split Panel Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel: Published v2.0 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Published v2.0
              </h3>
              <span className="text-xs font-semibold text-[#808080]">
                Base Version
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {publishedCourses.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-[10px] text-[13px] font-medium border flex items-center justify-between ${
                    c.status === 'removed'
                      ? 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
                      : c.status === 'modified'
                      ? 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
                      : 'bg-[#fafafa] border-[#ebebeb] text-[#1f1f1f]'
                  }`}
                >
                  <span>{c.title}</span>
                  {c.status === 'removed' && (
                    <MinusCircle className="w-4 h-4 text-[#dc2626] shrink-0" />
                  )}
                  {c.status === 'modified' && (
                    <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Draft v3.0 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Draft v3.0
              </h3>
              <span className="text-xs font-semibold text-[#046aff]">
                Target Version
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {draftCourses.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-[10px] text-[13px] font-medium border flex items-center justify-between ${
                    c.status === 'added'
                      ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]'
                      : c.status === 'modified'
                      ? 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
                      : 'bg-[#fafafa] border-[#ebebeb] text-[#1f1f1f]'
                  }`}
                >
                  <span>{c.title}</span>
                  {c.status === 'added' && (
                    <PlusCircle className="w-4 h-4 text-[#16a34a] shrink-0" />
                  )}
                  {c.status === 'modified' && (
                    <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Impact Assessment Table */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
            <h3 className="text-[16px] font-bold text-[#1f1f1f]">
              Change Impact Assessment
            </h3>
            <span className="text-xs text-[#808080] font-medium">
              4 total changes tracked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Course Code</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3">Change Type</th>
                  <th className="py-2.5 px-3">Impact Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                {impactRows.map((r, i) => (
                  <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#1f1f1f]">
                      {r.code}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#1f1f1f]">
                      {r.title}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${r.badgeClass}`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#5c5c5c] font-medium">
                      {r.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 shadow-xs flex items-center justify-end gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Back
          </button>
          <button
            onClick={onProceedToMigration}
            className="px-4 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Proceed to Migration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
