'use client';

import React from 'react';
import { AlertTriangle, Menu } from 'lucide-react';

interface StructureEditorBlockedProps {
  onCancel: () => void;
  onSaveBlockedDraft: () => void;
  onOpenMobileMenu?: () => void;
}

export function StructureEditorBlocked({
  onCancel,
  onSaveBlockedDraft,
  onOpenMobileMenu,
}: StructureEditorBlockedProps) {
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
              Academic Structures &gt; Faculty of Science
            </span>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Cannot Submit: BSc Computer Science
            </h1>
          </div>
        </div>
      </div>

      {/* ── Editor Layout (2 Columns) ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Form Card */}
        <div className="flex-1 min-w-0 bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-6 w-full">
          <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Programme Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Field 1: Code (Read Only) */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#5c5c5c]">Code (Read Only)</label>
              <input
                type="text"
                disabled
                value="B-CSCI"
                className="w-full h-10 px-3 rounded-[8px] bg-[#fafafa] border border-[#ebebeb] text-[13px] font-medium text-[#5c5c5c] cursor-not-allowed select-none"
              />
            </div>

            {/* Field 2: Programme Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Programme Name</label>
              <input
                type="text"
                defaultValue="BSc Computer Science"
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>

            {/* Field 3: Parent Department — Error state */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Parent Department</label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 rounded-[8px] bg-white border border-[#ef4444] focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20 outline-none text-[13px] font-medium text-[#808080] transition-all appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Missing parent department</option>
                  <option value="cs">Department of Computer Science</option>
                  <option value="maths">Department of Mathematics</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 4: Type — Error state */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Type</label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-8 rounded-[8px] bg-white border border-[#ef4444] focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20 outline-none text-[13px] font-medium text-[#ef4444] transition-all appearance-none cursor-pointer"
                  defaultValue="duplicate"
                >
                  <option value="duplicate">Programme — duplicate code B-CSCI</option>
                  <option value="dept">Department</option>
                  <option value="faculty">Faculty</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Error Banner */}
          <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-[10px] px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#e11d48] mt-0.5 shrink-0" />
            <span className="text-[13px] text-[#be123c] leading-relaxed">
              3 blockers: missing parent, duplicate school code, and effective date overlaps a referenced published structure. Resolve before submission.
            </span>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f5f5f5]">
            <button
              onClick={onCancel}
              className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
            >
              Cancel
            </button>
            <button
              onClick={onSaveBlockedDraft}
              className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
            >
              Save Blocked Draft
            </button>
            <button
              disabled
              className="bg-[#ebebeb] text-[#a0a0a0] px-5 py-2 rounded-[8px] text-[13px] font-medium cursor-not-allowed select-none"
            >
              Submit Disabled
            </button>
          </div>
        </div>

        {/* Right Change History Panel */}
        <div className="w-full lg:w-[300px] shrink-0 bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <h3 className="text-[15px] font-semibold text-[#0b0b0b]">Change History</h3>

          <div className="flex flex-col gap-4 relative pl-3 border-l-2 border-[#f0f0f0]">
            <div className="flex flex-col gap-0.5 relative">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] absolute -left-[17px] top-1.5" />
              <span className="text-[13px] font-semibold text-[#1f1f1f]">Validation failed</span>
              <span className="text-[11px] text-[#808080]">Cycle, parent, code, date and retirement-impact checks rerun just now</span>
            </div>

            <div className="flex flex-col gap-0.5 relative">
              <span className="w-2 h-2 rounded-full bg-[#808080] absolute -left-[17px] top-1.5" />
              <span className="text-[13px] font-semibold text-[#1f1f1f]">Programme Created</span>
              <span className="text-[11px] text-[#808080]">By System • 14 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
