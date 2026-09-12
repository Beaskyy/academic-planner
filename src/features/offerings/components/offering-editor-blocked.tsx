'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, Menu, XCircle, ChevronDown, Trash2 } from 'lucide-react';

interface OfferingEditorBlockedProps {
  onCancel: () => void;
  onSaveBlockedDraft: () => void;
  onOpenMobileMenu?: () => void;
}

const validationItems = [
  {
    icon: 'error',
    title: 'Published dependencies required',
    description: 'Course, curriculum and period versions must be published.',
  },
  {
    icon: 'warn',
    title: 'Lead, capacity, identity and overlap checks failed',
    description: 'Resolve every blocker before independent review.',
  },
];

export function OfferingEditorBlocked({
  onCancel,
  onSaveBlockedDraft,
  onOpenMobileMenu,
}: OfferingEditorBlockedProps) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 border-b border-[#f0f0f0]">
        <div className="max-w-[1440px] mx-auto flex items-center gap-3">
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
              Academic Planning &gt; Offerings &gt; Validation
            </span>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Cannot Submit Offering: CSC 301-A
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Form Panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Config Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h2 className="text-[15px] font-semibold text-[#0b0b0b] mb-5">Basic Configuration</h2>
              <div className="flex flex-col gap-5">
                {/* Course Version / Catalogue Code — error */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Course Version / Catalogue Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Unpublished course version selected"
                      className="w-full h-10 px-3 pr-9 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#be123c] outline-none"
                    />
                    <XCircle className="w-4 h-4 text-[#e11d48] absolute right-3 top-3" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Academic Session & Period — error */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Academic Session &amp; Period</label>
                    <div className="relative">
                      <select
                        className="w-full h-10 px-3 pr-8 rounded-[8px] bg-[#fff7ed] border border-[#fed7aa] text-[13px] font-medium text-[#c2410c] outline-none appearance-none cursor-pointer"
                        defaultValue="error"
                      >
                        <option value="error">Period dependency is not published</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#c2410c] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Target Programme Context — error */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Target Programme Context</label>
                    <div className="relative">
                      <select
                        className="w-full h-10 px-3 pr-8 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#be123c] outline-none appearance-none cursor-pointer"
                        defaultValue="error"
                      >
                        <option value="error">Duplicate section identity: CSC 301-A</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#e11d48] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Delivery Mode */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Delivery Mode</label>
                    <div className="flex items-center gap-5 py-2">
                      {['In-person', 'Online', 'Hybrid'].map((mode) => (
                        <label key={mode} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="delivery" defaultChecked={mode === 'In-person'} className="w-4 h-4 accent-[#046aff]" />
                          <span className="text-[13px] text-[#1f1f1f]">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Target Seat Capacity — error */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Target Seat Capacity</label>
                    <input
                      type="text"
                      defaultValue="0 (capacity must be positive)"
                      className="w-full h-10 px-3 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] text-[13px] font-medium text-[#be123c] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Card */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h2 className="text-[15px] font-semibold text-[#0b0b0b] mb-5">Teaching Assignment</h2>

              {/* Lead Instructor */}
              <div className="flex flex-col gap-3">
                <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Lead Instructor — Required</label>
                <div className="flex items-center gap-4 p-4 bg-[#fff1f2] border border-[#fecdd3] rounded-[10px]">
                  <div className="w-10 h-10 rounded-[8px] bg-[#fecdd3] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#be123c]">No active lead assigned</p>
                    <p className="text-[12px] text-[#808080]">Identity reference inactive • effective dates unavailable</p>
                  </div>
                  <button className="border border-[#046aff] text-[#046aff] text-[12px] font-medium px-3 py-1.5 rounded-[6px] hover:bg-[#f0f8ff] transition-colors cursor-pointer whitespace-nowrap">
                    Assign Lead
                  </button>
                </div>
              </div>

              {/* Co-Instructors */}
              <div className="flex flex-col gap-3 mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-[#808080] uppercase tracking-wide">Co-Instructors &amp; Tutors</label>
                  <button className="text-[13px] text-[#046aff] font-medium hover:text-[#254bdb] transition-colors cursor-pointer">+ Add Co-Instructor</button>
                </div>
                <div className="flex items-center gap-4 p-3 bg-[#fff7ed] border border-[#fed7aa] rounded-[10px]">
                  <div className="w-8 h-8 rounded-full bg-[#fed7aa] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#c2410c]">Assignment overlap detected</p>
                    <p className="text-[12px] text-[#808080]">Tutor dates overlap another section</p>
                  </div>
                  <button className="p-1.5 hover:bg-[#fecdd3] rounded-[6px] transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4 text-[#808080]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scheduling & Room Requirements */}
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h2 className="text-[15px] font-semibold text-[#0b0b0b] mb-4">Scheduling &amp; Room Requirements</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] mt-[6px] flex-shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f]">Requires Computer Laboratory (min 100 workstations)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] mt-[6px] flex-shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f]">Requires multimedia projector and audio PA system</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] mt-[6px] flex-shrink-0" />
                  <span className="text-[13px] text-[#1f1f1f]">Exclude scheduling on Friday afternoons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Validation Panel */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h3 className="text-[15px] font-semibold text-[#0b0b0b] mb-5">
                Validation Status — 6 Blockers
              </h3>

              <div className="flex flex-col gap-4">
                {/* Error check */}
                <div className="flex items-start gap-3 p-3 bg-[#fff1f2] rounded-[10px] border border-[#fecdd3]">
                  <XCircle className="w-4 h-4 text-[#e11d48] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#be123c]">Published dependencies required</p>
                    <p className="text-[12px] text-[#808080] mt-0.5">Course, curriculum and period versions must be published.</p>
                  </div>
                </div>

                {/* Warning check */}
                <div className="flex items-start gap-3 p-3 bg-[#fff7ed] rounded-[10px] border border-[#fed7aa]">
                  <AlertTriangle className="w-4 h-4 text-[#c2410c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#c2410c]">Lead, capacity, identity and overlap checks failed</p>
                    <p className="text-[12px] text-[#808080] mt-0.5">Resolve every blocker before independent review.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#f5f5f5]">
                <p className="text-[12px] font-semibold text-[#808080]">Plan version history</p>
                <p className="text-[12px] text-[#808080] mt-1">Last auto-saved draft: 5 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Action Bar ──────────────────────────────────────── */}
      <div className="border-t border-[#f0f0f0] bg-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer">
            ← Go to Offering List
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSaveBlockedDraft}
              className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Save Blocked Draft
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
    </div>
  );
}
