"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Send,
  Save,
  Menu,
} from "lucide-react";
import {
  useCreateCurriculumMigration,
  useListCurriculumMigrations,
  useSubmitCurriculumMigration,
  useApproveCurriculumMigration,
  useRejectCurriculumMigration,
  usePreviewCurriculumMigration,
  useCurriculumMigration,
} from "@/hooks/use-curriculum-migrations";

interface CohortMigrationWizardProps {
  onCancel: () => void;
  onFinish: () => void;
  onOpenMobileMenu?: () => void;
}

export function CohortMigrationWizard({
  onCancel,
  onFinish,
  onOpenMobileMenu,
}: CohortMigrationWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCohorts, setSelectedCohorts] = useState<string[]>(["y3"]);
  const [justification, setJustification] = useState(
    "Updating core degree requirements in alignment with 2026 CS Curriculum syllabus revision.",
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sourceCurriculumId, setSourceCurriculumId] = useState("");
  const [targetCurriculumId, setTargetCurriculumId] = useState("");
  const [affectedStudentScope, setAffectedStudentScope] =
    useState('{"cohort":"y3"}');
  const [courseEquivalenceMapping, setCourseEquivalenceMapping] =
    useState("{}");
  const [creditTreatment, setCreditTreatment] = useState("{}");
  const [unmetRequirementHandling, setUnmetRequirementHandling] =
    useState("{}");
  const [effectiveAt, setEffectiveAt] = useState("2026-09-01T00:00:00Z");
  const [migrationError, setMigrationError] = useState<string | null>(null);
  const [previewMigrationId, setPreviewMigrationId] = useState<
    string | undefined
  >();
  const [detailMigrationId, setDetailMigrationId] = useState<
    string | undefined
  >();
  const createMigration = useCreateCurriculumMigration();
  const submitMigration = useSubmitCurriculumMigration();
  const approveMigration = useApproveCurriculumMigration();
  const rejectMigration = useRejectCurriculumMigration();
  const previewMigration = usePreviewCurriculumMigration(previewMigrationId);
  const migrationDetail = useCurriculumMigration(detailMigrationId);
  const migrationsQuery = useListCurriculumMigrations({
    limit: 200,
    offset: 0,
  });

  const toggleCohort = (id: string) => {
    if (selectedCohorts.includes(id)) {
      setSelectedCohorts(selectedCohorts.filter((c) => c !== id));
    } else {
      setSelectedCohorts([...selectedCohorts, id]);
    }
  };

  const handleSelectAllEligible = () => {
    setSelectedCohorts(["y3"]);
  };

  const goToStep = (step: number) => {
    if (step === 1 || step === 2 || step === 3 || step === 4) {
      setCurrentStep(step);
    }
  };

  const parseObject = (
    value: string,
    label: string,
  ): Record<string, unknown> | null => {
    try {
      const parsed: unknown = JSON.parse(value);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        setMigrationError(`${label} must be a JSON object.`);
        return null;
      }
      return parsed as Record<string, unknown>;
    } catch {
      setMigrationError(`${label} must contain valid JSON.`);
      return null;
    }
  };

  const handleSubmit = () => {
    setMigrationError(null);
    if (!sourceCurriculumId.trim() || !targetCurriculumId.trim()) {
      setMigrationError("Source and target curriculum UUIDs are required.");
      return;
    }

    const affectedScope = parseObject(
      affectedStudentScope,
      "Affected student scope",
    );
    const equivalence = parseObject(
      courseEquivalenceMapping,
      "Course equivalence mapping",
    );
    const credits = parseObject(creditTreatment, "Credit treatment");
    const unmet = parseObject(
      unmetRequirementHandling,
      "Unmet requirement handling",
    );
    if (!affectedScope || !equivalence || !credits || !unmet) return;

    createMigration.mutate(
      {
        source_curriculum_id: sourceCurriculumId.trim(),
        target_curriculum_id: targetCurriculumId.trim(),
        affected_student_scope: affectedScope,
        course_equivalence_mapping: equivalence,
        credit_treatment: credits,
        unmet_requirement_handling: unmet,
        effective_at: effectiveAt.trim() || null,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setTimeout(() => onFinish(), 1500);
        },
      },
    );
  };

  const steps = [
    { num: 1, label: "Select Cohorts" },
    { num: 2, label: "Map Changes" },
    { num: 3, label: "Review Impact" },
    { num: 4, label: "Submit" },
  ];

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Toast Notification on Submit */}
      {isSubmitted && (
        <div className="fixed top-4 right-4 z-50 bg-[#166534] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Migration case submitted for review successfully!</span>
        </div>
      )}
      {(migrationError || createMigration.isError) && (
        <div
          className="fixed top-4 right-4 z-50 mt-14 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {migrationError || createMigration.error?.message}
          {createMigration.error?.rawErrors?.map((error, index) => (
            <div key={`${error.type}-${index}`}>{error.msg}</div>
          ))}
        </div>
      )}
      {submitMigration.isError && (
        <div
          className="fixed top-4 right-4 z-50 mt-28 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {submitMigration.error.message}
          {submitMigration.error.rawErrors?.map((error, index) => (
            <div key={`submit-${error.type}-${index}`}>{error.msg}</div>
          ))}
        </div>
      )}
      {approveMigration.isError && (
        <div
          className="fixed top-4 right-4 z-50 mt-40 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {approveMigration.error.message}
          {approveMigration.error.rawErrors?.map((error, index) => (
            <div key={`approve-${error.type}-${index}`}>{error.msg}</div>
          ))}
        </div>
      )}
      {rejectMigration.isError && (
        <div
          className="fixed top-4 right-4 z-50 mt-52 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {rejectMigration.error.message}
          {rejectMigration.error.rawErrors?.map((error, index) => (
            <div key={`reject-${error.type}-${index}`}>{error.msg}</div>
          ))}
        </div>
      )}
      {previewMigration.isError && (
        <div
          className="fixed top-4 right-4 z-50 mt-64 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {previewMigration.error.message}
          {previewMigration.error.rawErrors?.map((error, index) => (
            <div key={`preview-${error.type}-${index}`}>{error.msg}</div>
          ))}
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
            <span>Curricula &amp; Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span>Cohort Migration</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span className="text-[#1f1f1f] font-semibold">New Case</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            {currentStep === 3
              ? "Review Impact Summary"
              : currentStep === 4
                ? "Cohort Curriculum Migration"
                : "New Migration Case"}
          </h1>
        </div>

        {/* Wizard Stepper Bar (Header for step 4 or general) */}
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div
                onClick={() => s.num < currentStep && goToStep(s.num)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                  currentStep === s.num
                    ? "bg-[#046aff] text-white"
                    : currentStep > s.num
                      ? "bg-[#eef4ff] text-[#046aff] cursor-pointer hover:bg-[#dbeafe]"
                      : "text-[#808080] bg-[#f5f5f5]"
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                  {currentStep > s.num ? "✓" : s.num}
                </span>
                <span>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="w-3 h-0.5 bg-[#e5e5e5]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* ========================================================================= */}
        {/* STEP 1: SELECT COHORTS                                                    */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-12 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Migration Cases
                  </h3>
                  <p className="text-[12px] text-[#808080] mt-1">
                    {migrationsQuery.data
                      ? `${migrationsQuery.data.data.total} case${migrationsQuery.data.data.total === 1 ? "" : "s"} loaded`
                      : "Loading migration cases..."}
                  </p>
                </div>
                {migrationsQuery.isFetching && (
                  <span className="text-[11px] text-[#808080]">
                    Refreshing...
                  </span>
                )}
              </div>

              {migrationsQuery.isError && (
                <div
                  role="alert"
                  className="rounded-[8px] border border-[#F69999] bg-[#FEF0F0] px-3 py-2 text-[12px] text-[#B91C1C]"
                >
                  {migrationsQuery.error.message}
                  {migrationsQuery.error.rawErrors?.map((error, index) => (
                    <div key={`${error.type}-${index}`}>{error.msg}</div>
                  ))}
                </div>
              )}

              {!migrationsQuery.isLoading &&
                !migrationsQuery.isError &&
                migrationsQuery.data?.data.items.length === 0 && (
                  <p className="text-[12px] text-[#808080]">
                    No migration cases found.
                  </p>
                )}

              {migrationsQuery.data &&
                migrationsQuery.data.data.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {migrationsQuery.data.data.items.map((migration) => (
                      <div
                        key={migration.id}
                        className="rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] px-3 py-2 text-[12px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#1f1f1f]">
                            {migration.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[#808080]">
                              Row version {migration.row_version}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewMigrationId(migration.id)
                              }
                              className="rounded-[6px] border border-[#d2e4ff] bg-white px-2 py-1 text-[11px] font-semibold text-[#046aff] hover:bg-[#f0f8ff]"
                            >
                              Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => setDetailMigrationId(migration.id)}
                              className="rounded-[6px] border border-[#e5e5e5] bg-white px-2 py-1 text-[11px] font-semibold text-[#5c5c5c] hover:bg-[#f5f5f5]"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                submitMigration.mutate({
                                  migrationId: migration.id,
                                  payload: {
                                    row_version: migration.row_version,
                                    reason: justification.trim() || null,
                                  },
                                })
                              }
                              disabled={submitMigration.isPending}
                              className="rounded-[6px] bg-[#046aff] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#0356d6] disabled:opacity-50"
                            >
                              {submitMigration.isPending
                                ? "Submitting..."
                                : "Submit"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                rejectMigration.mutate({
                                  migrationId: migration.id,
                                  payload: {
                                    row_version: migration.row_version,
                                    reason: justification.trim() || null,
                                  },
                                })
                              }
                              disabled={rejectMigration.isPending}
                              className="rounded-[6px] border border-[#fecaca] bg-white px-2 py-1 text-[11px] font-semibold text-[#b91c1c] hover:bg-[#fef2f2] disabled:opacity-50"
                            >
                              {rejectMigration.isPending
                                ? "Rejecting..."
                                : "Reject"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                approveMigration.mutate({
                                  migrationId: migration.id,
                                  payload: {
                                    row_version: migration.row_version,
                                    reason: justification.trim() || null,
                                  },
                                })
                              }
                              disabled={approveMigration.isPending}
                              className="rounded-[6px] bg-[#166534] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#14532d] disabled:opacity-50"
                            >
                              {approveMigration.isPending
                                ? "Approving..."
                                : "Approve"}
                            </button>
                          </div>
                        </div>
                        <div className="mt-1 text-[#5c5c5c] break-all">
                          Source: {migration.source_curriculum_id}
                        </div>
                        <div className="text-[#5c5c5c] break-all">
                          Target: {migration.target_curriculum_id}
                        </div>
                        {migration.effective_at && (
                          <div className="text-[#808080] mt-1">
                            Effective: {migration.effective_at}
                          </div>
                        )}
                        {previewMigrationId === migration.id &&
                          previewMigration.isFetching && (
                            <div className="mt-2 text-[#808080]">
                              Loading preview...
                            </div>
                          )}
                        {previewMigrationId === migration.id &&
                          previewMigration.data && (
                            <div className="mt-2 rounded-[6px] border border-[#d2e4ff] bg-[#f0f8ff] p-2 text-[#334155]">
                              <div className="font-semibold">
                                Affected student scope
                              </div>
                              <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap font-mono text-[11px]">
                                {JSON.stringify(
                                  previewMigration.data.data
                                    .affected_student_scope,
                                  null,
                                  2,
                                )}
                              </pre>
                              <div className="mt-1 text-[#5c5c5c]">
                                {previewMigration.data.data.note}
                              </div>
                            </div>
                          )}
                        {detailMigrationId === migration.id &&
                          migrationDetail.isFetching && (
                            <div className="mt-2 text-[#808080]">
                              Loading details...
                            </div>
                          )}
                        {detailMigrationId === migration.id &&
                          migrationDetail.data && (
                            <div className="mt-2 rounded-[6px] border border-[#e5e5e5] bg-white p-2 text-[#334155]">
                              <div className="font-semibold">
                                Migration details
                              </div>
                              <div className="mt-1">
                                Status: {migrationDetail.data.data.status}
                              </div>
                              <div>
                                Reason:{" "}
                                {migrationDetail.data.data.reason || "None"}
                              </div>
                              <div>
                                Row version:{" "}
                                {migrationDetail.data.data.row_version}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Curriculum Setup Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Source Curriculum
                  </span>
                  <span className="text-[16px] font-bold text-[#1f1f1f]">
                    BSc Computer Science v2.0
                  </span>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                      Published
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Target Curriculum
                  </span>
                  <span className="text-[16px] font-bold text-[#1f1f1f]">
                    BSc Computer Science v3.0
                  </span>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef4ff] text-[#046aff] border border-[#d2e4ff]">
                      Draft / Approved
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Source Curriculum ID (UUID)
                  <input
                    value={sourceCurriculumId}
                    onChange={(event) =>
                      setSourceCurriculumId(event.target.value)
                    }
                    placeholder="Source curriculum UUID"
                    className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Target Curriculum ID (UUID)
                  <input
                    value={targetCurriculumId}
                    onChange={(event) =>
                      setTargetCurriculumId(event.target.value)
                    }
                    placeholder="Target curriculum UUID"
                    className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
              </div>

              {/* Cohort Selection Card */}
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f5f5f5]">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                      Cohort Selection
                    </h3>
                    <p className="text-[12px] text-[#808080]">
                      Identify the student cohorts to schedule for mapping
                      migration
                    </p>
                  </div>
                  <button
                    onClick={handleSelectAllEligible}
                    className="px-3 py-1.5 bg-[#f0f8ff] hover:bg-[#e0f0fe] text-[#046aff] rounded-[8px] text-xs font-semibold transition-colors cursor-pointer self-start sm:self-center"
                  >
                    Select All Eligible
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[580px]">
                    <thead>
                      <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                        <th className="py-2.5 px-3 w-8"></th>
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-3">Programme</th>
                        <th className="py-2.5 px-3">Students</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                      <tr
                        onClick={() => toggleCohort("y3")}
                        className="hover:bg-[#fafafa] transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={selectedCohorts.includes("y3")}
                            onChange={() => {}}
                            className="rounded border-[#d9d9d9] text-[#046aff] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          Year 3
                        </td>
                        <td className="py-3 px-3 text-[#1f1f1f] font-medium">
                          BSc Computer Science (CSC)
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          142
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#dcfce7] text-[#15803d]">
                            Eligible
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-[#fafafa] transition-colors opacity-70">
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            disabled
                            checked={false}
                            className="rounded border-[#d9d9d9] text-[#046aff] focus:ring-0"
                          />
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          Year 4
                        </td>
                        <td className="py-3 px-3 text-[#1f1f1f] font-medium">
                          BSc Computer Science (CSC)
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#1f1f1f]">
                          110
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f5f5f5] text-[#808080]">
                            Ineligible (Graduating)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Side Impact Summary Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                  Selection Summary
                </h3>

                <div className="bg-[#f0f8ff] border border-[#d2e4ff] rounded-[12px] p-4 flex flex-col gap-1">
                  <span className="text-[20px] font-bold text-[#046aff]">
                    {selectedCohorts.length} Cohort Selected
                  </span>
                  <span className="text-[13px] font-medium text-[#5c5c5c]">
                    142 active students mapped
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
                  <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Programme Breakdown
                  </span>
                  <div className="flex items-center justify-between text-[13px] font-medium">
                    <span className="text-[#1f1f1f]">BSc Computer Science</span>
                    <span className="font-semibold text-[#046aff]">
                      142 Students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: MAP CHANGES                                                       */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
                <div>
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Equivalence Mapping
                  </h3>
                  <p className="text-[12px] text-[#808080]">
                    Define course equivalencies between Version 2.0 and Version
                    3.0
                  </p>
                </div>

                {/* Card 1 */}
                <div className="border border-[#e5e5e5] rounded-[14px] p-4 bg-[#fafafa] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[13px] font-bold text-[#1f1f1f]">
                    <span>Original: MTH 302 — Numerical Analysis</span>
                    <ArrowRight className="w-4 h-4 text-[#808080]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Equivalent Course
                      </label>
                      <input
                        type="text"
                        defaultValue="CSC 310 — Distributed Systems"
                        className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Credit Mapping
                      </label>
                      <input
                        type="text"
                        defaultValue="4 to 4 Credits"
                        className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="border border-[#e5e5e5] rounded-[14px] p-4 bg-[#fafafa] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[13px] font-bold text-[#1f1f1f]">
                    <span>Original: CSC 301 — Software Engineering (3 Cr)</span>
                    <ArrowRight className="w-4 h-4 text-[#808080]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Equivalent Course
                      </label>
                      <input
                        type="text"
                        defaultValue="CSC 301 — Software Engineering (4 Cr)"
                        className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Credit Mapping
                      </label>
                      <input
                        type="text"
                        defaultValue="3 to 4 Credits"
                        className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Impact Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                  Affected Cohort
                </h3>

                <div className="bg-[#f0f8ff] border border-[#d2e4ff] rounded-[12px] p-4 flex flex-col gap-1">
                  <span className="text-[20px] font-bold text-[#046aff]">
                    142 Students
                  </span>
                  <span className="text-[13px] font-medium text-[#5c5c5c]">
                    BSc Computer Science — Year 3
                  </span>
                </div>

                <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[12px] p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400e]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Alerts &amp; Warnings</span>
                  </div>
                  <p className="text-[12px] text-[#92400e] leading-relaxed">
                    1 course mapping results in a credit difference of +1
                    Credit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: REVIEW IMPACT                                                     */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-6">
            {/* Metrics Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Total Students
                </span>
                <span className="text-[22px] font-bold text-[#1f1f1f]">
                  142
                </span>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Programmes Affected
                </span>
                <span className="text-[22px] font-bold text-[#1f1f1f]">1</span>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Course Mappings
                </span>
                <span className="text-[22px] font-bold text-[#1f1f1f]">
                  8 Active
                </span>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Credit Difference
                </span>
                <span className="text-[22px] font-bold text-[#16a34a]">
                  +1 Credit
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Course-by-Course Impact */}
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                      Course-by-Course Equivalence
                    </h3>
                    <p className="text-[12px] text-[#808080]">
                      Mapped pathways for academic syllabus equivalence
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[580px]">
                      <thead>
                        <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                          <th className="py-2.5 px-3">Original Course</th>
                          <th className="py-2.5 px-3">New Mapped Course</th>
                          <th className="py-2.5 px-3">Credit Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                        <tr className="hover:bg-[#fafafa]">
                          <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                            MTH 302 — Numerical Analysis (4 Cr)
                          </td>
                          <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                            CSC 310 — Distributed Systems (4 Cr)
                          </td>
                          <td className="py-3 px-3 text-[#5c5c5c] font-semibold">
                            0 (Neutral)
                          </td>
                        </tr>
                        <tr className="hover:bg-[#fafafa]">
                          <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                            CSC 301 — Software Engineering (3 Cr)
                          </td>
                          <td className="py-3 px-3 font-medium text-[#1f1f1f]">
                            CSC 301 — Software Engineering (4 Cr)
                          </td>
                          <td className="py-3 px-3 text-[#16a34a] font-semibold">
                            +1 Credit
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Unmapped Courses */}
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                        Unmapped Source Courses
                      </h3>
                      <p className="text-[12px] text-[#808080]">
                        Syllabus segments lacking direct equivalents in the
                        destination version
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#fee2e2] text-[#b91c1c]">
                      Action Needed
                    </span>
                  </div>
                  <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-[10px] text-[13px] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#991b1b]">
                    <span className="font-semibold">
                      MTH 399 — Mathematical Special Projects (2 Cr)
                    </span>
                    <span className="text-xs">
                      No match: Will be converted to elective credit
                    </span>
                  </div>
                </div>

                {/* Student Exclusions */}
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-2">
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Student Exclusions
                  </h3>
                  <p className="text-[12px] text-[#808080] mb-2">
                    Individual cases isolated from this bulk process batch
                  </p>
                  <p className="text-[13px] text-[#5c5c5c] font-medium leading-relaxed">
                    • 3 students on formal academic probation will require
                    manual program mapping.
                  </p>
                </div>

                {/* Timeline Setup */}
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-3">
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Transition &amp; Effective Dates
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Effective Date
                      </span>
                      <span className="text-[13px] font-semibold text-[#1f1f1f] bg-[#fafafa] border border-[#e5e5e5] p-2.5 rounded-[8px]">
                        September 1, 2026 (Semester 1 Start)
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                        Transition Framework
                      </span>
                      <span className="text-[13px] font-semibold text-[#1f1f1f] bg-[#fafafa] border border-[#e5e5e5] p-2.5 rounded-[8px]">
                        Coexistence period enabled for late-completers
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Diagnostics Column */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                  <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                    Diagnostics &amp; Alerts
                  </h3>

                  <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-[12px] p-3.5 flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-[#be123c]">
                      2 Unmapped Courses
                    </span>
                    <p className="text-[12px] text-[#be123c] leading-relaxed">
                      These courses will register as elective exceptions unless
                      manually mapped.
                    </p>
                  </div>

                  <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[12px] p-3.5 flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-[#b45309]">
                      Credit Discrepancy Found
                    </span>
                    <p className="text-[12px] text-[#b45309] leading-relaxed">
                      Software Engineering transition increases required credits
                      by +1 for 142 students.
                    </p>
                  </div>

                  <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[12px] p-3.5 flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-[#15803d]">
                      Clean Passing Maps
                    </span>
                    <p className="text-[12px] text-[#15803d] leading-relaxed">
                      6 pathways mapped successfully with 0 credit changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: SUBMIT & REVIEW                                                   */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Summary Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Migration Case Card */}
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  Migration Case Summary
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Source Version
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      v2.0 Computer Science Curriculum
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Target Version
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      v3.0 Updated Computer Science
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Affected Cohorts
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      2027 Intake, 2026 Year 2+
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Total Students
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      142 Registered
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Course Mappings
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      8 Explicit Path Rules
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                      Exclusions
                    </span>
                    <span className="text-[13px] font-semibold text-[#1f1f1f]">
                      2 Exclusions (Unmapped)
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Course Mappings Table */}
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#f5f5f5]">
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Verified Course Mappings (8)
                  </h3>
                  <span className="text-xs text-[#808080] font-medium">
                    Read-only review
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Original Course (v2.0)</th>
                        <th className="py-2.5 px-3">
                          New Mapped Course (v3.0)
                        </th>
                        <th className="py-2.5 px-3">Credit Diff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f5f5] text-[12px]">
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-[#1f1f1f]">
                          CSC 201: Discrete Math (4cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#5c5c5c]">
                          CSC 205: Discrete Structures (4cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#16a34a] font-semibold">
                          0 (Equal)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-[#1f1f1f]">
                          CSC 202: Data Structures (4cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#5c5c5c]">
                          CSC 210: Alg &amp; Data Struct I (3cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#b45309] font-semibold">
                          -1 credit
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-[#1f1f1f]">
                          CSC 301: Systems Programming (3cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#5c5c5c]">
                          CSC 305: Intro to Systems (3cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#16a34a] font-semibold">
                          0 (Equal)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-[#1f1f1f]">
                          MTH 111: Calculus I (4cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#5c5c5c]">
                          MTH 115: Mathematical Analysis I (4cr)
                        </td>
                        <td className="py-2.5 px-3 text-[#16a34a] font-semibold">
                          0 (Equal)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Validation Checklist */}
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                  Pre-submission Validation
                </h3>

                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1f1f1f]">
                        All courses mapped correctly
                      </span>
                      <span className="text-[12px] text-[#808080]">
                        No critical orphans left unmapped.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1f1f1f]">
                        Credit requirements verified
                      </span>
                      <span className="text-[12px] text-[#808080]">
                        Total core credits meet degree rules.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1f1f1f]">
                        Target cohorts eligible
                      </span>
                      <span className="text-[12px] text-[#808080]">
                        Identified intake cohorts are in transition state.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Form */}
              <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                  Submission Details
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#1f1f1f]">
                    Change Justification *
                  </label>
                  <textarea
                    rows={3}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Describe the rationale for this cohort curriculum migration for auditing purposes..."
                    className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] p-3 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                  />
                </div>

                <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[10px] p-3 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#1e40af] leading-relaxed">
                    SIS will apply approved changes to individual student
                    records automatically upon publication.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Affected Student Scope (JSON)
                    <textarea
                      rows={3}
                      value={affectedStudentScope}
                      onChange={(event) =>
                        setAffectedStudentScope(event.target.value)
                      }
                      className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 font-mono text-[12px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Course Equivalence Mapping (JSON)
                    <textarea
                      rows={3}
                      value={courseEquivalenceMapping}
                      onChange={(event) =>
                        setCourseEquivalenceMapping(event.target.value)
                      }
                      className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 font-mono text-[12px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Credit Treatment (JSON)
                    <textarea
                      rows={3}
                      value={creditTreatment}
                      onChange={(event) =>
                        setCreditTreatment(event.target.value)
                      }
                      className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 font-mono text-[12px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                    Unmet Requirement Handling (JSON)
                    <textarea
                      rows={3}
                      value={unmetRequirementHandling}
                      onChange={(event) =>
                        setUnmetRequirementHandling(event.target.value)
                      }
                      className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 font-mono text-[12px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Effective At
                  <input
                    type="datetime-local"
                    value={effectiveAt.slice(0, 16)}
                    onChange={(event) =>
                      setEffectiveAt(
                        event.target.value ? `${event.target.value}:00Z` : "",
                      )
                    }
                    className="rounded-[8px] border border-[#d9d9d9] px-3 py-2 text-[13px] font-normal normal-case tracking-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-2.5 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={createMigration.isPending}
                    className="flex-1 py-2.5 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {createMigration.isPending
                        ? "Submitting..."
                        : "Submit for Review"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Navigation Action Bar (Steps 1, 2, 3) */}
        {currentStep < 4 && (
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 shadow-xs flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => {
                if (currentStep === 1) onCancel();
                else goToStep(currentStep - 1);
              }}
              className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            {currentStep > 1 && (
              <button
                onClick={() => alert("Progress saved successfully")}
                className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5 text-[#5c5c5c]" />
                <span>Save Progress</span>
              </button>
            )}
            <button
              onClick={() => goToStep(currentStep + 1)}
              className="px-5 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
