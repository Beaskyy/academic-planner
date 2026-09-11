'use client';

import React, { useState } from 'react';
import { AlertCircle, ChevronDown, Menu } from 'lucide-react';

interface StructureEditorProps {
  initialName?: string;
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmitForReview: () => void;
  onOpenMobileMenu?: () => void;
}

export function StructureEditor({
  initialName = 'BSc Computer Science',
  onCancel,
  onSaveDraft,
  onSubmitForReview,
  onOpenMobileMenu,
}: StructureEditorProps) {
  const [programmeName, setProgrammeName] = useState(initialName);
  const [parentDept, setParentDept] = useState('Department of Computer Science');
  const [structureType, setStructureType] = useState('Programme');

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
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Edit: {programmeName}
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
              <label className="text-[13px] font-medium text-[#1f1f1f]">Code (Read Only)</label>
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
                value={programmeName}
                onChange={(e) => setProgrammeName(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>

            {/* Field 3: Parent Department */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Parent Department</label>
              <div className="relative">
                <select
                  value={parentDept}
                  onChange={(e) => setParentDept(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all appearance-none cursor-pointer"
                >
                  <option value="Department of Computer Science">
                    Department of Computer Science
                  </option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Physics">Department of Physics</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#808080] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Field 4: Type */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Type</label>
              <div className="relative">
                <select
                  value={structureType}
                  onChange={(e) => setStructureType(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all appearance-none cursor-pointer"
                >
                  <option value="Programme">Programme</option>
                  <option value="Department">Department</option>
                  <option value="Faculty">Faculty</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#808080] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Validation Warning Alert */}
          <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[10px] p-3.5 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-[#c2410c] shrink-0" />
            <span className="text-[13px] text-[#c2410c] font-medium">
              Changes will trigger 1 secondary rule validation. VPS signature required.
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
              onClick={onSaveDraft}
              className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
            >
              Save Draft
            </button>
            <button
              onClick={onSubmitForReview}
              className="bg-[#335cff] hover:bg-[#254bdb] text-white px-5 py-2 rounded-[8px] text-[13px] font-medium transition-colors shadow-xs cursor-pointer select-none"
            >
              Submit for Review
            </button>
          </div>
        </div>

        {/* Right Change History Card */}
        <div className="w-full lg:w-[300px] shrink-0 bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <h3 className="text-[15px] font-semibold text-[#0b0b0b]">Change History</h3>

          <div className="flex flex-col gap-4 relative pl-3 border-l-2 border-[#f0f0f0]">
            <div className="flex flex-col gap-0.5 relative">
              <span className="w-2 h-2 rounded-full bg-[#046aff] absolute -left-[17px] top-1.5" />
              <span className="text-[13px] font-semibold text-[#1f1f1f]">Structure Edited</span>
              <span className="text-[11px] text-[#808080]">By Laura Hills • 2 hours ago</span>
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
