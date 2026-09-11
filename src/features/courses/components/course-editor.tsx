'use client';

import React, { useState } from 'react';
import { Bold, Italic, Underline, X, Menu } from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';

interface CourseEditorProps {
  courseCode?: string;
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onOpenMobileMenu?: () => void;
}

export function CourseEditor({
  courseCode = 'CSC 301',
  onCancel,
  onSaveDraft,
  onSubmit,
  onOpenMobileMenu,
}: CourseEditorProps) {
  const [code, setCode] = useState(courseCode);
  const [title, setTitle] = useState('Software Engineering Methodologies');
  const [description, setDescription] = useState(
    'This course introduces fundamental software engineering methodologies, including Agile development practices, CI/CD, system design patterns, and formal verification.'
  );
  const [credits, setCredits] = useState('4');
  const [level, setLevel] = useState('300 Level');
  const [deliveryMode, setDeliveryMode] = useState<{ inPerson: boolean; online: boolean; hybrid: boolean }>({
    inPerson: true,
    online: false,
    hybrid: false,
  });
  const [department, setDepartment] = useState('Computer Science');
  const [prereqs, setPrereqs] = useState(['CSC 201', 'MTH 102']);
  const [version, setVersion] = useState('v3.0');

  const togglePrereq = (p: string) => {
    setPrereqs(prereqs.filter((item) => item !== p));
  };

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
              Academic Planning &gt; Course Catalogue &gt; {code} &gt; Edit
            </span>
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Edit Course: {code}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Editor Form Columns (2 Columns) ────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Form Card */}
        <div className="flex-1 min-w-0 bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5 w-full">
          <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Course Details</h2>

          {/* Field: Course Code */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#1f1f1f]">
              Course Code <span className="text-[#dc2626]">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
            />
          </div>

          {/* Field: Course Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#1f1f1f]">
              Course Title <span className="text-[#dc2626]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
            />
          </div>

          {/* Field: Description with Rich Text Toolbar */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#1f1f1f]">Description</label>
            <div className="border border-[#d1d5db] rounded-[8px] overflow-hidden focus-within:border-[#046aff] focus-within:ring-2 focus-within:ring-[#046aff]/20">
              <div className="bg-[#fafafa] border-b border-[#ebebeb] px-3 py-1.5 flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] font-bold text-xs"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] italic text-xs"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] underline text-xs"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-white outline-none text-[13px] text-[#1f1f1f] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Row: Credits & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">
                Credits <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="text"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">
                Level <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>
          </div>

          {/* Field: Delivery Mode Checkboxes */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#1f1f1f]">Delivery Mode</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryMode.inPerson}
                  onChange={(e) =>
                    setDeliveryMode((prev) => ({ ...prev, inPerson: e.target.checked }))
                  }
                  className="rounded border-[#d1d5db] text-[#046aff] focus:ring-[#046aff] w-4 h-4 cursor-pointer"
                />
                <span>In-person</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryMode.online}
                  onChange={(e) =>
                    setDeliveryMode((prev) => ({ ...prev, online: e.target.checked }))
                  }
                  className="rounded border-[#d1d5db] text-[#046aff] focus:ring-[#046aff] w-4 h-4 cursor-pointer"
                />
                <span>Online</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryMode.hybrid}
                  onChange={(e) =>
                    setDeliveryMode((prev) => ({ ...prev, hybrid: e.target.checked }))
                  }
                  className="rounded border-[#d1d5db] text-[#046aff] focus:ring-[#046aff] w-4 h-4 cursor-pointer"
                />
                <span>Hybrid</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Form Column (420px) */}
        <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-6">
          {/* Card 1: Relations & Metadata */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5">
            <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Relations &amp; Metadata</h2>

            {/* Owning Department */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">
                Owning Department <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>

            {/* Prerequisites */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Prerequisites</label>
              <div className="border border-[#d1d5db] rounded-[8px] p-2 flex flex-wrap items-center gap-2 min-h-[42px] bg-white">
                {prereqs.map((prereq) => (
                  <span
                    key={prereq}
                    className="inline-flex items-center gap-1.5 bg-[#f0f8ff] text-[#046aff] px-2.5 py-1 rounded-[6px] text-xs font-semibold"
                  >
                    <span>{prereq}</span>
                    <button
                      type="button"
                      onClick={() => togglePrereq(prereq)}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Effective Version */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">Effective Version</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>

            {/* Lifecycle Status */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f5f5f5]">
              <span className="text-[13px] font-medium text-[#1f1f1f]">Lifecycle Status</span>
              <StatusTag label="In Review" variant="in-review" />
            </div>
          </div>

          {/* Card 2: Version History */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
            <h3 className="text-[15px] font-semibold text-[#0b0b0b]">Version History</h3>

            <div className="flex flex-col gap-4 relative pl-3 border-l-2 border-[#f0f0f0]">
              {/* Item 1 */}
              <div className="flex flex-col gap-0.5 relative">
                <span className="w-2 h-2 rounded-full bg-[#046aff] absolute -left-[17px] top-1.5" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#1f1f1f]">
                    Version 2.0 (Active)
                  </span>
                  <span className="text-[11px] text-[#808080]">Sep 2025</span>
                </div>
                <span className="text-[12px] text-[#5c5c5c]">
                  Released previous syllabus updates.
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col gap-0.5 relative">
                <span className="w-2 h-2 rounded-full bg-[#808080] absolute -left-[17px] top-1.5" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#1f1f1f]">Version 1.0</span>
                  <span className="text-[11px] text-[#808080]">Jun 2024</span>
                </div>
                <span className="text-[12px] text-[#5c5c5c]">Initial syllabus creation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ebebeb]">
        <button
          onClick={onCancel}
          className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none"
        >
          Cancel
        </button>
        <button
          onClick={onSaveDraft}
          className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none"
        >
          Save Draft
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
