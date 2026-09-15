"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Plus,
  Save,
  GitCompare,
  Send,
  CheckCircle2,
  Trash2,
  Menu,
} from "lucide-react";
import { StatusTag } from "@/features/planning-home/components/status-tag";
import {
  useAddCourseMapping,
  useCreateCurriculum,
  useCurriculum,
  useListCourseMappings,
  useSubmitCurriculum,
} from "@/hooks/use-curricula";
import type { CurriculumCreateResponse } from "@/types/curricula";

interface CurriculumEditorProps {
  onCancel: () => void;
  onCompareDiff: () => void;
  onSubmitForReview: () => void;
  onOpenMobileMenu?: () => void;
}

interface CourseRow {
  id: string;
  period: string;
  code: string;
  title: string;
  role: "Required" | "Elective";
  credits: number;
  electiveGroup: string;
}

export function CurriculumEditor({
  onCancel,
  onCompareDiff,
  onSubmitForReview,
  onOpenMobileMenu,
}: CurriculumEditorProps) {
  const createCurriculum = useCreateCurriculum();
  const addCourseMapping = useAddCourseMapping();
  const submitCurriculum = useSubmitCurriculum();
  const [curriculumId, setCurriculumId] = useState("");
  const [rowVersion, setRowVersion] = useState("1");
  const [mappingCourseId, setMappingCourseId] = useState("");
  const [mappingLevelPeriod, setMappingLevelPeriod] = useState(
    "Year 1 - Semester 1",
  );
  const [mappingRequirementType, setMappingRequirementType] =
    useState("Required");
  const [mappingCredits, setMappingCredits] = useState("");
  const [mappingElectiveGroup, setMappingElectiveGroup] = useState("");
  const [mappingError, setMappingError] = useState<string | null>(null);
  const curriculumQuery = useCurriculum(curriculumId);
  const mappingsQuery = useListCourseMappings(curriculumId);
  const [programmeId, setProgrammeId] = useState("");
  const [cohortIntake, setCohortIntake] = useState("2026/2027");
  const [minimumCredits, setMinimumCredits] = useState("120");
  const [totalCredits, setTotalCredits] = useState("120");
  const [levelPeriodStructure, setLevelPeriodStructure] = useState("{}");
  const [localError, setLocalError] = useState<string | null>(null);
  const [year1Courses, setYear1Courses] = useState<CourseRow[]>([
    {
      id: "y1-1",
      period: "Semester 1",
      code: "CSC 101",
      title: "Introduction to Programming",
      role: "Required",
      credits: 4,
      electiveGroup: "None",
    },
    {
      id: "y1-2",
      period: "Semester 1",
      code: "MTH 101",
      title: "Calculus I",
      role: "Required",
      credits: 4,
      electiveGroup: "None",
    },
    {
      id: "y1-3",
      period: "Semester 2",
      code: "GST 102",
      title: "Philosophy & Logic",
      role: "Elective",
      credits: 2,
      electiveGroup: "Group GenEd",
    },
  ]);

  const [year2Courses, setYear2Courses] = useState<CourseRow[]>([
    {
      id: "y2-1",
      period: "Semester 1",
      code: "CSC 201",
      title: "Data Structures & Algorithms",
      role: "Required",
      credits: 4,
      electiveGroup: "None",
    },
    {
      id: "y2-2",
      period: "Semester 2",
      code: "CSC 212",
      title: "Introduction to Cyber Security",
      role: "Elective",
      credits: 3,
      electiveGroup: "Group Tech",
    },
  ]);

  const [isSavedToast, setIsSavedToast] = useState(false);

  const handleSaveDraft = () => {
    setLocalError(null);
    let parsedStructure: Record<string, unknown> | null = null;

    try {
      const parsedValue: unknown = JSON.parse(levelPeriodStructure);
      if (
        typeof parsedValue !== "object" ||
        parsedValue === null ||
        Array.isArray(parsedValue)
      ) {
        setLocalError("Level / period structure must be a JSON object.");
        return;
      }
      parsedStructure = parsedValue as Record<string, unknown>;
    } catch {
      setLocalError("Level / period structure must contain valid JSON.");
      return;
    }

    if (
      !programmeId.trim() ||
      !cohortIntake.trim() ||
      parsedStructure === null
    ) {
      setLocalError("Programme ID and cohort intake are required.");
      return;
    }

    createCurriculum.mutate(
      {
        programme_id: programmeId.trim(),
        cohort_intake: cohortIntake.trim(),
        level_period_structure: parsedStructure,
        minimum_credits: minimumCredits === "" ? null : Number(minimumCredits),
        total_credits: totalCredits === "" ? null : Number(totalCredits),
      },
      { onSuccess: handleCreateSuccess },
    );
  };

  const handleCreateSuccess = (response: CurriculumCreateResponse) => {
    setCurriculumId(response.data.id);
    setRowVersion(String(response.data.row_version));
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleSubmitCurriculum = () => {
    const parsedRowVersion = Number(rowVersion);

    if (!curriculumId) {
      setLocalError("Save the curriculum before submitting it for review.");
      return;
    }

    if (!Number.isInteger(parsedRowVersion) || parsedRowVersion < 0) {
      setLocalError("Row version must be a valid integer.");
      return;
    }

    setLocalError(null);
    submitCurriculum.mutate(
      {
        curriculumId,
        payload: { row_version: parsedRowVersion },
      },
      {
        onSuccess: (response) => {
          setRowVersion(String(response.data.row_version));
          onSubmitForReview();
        },
      },
    );
  };

  const handleAddCourseMapping = () => {
    setMappingError(null);
    const creditsCounted = Number(mappingCredits);

    if (
      !curriculumId ||
      !mappingCourseId.trim() ||
      !mappingLevelPeriod.trim() ||
      !mappingRequirementType.trim()
    ) {
      setMappingError(
        "Save the curriculum first and provide the curriculum and course UUIDs.",
      );
      return;
    }

    if (!Number.isFinite(creditsCounted)) {
      setMappingError("Credits counted must be a number.");
      return;
    }

    addCourseMapping.mutate({
      curriculumId,
      payload: {
        course_id: mappingCourseId.trim(),
        credits_counted: creditsCounted,
        level_period: mappingLevelPeriod.trim(),
        requirement_type: mappingRequirementType.trim(),
        elective_group: mappingElectiveGroup.trim() || null,
      },
    });
  };

  const handleAddYear1Course = () => {
    const newCourse: CourseRow = {
      id: `y1-${Date.now()}`,
      period: "Semester 2",
      code: "CSC 104",
      title: "Digital Systems Logic",
      role: "Required",
      credits: 3,
      electiveGroup: "None",
    };
    setYear1Courses((prev) => [...prev, newCourse]);
  };

  const handleAddYear2Course = () => {
    const newCourse: CourseRow = {
      id: `y2-${Date.now()}`,
      period: "Semester 1",
      code: "CSC 204",
      title: "Computer Architecture",
      role: "Required",
      credits: 3,
      electiveGroup: "None",
    };
    setYear2Courses((prev) => [...prev, newCourse]);
  };

  const removeYear1Course = (id: string) => {
    setYear1Courses((prev) => prev.filter((c) => c.id !== id));
  };

  const removeYear2Course = (id: string) => {
    setYear2Courses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#166534] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Curriculum draft saved successfully!</span>
        </div>
      )}

      {/* Top Header */}
      <header className="px-6 sm:px-8 pt-8 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#f0f0f0] bg-white">
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
            <span className="text-[#1f1f1f] font-semibold">
              Curriculum v3.0 (Draft)
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
              Curriculum Editor — BSc Computer Science v3.0
            </h1>
            <StatusTag label="DRAFT" variant="draft" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={createCurriculum.isPending}
            className="px-3.5 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-[#5c5c5c]" />
            <span>
              {createCurriculum.isPending ? "Saving..." : "Save Draft"}
            </span>
          </button>
          <button
            onClick={onCompareDiff}
            className="px-3.5 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#5c5c5c]" />
            <span>Compare Diff</span>
          </button>
          <button
            onClick={handleSubmitCurriculum}
            disabled={submitCurriculum.isPending}
            className="px-4 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {submitCurriculum.isPending
                ? "Submitting..."
                : "Submit for Review"}
            </span>
          </button>
        </div>
      </header>

      {/* Content Body */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* Summary Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="curriculum-programme-id"
              className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
            >
              Programme ID
            </label>
            <input
              id="curriculum-programme-id"
              value={programmeId}
              onChange={(event) => setProgrammeId(event.target.value)}
              placeholder="Programme UUID"
              className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="curriculum-cohort-intake"
              className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
            >
              Cohort Intake
            </label>
            <input
              id="curriculum-cohort-intake"
              value={cohortIntake}
              onChange={(event) => setCohortIntake(event.target.value)}
              maxLength={50}
              className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="curriculum-total-credits"
              className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
            >
              Total Credits
            </label>
            <input
              id="curriculum-total-credits"
              type="number"
              min="0"
              value={totalCredits}
              onChange={(event) => setTotalCredits(event.target.value)}
              className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="curriculum-minimum-credits"
              className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
            >
              Minimum Credits
            </label>
            <input
              id="curriculum-minimum-credits"
              type="number"
              min="0"
              value={minimumCredits}
              onChange={(event) => setMinimumCredits(event.target.value)}
              className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="curriculum-row-version"
              className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
            >
              Row Version
            </label>
            <input
              id="curriculum-row-version"
              type="number"
              min="0"
              step="1"
              value={rowVersion}
              onChange={(event) => setRowVersion(event.target.value)}
              className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-2">
          <label
            htmlFor="curriculum-level-period-structure"
            className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider"
          >
            Level / Period Structure (JSON)
          </label>
          <textarea
            id="curriculum-level-period-structure"
            value={levelPeriodStructure}
            onChange={(event) => setLevelPeriodStructure(event.target.value)}
            rows={3}
            className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 font-mono text-[13px] text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
          />
        </div>

        {(localError ||
          createCurriculum.isError ||
          submitCurriculum.isError) && (
          <div
            role="alert"
            className="rounded-[10px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#b91c1c]"
          >
            {localError ||
              createCurriculum.error?.message ||
              submitCurriculum.error?.message}
            {createCurriculum.error?.rawErrors?.map((error, index) => (
              <div key={`${error.type}-${index}`}>{error.msg}</div>
            ))}
            {submitCurriculum.error?.rawErrors?.map((error, index) => (
              <div key={`submit-${error.type}-${index}`}>{error.msg}</div>
            ))}
          </div>
        )}

        {/* 2-Column Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Editor Stream */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Year 1 Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  Year 1 Mapping
                </h3>
                <span className="text-[13px] font-semibold text-[#5c5c5c]">
                  Total: 30 Credits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Period</th>
                      <th className="py-2.5 px-3">Course Code</th>
                      <th className="py-2.5 px-3">Course Title</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Credits</th>
                      <th className="py-2.5 px-3">Elective Group</th>
                      <th className="py-2.5 px-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                    {year1Courses.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-[#fafafa] transition-colors"
                      >
                        <td className="py-3 px-3 text-[#5c5c5c] font-medium">
                          {c.period}
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          {c.code}
                        </td>
                        <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                          {c.title}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              c.role === "Required"
                                ? "bg-[#eef4ff] text-[#046aff] border border-[#d2e4ff]"
                                : "bg-[#faf5ff] text-[#7e22ce] border border-[#e9d5ff]"
                            }`}
                          >
                            {c.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          {c.credits}
                        </td>
                        <td className="py-3 px-3 text-[#5c5c5c]">
                          {c.electiveGroup}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => removeYear1Course(c.id)}
                            className="p-1 text-[#a3a3a3] hover:text-[#dc2626] rounded-md hover:bg-[#fef2f2] transition-colors"
                            title="Remove course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddYear1Course}
                  className="px-4 py-2 border border-dashed border-[#046aff] bg-[#f0f8ff]/50 hover:bg-[#f0f8ff] text-[#046aff] rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Course to Year 1</span>
                </button>
              </div>
            </div>

            {/* Year 2 Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  Year 2 Mapping
                </h3>
                <span className="text-[13px] font-semibold text-[#5c5c5c]">
                  Total: 32 Credits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Period</th>
                      <th className="py-2.5 px-3">Course Code</th>
                      <th className="py-2.5 px-3">Course Title</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Credits</th>
                      <th className="py-2.5 px-3">Elective Group</th>
                      <th className="py-2.5 px-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                    {year2Courses.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-[#fafafa] transition-colors"
                      >
                        <td className="py-3 px-3 text-[#5c5c5c] font-medium">
                          {c.period}
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          {c.code}
                        </td>
                        <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                          {c.title}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              c.role === "Required"
                                ? "bg-[#eef4ff] text-[#046aff] border border-[#d2e4ff]"
                                : "bg-[#faf5ff] text-[#7e22ce] border border-[#e9d5ff]"
                            }`}
                          >
                            {c.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          {c.credits}
                        </td>
                        <td className="py-3 px-3 text-[#5c5c5c]">
                          {c.electiveGroup}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => removeYear2Course(c.id)}
                            className="p-1 text-[#a3a3a3] hover:text-[#dc2626] rounded-md hover:bg-[#fef2f2] transition-colors"
                            title="Remove course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddYear2Course}
                  className="px-4 py-2 border border-dashed border-[#046aff] bg-[#f0f8ff]/50 hover:bg-[#f0f8ff] text-[#046aff] rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Course to Year 2</span>
                </button>
              </div>
            </div>

            {/* Grand Total Bar */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[16px] p-5 flex items-center justify-between shadow-xs">
              <span className="text-[14px] font-bold text-[#166534]">
                Grand Total Draft Credits
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-[#166534]">
                  120 / 120 Credits
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#15803d] border border-[#86efac]">
                  Aligned
                </span>
              </div>
            </div>
          </div>

          {/* Right Validation Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
              {curriculumQuery.isError && (
                <div
                  role="alert"
                  className="rounded-[8px] border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]"
                >
                  {curriculumQuery.error.message}
                  {curriculumQuery.error.rawErrors?.map((error, index) => (
                    <div key={`curriculum-${error.type}-${index}`}>
                      {error.msg}
                    </div>
                  ))}
                </div>
              )}
              {curriculumQuery.data && (
                <div className="rounded-[8px] border border-[#e0e7ff] bg-[#f8faff] px-3 py-2 text-[12px] text-[#334155]">
                  Loaded {curriculumQuery.data.data.status} curriculum v
                  {curriculumQuery.data.data.version_number} with row version{" "}
                  {curriculumQuery.data.data.row_version}.
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Course Mappings
                  </h3>
                  <p className="text-[12px] text-[#808080] mt-1">
                    {mappingsQuery.data
                      ? `${mappingsQuery.data.data.length} mapped course${mappingsQuery.data.data.length === 1 ? "" : "s"}`
                      : "Save a curriculum to load mappings."}
                  </p>
                </div>
                {mappingsQuery.isFetching && (
                  <span className="text-[11px] text-[#808080]">
                    Refreshing...
                  </span>
                )}
              </div>

              {mappingsQuery.isError && (
                <div
                  role="alert"
                  className="rounded-[8px] border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]"
                >
                  {mappingsQuery.error.message}
                  {mappingsQuery.error.rawErrors?.map((error, index) => (
                    <div key={`${error.type}-${index}`}>{error.msg}</div>
                  ))}
                </div>
              )}

              {!mappingsQuery.isLoading &&
                !mappingsQuery.isError &&
                mappingsQuery.data?.data.length === 0 && (
                  <p className="text-[12px] text-[#808080]">
                    No course mappings found.
                  </p>
                )}

              {mappingsQuery.data && mappingsQuery.data.data.length > 0 && (
                <div className="flex flex-col gap-2">
                  {mappingsQuery.data.data.map((mapping) => (
                    <div
                      key={mapping.id}
                      className="rounded-[8px] border border-[#f0f0f0] bg-[#fafafa] px-3 py-2 text-[12px]"
                    >
                      <div className="font-semibold text-[#1f1f1f]">
                        {mapping.course_id}
                      </div>
                      <div className="text-[#5c5c5c]">
                        {mapping.level_period} · {mapping.requirement_type} ·{" "}
                        {mapping.credits_counted} credits
                      </div>
                      {mapping.elective_group && (
                        <div className="text-[#808080]">
                          Group: {mapping.elective_group}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  Add Course Mapping
                </h3>
                <p className="text-[12px] text-[#808080] mt-1">
                  Save the curriculum first, then add a course by UUID.
                </p>
              </div>

              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Curriculum ID
                <input
                  value={curriculumId}
                  onChange={(event) => setCurriculumId(event.target.value)}
                  placeholder="Curriculum UUID"
                  className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Course ID
                <input
                  value={mappingCourseId}
                  onChange={(event) => setMappingCourseId(event.target.value)}
                  placeholder="Course UUID"
                  className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Level / Period
                <input
                  value={mappingLevelPeriod}
                  onChange={(event) =>
                    setMappingLevelPeriod(event.target.value)
                  }
                  maxLength={50}
                  className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Requirement Type
                  <input
                    value={mappingRequirementType}
                    onChange={(event) =>
                      setMappingRequirementType(event.target.value)
                    }
                    className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Credits Counted
                  <input
                    type="number"
                    value={mappingCredits}
                    onChange={(event) => setMappingCredits(event.target.value)}
                    className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Elective Group
                <input
                  value={mappingElectiveGroup}
                  onChange={(event) =>
                    setMappingElectiveGroup(event.target.value)
                  }
                  maxLength={100}
                  placeholder="Optional"
                  className="rounded-[8px] border border-[#d9d9d9] px-2.5 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                />
              </label>

              {(mappingError || addCourseMapping.isError) && (
                <div
                  role="alert"
                  className="rounded-[8px] border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]"
                >
                  {mappingError || addCourseMapping.error?.message}
                  {addCourseMapping.error?.rawErrors?.map((error, index) => (
                    <div key={`${error.type}-${index}`}>{error.msg}</div>
                  ))}
                </div>
              )}

              {addCourseMapping.isSuccess && (
                <div className="rounded-[8px] border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2 text-[12px] text-[#166534]">
                  Course mapping added successfully.
                </div>
              )}

              <button
                type="button"
                onClick={handleAddCourseMapping}
                disabled={addCourseMapping.isPending}
                className="rounded-[10px] bg-[#046aff] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0356d6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {addCourseMapping.isPending
                  ? "Adding Mapping..."
                  : "Add Course Mapping"}
              </button>
            </div>

            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]">
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  Curriculum Validation
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>All Clear</span>
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {/* Check 1 */}
                <div className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1f1f1f]">
                      Total Credit Check
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">
                      Pass ✓
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                    Target: 120. Draft contains exactly 120 credits.
                  </p>
                </div>

                {/* Check 2 */}
                <div className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1f1f1f]">
                      Prerequisite Chains
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">
                      Pass ✓
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                    All core sequence prerequisite courses mapped correctly.
                  </p>
                </div>

                {/* Check 3 */}
                <div className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1f1f1f]">
                      Elective Group Minimums
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">
                      Pass ✓
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                    Group Tech and Group GenEd criteria fully met.
                  </p>
                </div>

                {/* Check 4 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1f1f1f]">
                      Missing Core Courses
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">
                      None ✓
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                    All required courses defined in original template included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
