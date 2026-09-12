'use client';

import React, { useState } from 'react';
import { AlertTriangle, XCircle, Menu, Bold, Italic, Underline } from 'lucide-react';

interface CourseEditorBlockedProps {
  courseCode?: string;
  onCancel: () => void;
  onSaveBlockedDraft: () => void;
  onOpenMobileMenu?: () => void;
}

export function CourseEditorBlocked({
  courseCode = 'CSC 301',
  onCancel,
  onSaveBlockedDraft,
  onOpenMobileMenu,
}: CourseEditorBlockedProps) {
  const [creditsValue] = useState('-2');

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3 max-w-[1440px] mx-auto">
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
              Academic Planning &gt; Course Catalogue &gt; Validation
            </span>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Cannot Submit Course: {courseCode}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Editor Layout ──────────────────────────────────────────── */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Form Card */}
          <div className="flex-1 min-w-0 bg-white border border-[#f0f0f0] rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="p-6 border-b border-[#f5f5f5]">
              <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Course Details</h2>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Course Code — error state */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <label className="text-[13px] font-medium text-[#1f1f1f]">Course Code</label>
                  <span className="text-[#ef4444] text-[13px] font-medium">*</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="CSC 301 — duplicate code"
                    className="w-full h-10 px-3 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#be123c] outline-none pr-9"
                  />
                  <XCircle className="w-4 h-4 text-[#e11d48] absolute right-3 top-3" />
                </div>
              </div>

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <label className="text-[13px] font-medium text-[#1f1f1f]">Course Title</label>
                  <span className="text-[#ef4444] text-[13px] font-medium">*</span>
                </div>
                <input
                  type="text"
                  defaultValue="Software Engineering Methodologies"
                  className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
                />
              </div>

              {/* Description with Rich Text Editor */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#1f1f1f]">Description</label>
                <div className="border border-[#d1d5db] rounded-[8px] overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[#f0f0f0] bg-[#fafafa]">
                    <button className="p-1 hover:bg-[#ebebeb] rounded text-[#1f1f1f] font-bold text-[13px] w-7 h-7 flex items-center justify-center">B</button>
                    <button className="p-1 hover:bg-[#ebebeb] rounded text-[#1f1f1f] italic text-[13px] w-7 h-7 flex items-center justify-center">I</button>
                    <button className="p-1 hover:bg-[#ebebeb] rounded text-[#1f1f1f] underline text-[13px] w-7 h-7 flex items-center justify-center">U</button>
                  </div>
                  <textarea
                    defaultValue="This course introduces fundamental software engineering methodologies, including Agile development practices, CI/CD, system design patterns, and formal verification."
                    className="w-full p-3 text-[13px] text-[#1f1f1f] min-h-[100px] resize-none outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Credits & Level Row */}
              <div className="grid grid-cols-2 gap-5">
                {/* Credits — error state */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <label className="text-[13px] font-medium text-[#1f1f1f]">Credits</label>
                    <span className="text-[#ef4444] text-[13px] font-medium">*</span>
                  </div>
                  <input
                    type="text"
                    defaultValue="-2 (invalid credits)"
                    className="w-full h-10 px-3 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#be123c] outline-none"
                  />
                </div>

                {/* Level */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <label className="text-[13px] font-medium text-[#1f1f1f]">Level</label>
                    <span className="text-[#ef4444] text-[13px] font-medium">*</span>
                  </div>
                  <input
                    type="text"
                    defaultValue="300 Level"
                    className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
                  />
                </div>
              </div>

              {/* Delivery Mode */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#1f1f1f]">Delivery Mode</label>
                <div className="flex items-center gap-5">
                  {['In-person', 'Online', 'Hybrid'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={mode === 'In-person'} className="w-4 h-4 accent-[#046aff]" />
                      <span className="text-[13px] text-[#1f1f1f]">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-6">
            {/* Relations & Metadata Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
              <h3 className="text-[15px] font-semibold text-[#0b0b0b]">Relations &amp; Metadata</h3>

              {/* Owning Department — error */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <label className="text-[13px] font-medium text-[#1f1f1f]">Owning Department</label>
                  <span className="text-[#ef4444] text-[13px] font-medium">*</span>
                </div>
                <input
                  type="text"
                  defaultValue="Owner not selected"
                  className="w-full h-10 px-3 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#808080] outline-none"
                />
              </div>

              {/* Prerequisites — circular dependency */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#ef4444]">Circular Direct Dependencies</label>
                <div className="border border-[#fecdd3] bg-[#fff1f2] rounded-[8px] p-3 flex flex-wrap gap-2">
                  <span className="bg-[#fecdd3] text-[#be123c] text-[12px] font-medium px-2.5 py-1 rounded-full">CSC 201 → CSC 301</span>
                  <span className="bg-[#fecdd3] text-[#be123c] text-[12px] font-medium px-2.5 py-1 rounded-full">CSC 301 → CSC 201</span>
                </div>
              </div>

              {/* Effective Version */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#1f1f1f]">Effective Version</label>
                <input
                  type="text"
                  defaultValue="Draft blocked"
                  className="w-full h-10 px-3 rounded-[8px] bg-[#fff7ed] border border-[#fed7aa] text-[13px] font-medium text-[#c2410c] outline-none"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                  4 validation blockers
                </span>
              </div>
            </div>

            {/* Version History Panel */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-4">
              <p className="text-[13px] font-semibold text-[#e11d48]">
                Duplicate code • Invalid credits • Missing owner • Circular dependency
              </p>
              <div className="flex flex-col gap-4 relative pl-3 border-l-2 border-[#f0f0f0]">
                <div className="flex flex-col gap-0.5 relative">
                  <span className="w-2 h-2 rounded-full bg-[#046aff] absolute -left-[17px] top-1.5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">Version 2.0 (Active)</span>
                    <span className="text-[11px] text-[#808080]">Sep 2025</span>
                  </div>
                  <span className="text-[11px] text-[#808080]">Released previous syllabus updates.</span>
                </div>
                <div className="flex flex-col gap-0.5 relative">
                  <span className="w-2 h-2 rounded-full bg-[#808080] absolute -left-[17px] top-1.5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">Version 1.0</span>
                    <span className="text-[11px] text-[#808080]">Jun 2024</span>
                  </div>
                  <span className="text-[11px] text-[#808080]">Initial syllabus creation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Action Bar ──────────────────────────────────────── */}
      <div className="border-t border-[#f0f0f0] bg-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-end gap-3">
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
    </div>
  );
}
