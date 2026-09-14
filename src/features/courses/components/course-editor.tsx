'use client';

import React, { useState, useEffect } from 'react';
import { Bold, Italic, Underline, X, Menu, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';
import { useCreateCourse, useUpdateCourse, useSubmitCourse, useCourse } from '@/hooks/use-courses';

interface CourseEditorProps {
  courseId?: string;
  courseCode?: string;
  rowVersion?: number;
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onOpenMobileMenu?: () => void;
}

const DEPARTMENTS = [
  { id: '123e4567-e89b-12d3-a456-426614174000', name: 'Computer Science' },
  { id: '223e4567-e89b-12d3-a456-426614174001', name: 'Software Engineering' },
  { id: '323e4567-e89b-12d3-a456-426614174002', name: 'Information Technology' },
  { id: '423e4567-e89b-12d3-a456-426614174003', name: 'Mathematics' },
  { id: '523e4567-e89b-12d3-a456-426614174004', name: 'Physics' },
];

export function CourseEditor({
  courseId,
  courseCode = 'CSC 301',
  rowVersion = 1,
  onCancel,
  onSaveDraft,
  onSubmit,
  onOpenMobileMenu,
}: CourseEditorProps) {
  const isNew = courseCode === 'NEW 101' || !courseId;

  const [code, setCode] = useState(courseCode === 'NEW 101' ? '' : courseCode);
  const [title, setTitle] = useState(
    courseCode === 'NEW 101' ? '' : 'Software Engineering Methodologies'
  );
  const [description, setDescription] = useState(
    courseCode === 'NEW 101'
      ? ''
      : 'This course introduces fundamental software engineering methodologies, including Agile development practices, CI/CD, system design patterns, and formal verification.'
  );
  const [credits, setCredits] = useState('4');
  const [level, setLevel] = useState('300 Level');
  const [currentRowVersion, setCurrentRowVersion] = useState(rowVersion);
  const [deliveryMode, setDeliveryMode] = useState<{ inPerson: boolean; online: boolean; hybrid: boolean }>({
    inPerson: true,
    online: false,
    hybrid: false,
  });
  const [departmentId, setDepartmentId] = useState(DEPARTMENTS[0].id);
  const [prereqs, setPrereqs] = useState(['CSC 201', 'MTH 102']);
  const [version, setVersion] = useState('v3.0');
  const [status, setStatus] = useState('In Review');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { data: courseDetailResponse, isLoading: isFetchingCourse } = useCourse(courseId);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const submitCourseMutation = useSubmitCourse();

  useEffect(() => {
    if (courseDetailResponse?.data) {
      const course = courseDetailResponse.data;
      if (course.code) setCode(course.code);
      if (course.title) setTitle(course.title);
      if (course.description !== undefined && course.description !== null) {
        setDescription(course.description);
      }
      if (course.credits !== undefined && course.credits !== null) {
        setCredits(String(course.credits));
      }
      if (course.department_id) {
        setDepartmentId(course.department_id);
      }
      if (course.row_version !== undefined) {
        setCurrentRowVersion(course.row_version);
      }
      if (course.status) {
        setStatus(course.status);
      }
      if (course.version_number !== undefined) {
        setVersion(`v${course.version_number}.0`);
      }
      if (course.delivery_attributes) {
        setDeliveryMode({
          inPerson: Boolean(course.delivery_attributes.inPerson ?? true),
          online: Boolean(course.delivery_attributes.online ?? false),
          hybrid: Boolean(course.delivery_attributes.hybrid ?? false),
        });
      }
    }
  }, [courseDetailResponse]);

  const togglePrereq = (p: string) => {
    setPrereqs(prereqs.filter((item) => item !== p));
  };

  const handleSaveCourse = async (isSubmit = false) => {
    setFormError(null);
    setSuccessMessage(null);

    if (isNew && !code.trim()) {
      setFormError('Course code is required (min 1, max 50 characters).');
      return;
    }

    if (!title.trim()) {
      setFormError('Course title is required (min 1, max 200 characters).');
      return;
    }

    const numericCredits = Number(credits);
    if (isNaN(numericCredits) || numericCredits <= 0) {
      setFormError('Credits must be a positive number.');
      return;
    }

    try {
      if (courseId) {
        // Step 1: Update Course (PATCH /api/v1/courses/{course_id})
        const updateResult = await updateCourseMutation.mutateAsync({
          courseId,
          payload: {
            row_version: currentRowVersion,
            title: title.trim(),
            credits: numericCredits,
            description: description.trim() || null,
            delivery_attributes: deliveryMode,
          },
        });

        const nextRowVersion = updateResult.data?.row_version ?? currentRowVersion;
        setCurrentRowVersion(nextRowVersion);

        // Step 2: If Submit clicked, dispatch POST /api/v1/courses/{course_id}/submit
        if (isSubmit) {
          const submitResult = await submitCourseMutation.mutateAsync({
            courseId,
            payload: {
              row_version: nextRowVersion,
            },
          });
          setSuccessMessage(submitResult.message || 'Course submitted for review successfully.');
        } else {
          setSuccessMessage(updateResult.message || 'Course draft saved successfully.');
        }
      } else {
        // Create Course (POST /api/v1/courses)
        const createResult = await createCourseMutation.mutateAsync({
          code: code.trim() || 'CSC 101',
          title: title.trim(),
          department_id: departmentId,
          credits: numericCredits,
          description: description.trim() || null,
          delivery_attributes: deliveryMode,
        });

        // If submit clicked on newly created course
        if (isSubmit && createResult.data?.id) {
          await submitCourseMutation.mutateAsync({
            courseId: createResult.data.id,
            payload: {
              row_version: createResult.data.row_version ?? 1,
            },
          });
          setSuccessMessage('Course created and submitted for review successfully.');
        } else {
          setSuccessMessage(createResult.message || 'Course successfully created and registered.');
        }
      }

      setTimeout(() => {
        if (isSubmit) {
          onSubmit();
        } else {
          onSaveDraft();
        }
      }, 900);
    } catch (err: any) {
      setFormError(err.message || 'Failed to process course. Please verify input fields.');
    }
  };

  const isLoading =
    createCourseMutation.isPending ||
    updateCourseMutation.isPending ||
    submitCourseMutation.isPending;

  const fieldErrors =
    createCourseMutation.error?.fieldErrors ||
    updateCourseMutation.error?.fieldErrors ||
    submitCourseMutation.error?.fieldErrors;

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-lg border border-[#ebebeb] text-[#1f1f1f] hover:bg-[#f5f5f5] cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[#808080]">
              Academic Planning &gt; Course Catalogue &gt; {code || 'New Course'} &gt; Edit
            </span>
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              {isNew ? 'Create New Course' : `Edit Course: ${code}`}
            </h1>
          </div>
        </div>
      </div>

      {/* Loading course details indicator */}
      {isFetchingCourse && (
        <div className="flex items-center gap-2 text-[13px] text-[#046aff] bg-[#f0f8ff] p-3 rounded-xl border border-[#bae6fd]">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Fetching course details from server…</span>
        </div>
      )}

      {/* Error Alert */}
      {formError && (
        <div
          className="flex items-start gap-2.5 p-4 rounded-xl border border-[#F69999] bg-[#FEF0F0]"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]" aria-hidden="true" />
          <div className="flex flex-col gap-1 text-[13px] text-[#DC2626]">
            <span className="font-semibold">Unable to process course:</span>
            <span>{formError}</span>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div
          className="flex items-start gap-2.5 p-4 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4]"
          role="status"
        >
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#16a34a]" aria-hidden="true" />
          <span className="text-[13px] font-medium text-[#16a34a]">{successMessage}</span>
        </div>
      )}

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
              disabled={isLoading || !isNew}
              maxLength={50}
              placeholder="e.g. CSC 301"
              className={`w-full h-10 px-3 rounded-[8px] bg-white border outline-none text-[13px] font-medium text-[#1f1f1f] transition-all ${
                !isNew ? 'bg-[#f5f5f5] text-[#5c5c5c] cursor-not-allowed border-[#ebebeb]' : ''
              } ${
                fieldErrors?.code
                  ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
                  : 'border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20'
              }`}
            />
            {fieldErrors?.code && (
              <span className="text-[11px] text-[#dc2626]">{fieldErrors.code}</span>
            )}
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
              disabled={isLoading}
              maxLength={200}
              placeholder="e.g. Software Engineering Methodologies"
              className={`w-full h-10 px-3 rounded-[8px] bg-white border outline-none text-[13px] font-medium text-[#1f1f1f] transition-all ${
                fieldErrors?.title
                  ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
                  : 'border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20'
              }`}
            />
            {fieldErrors?.title && (
              <span className="text-[11px] text-[#dc2626]">{fieldErrors.title}</span>
            )}
          </div>

          {/* Field: Description with Rich Text Toolbar */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#1f1f1f]">Description</label>
            <div className="border border-[#d1d5db] rounded-[8px] overflow-hidden focus-within:border-[#046aff] focus-within:ring-2 focus-within:ring-[#046aff]/20">
              <div className="bg-[#fafafa] border-b border-[#ebebeb] px-3 py-1.5 flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] font-bold text-xs cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] italic text-xs cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-[#ebebeb] text-[#5c5c5c] hover:text-[#1f1f1f] underline text-xs cursor-pointer"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                placeholder="Course syllabus description..."
                className="w-full p-3 bg-white outline-none text-[13px] text-[#1f1f1f] resize-none leading-relaxed"
              />
            </div>
            {fieldErrors?.description && (
              <span className="text-[11px] text-[#dc2626]">{fieldErrors.description}</span>
            )}
          </div>

          {/* Row: Credits & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">
                Credits <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                disabled={isLoading}
                className={`w-full h-10 px-3 rounded-[8px] bg-white border outline-none text-[13px] font-medium text-[#1f1f1f] transition-all ${
                  fieldErrors?.credits
                    ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
                    : 'border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20'
                }`}
              />
              {fieldErrors?.credits && (
                <span className="text-[11px] text-[#dc2626]">{fieldErrors.credits}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#1f1f1f]">
                Level <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                disabled={isLoading}
                className={`w-full h-10 px-3 rounded-[8px] bg-white border outline-none text-[13px] font-medium text-[#1f1f1f] transition-all cursor-pointer ${
                  fieldErrors?.department_id
                    ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
                    : 'border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20'
                }`}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {fieldErrors?.department_id && (
                <span className="text-[11px] text-[#dc2626]">{fieldErrors.department_id}</span>
              )}
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
                disabled={isLoading}
                className="w-full h-10 px-3 rounded-[8px] bg-white border border-[#d1d5db] focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/20 outline-none text-[13px] font-medium text-[#1f1f1f] transition-all"
              />
            </div>

            {/* Lifecycle Status */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f5f5f5]">
              <span className="text-[13px] font-medium text-[#1f1f1f]">Lifecycle Status</span>
              <StatusTag
                label={status}
                variant={status.toLowerCase().includes('pub') ? 'published' : 'in-review'}
              />
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
          disabled={isLoading}
          className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSaveCourse(false)}
          disabled={isLoading}
          className="border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving…</span>
            </>
          ) : (
            <span>Save Draft</span>
          )}
        </button>
        <button
          onClick={() => handleSaveCourse(true)}
          disabled={isLoading}
          className="bg-[#335cff] hover:bg-[#254bdb] text-white px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-xs cursor-pointer select-none flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting…</span>
            </>
          ) : (
            <span>Submit for Review</span>
          )}
        </button>
      </div>
    </div>
  );
}
