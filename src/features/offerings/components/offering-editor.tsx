'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  X,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Plus,
  Save,
  User,
  Menu,
} from 'lucide-react';

interface OfferingEditorProps {
  sectionCode?: string;
  leadInstructor?: {
    name: string;
    department: string;
    workload: string;
  };
  onCancel: () => void;
  onSave: () => void;
  onChangeStaff: () => void;
  onDeleteOffering?: () => void;
  onOpenMobileMenu?: () => void;
}

export function OfferingEditor({
  sectionCode = 'CSC 301-A',
  leadInstructor = {
    name: 'Dr. Charles Ononiwu',
    department: 'Dept. of Computer Science',
    workload: 'Current workload: 2/3 Courses',
  },
  onCancel,
  onSave,
  onChangeStaff,
  onDeleteOffering,
  onOpenMobileMenu,
}: OfferingEditorProps) {
  const [courseCode, setCourseCode] = useState(
    'CSC 301 (2026/2027 v2) — Software Engineering I'
  );
  const [sessionPeriod, setSessionPeriod] = useState(
    '2026/2027 Session — Semester 1'
  );
  const [programmeContext, setProgrammeContext] = useState(
    'BSc Computer Science — Year 3'
  );
  const [deliveryMode, setDeliveryMode] = useState<'In-person' | 'Online' | 'Hybrid'>(
    'In-person'
  );
  const [targetCapacity, setTargetCapacity] = useState('100');

  const [tutors, setTutors] = useState([
    { id: 'tut-1', name: 'Dr. Ada Lovelace', role: 'Assigned as Tutor' },
  ]);

  const [isSavedToast, setIsSavedToast] = useState(false);

  const handleSave = () => {
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onSave();
    }, 1200);
  };

  const removeTutor = (id: string) => {
    setTutors(tutors.filter((t) => t.id !== id));
  };

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#166534] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Course offering changes saved successfully!</span>
        </div>
      )}

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
            <span>Academic Planning</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span>Offerings</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span className="text-[#1f1f1f] font-semibold">
              {sectionCode} Edit
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Edit Course Offering: {sectionCode}
          </h1>
        </div>

        <button
          onClick={onCancel}
          className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-center"
        >
          <ArrowLeft className="w-4 h-4 text-[#5c5c5c]" />
          <span>Back to Offerings</span>
        </button>
      </header>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Form Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Basic Configuration Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Basic Configuration
              </h3>

              {/* Row 1: Course Version / Catalogue Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#1f1f1f]">
                  Course Version / Catalogue Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-[#1f1f1f] pr-9 focus:outline-none focus:border-[#046aff]"
                  />
                  {courseCode && (
                    <button
                      onClick={() => setCourseCode('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#1f1f1f]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Row 2: Session & Period / Programme Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#1f1f1f]">
                    Academic Session &amp; Period
                  </label>
                  <div className="relative">
                    <select
                      value={sessionPeriod}
                      onChange={(e) => setSessionPeriod(e.target.value)}
                      className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
                    >
                      <option value="2026/2027 Session — Semester 1">
                        2026/2027 Session — Semester 1
                      </option>
                      <option value="2026/2027 Session — Semester 2">
                        2026/2027 Session — Semester 2
                      </option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
                      ▾
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#1f1f1f]">
                    Target Programme Context
                  </label>
                  <div className="relative">
                    <select
                      value={programmeContext}
                      onChange={(e) => setProgrammeContext(e.target.value)}
                      className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
                    >
                      <option value="BSc Computer Science — Year 3">
                        BSc Computer Science — Year 3
                      </option>
                      <option value="BSc Computer Science — Year 2">
                        BSc Computer Science — Year 2
                      </option>
                      <option value="BSc Software Engineering — Year 3">
                        BSc Software Engineering — Year 3
                      </option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
                      ▾
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Delivery Mode & Target Seat Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#1f1f1f]">
                    Delivery Mode
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {(['In-person', 'Online', 'Hybrid'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setDeliveryMode(mode)}
                        className={`flex-1 py-2 px-2.5 rounded-[8px] text-xs font-semibold border transition-colors cursor-pointer text-center ${
                          deliveryMode === mode
                            ? 'bg-[#046aff] text-white border-[#046aff]'
                            : 'bg-white text-[#1f1f1f] border-[#d9d9d9] hover:bg-[#fafafa]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#1f1f1f]">
                    Target Seat Capacity
                  </label>
                  <input
                    type="number"
                    value={targetCapacity}
                    onChange={(e) => setTargetCapacity(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                  />
                </div>
              </div>
            </div>

            {/* Teaching Assignment Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Teaching Assignment
              </h3>

              {/* Lead Instructor */}
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-bold text-[#1f1f1f]">
                  Lead Instructor
                </span>
                <div className="border border-[#e5e5e5] rounded-[12px] p-4 bg-[#fafafa] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#dbeafe] text-[#046aff] flex items-center justify-center font-bold text-sm shrink-0">
                      {leadInstructor.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#1f1f1f]">
                        {leadInstructor.name}
                      </span>
                      <span className="text-[12px] text-[#5c5c5c]">
                        {leadInstructor.department} • {leadInstructor.workload}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onChangeStaff}
                    className="px-3 py-1.5 border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] rounded-[8px] text-xs font-semibold transition-colors cursor-pointer self-start sm:self-center"
                  >
                    Change Staff
                  </button>
                </div>
              </div>

              {/* Co-Instructors & Tutors */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-[#f5f5f5]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#1f1f1f]">
                    Co-Instructors &amp; Tutors ({tutors.length})
                  </span>
                  <button
                    onClick={onChangeStaff}
                    className="text-xs font-semibold text-[#046aff] hover:underline cursor-pointer"
                  >
                    + Add Co-Instructor
                  </button>
                </div>

                {tutors.map((t) => (
                  <div
                    key={t.id}
                    className="border border-[#e5e5e5] rounded-[10px] p-3 bg-[#fafafa] flex items-center justify-between gap-3 text-[13px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center text-xs font-bold">
                        {t.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <span className="font-semibold text-[#1f1f1f]">{t.name}</span>
                      <span className="text-xs text-[#808080]">({t.role})</span>
                    </div>
                    <button
                      onClick={() => removeTutor(t.id)}
                      className="p-1 text-[#a3a3a3] hover:text-[#dc2626] rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduling & Room Requirements Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-3">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Scheduling &amp; Room Requirements
              </h3>
              <div className="flex flex-col gap-2 pt-1 text-[13px] text-[#5c5c5c] font-medium leading-relaxed">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#046aff]" />
                  <span>Requires Computer Laboratory (min 100 workstations)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#046aff]" />
                  <span>Requires multimedia projector and audio PA system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#046aff]" />
                  <span>Exclude scheduling on Friday afternoons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Validation Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5 sticky top-6">
              <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                Validation Status
              </h3>

              <div className="flex flex-col gap-3.5">
                {/* Status Check 1 */}
                <div className="flex items-start gap-2.5 p-3 rounded-[10px] bg-[#f0fdf4] border border-[#bbf7d0]">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#166534]">
                      Target capacity aligned
                    </span>
                    <span className="text-[11px] text-[#166534]">
                      Catalogue limit is 120 seats maximum.
                    </span>
                  </div>
                </div>

                {/* Status Check 2 */}
                <div className="flex items-start gap-2.5 p-3 rounded-[10px] bg-[#fffbeb] border border-[#fde68a]">
                  <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#92400e]">
                      Scheduling overlap risk
                    </span>
                    <span className="text-[11px] text-[#92400e] leading-relaxed">
                      CSC 301 is a prerequisite of CSC 305. Avoid scheduling both at the same hour.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f5f5f5] flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Plan Version History
                </span>
                <span className="text-[12px] text-[#5c5c5c]">
                  Last auto-saved draft: 5 mins ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 shadow-xs flex items-center justify-between gap-4 mt-2">
          <button
            onClick={onDeleteOffering || onCancel}
            className="px-4 py-2 border border-[#fecaca] bg-[#fff5f5] hover:bg-[#fee2e2] text-[#dc2626] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Delete Offering
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
