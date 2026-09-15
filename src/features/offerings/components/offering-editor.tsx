"use client";

import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import {
  useCancelCourseOffering,
  useCloseCourseOfferingRegistration,
  useCourseOffering,
  useCreateCourseOffering,
  useOpenCourseOfferingRegistration,
  useSubmitCourseOffering,
  useUpdateCourseOffering,
} from "@/hooks/use-course-offerings";

interface OfferingEditorProps {
  sectionCode?: string;
  offeringId?: string;
  rowVersion?: number;
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
  sectionCode = "CSC 301-A",
  offeringId,
  rowVersion = 1,
  leadInstructor = {
    name: "Dr. Charles Ononiwu",
    department: "Dept. of Computer Science",
    workload: "Current workload: 2/3 Courses",
  },
  onCancel,
  onSave,
  onChangeStaff,
  onDeleteOffering,
  onOpenMobileMenu,
}: OfferingEditorProps) {
  const [courseCode, setCourseCode] = useState(
    "CSC 301 (2026/2027 v2) — Software Engineering I",
  );
  const [sessionPeriod, setSessionPeriod] = useState(
    "2026/2027 Session — Semester 1",
  );
  const [programmeContext, setProgrammeContext] = useState(
    "BSc Computer Science — Year 3",
  );
  const [deliveryMode, setDeliveryMode] = useState<
    "In-person" | "Online" | "Hybrid"
  >("In-person");
  const [targetCapacity, setTargetCapacity] = useState("100");
  const [courseId, setCourseId] = useState("");
  const [academicSessionId, setAcademicSessionId] = useState("");
  const [academicPeriodId, setAcademicPeriodId] = useState("");
  const [eligibleCurriculumIds, setEligibleCurriculumIds] = useState("[]");
  const [eligibleProgrammeIds, setEligibleProgrammeIds] = useState("[]");
  const [registrationAvailability, setRegistrationAvailability] =
    useState("open");
  const [formError, setFormError] = useState<string | null>(null);
  const [currentOfferingId, setCurrentOfferingId] = useState(offeringId);
  const [currentRowVersion, setCurrentRowVersion] = useState(rowVersion ?? 1);
  const [toastMessage, setToastMessage] = useState(
    "Course offering changes saved successfully!",
  );
  const createOffering = useCreateCourseOffering();
  const updateOffering = useUpdateCourseOffering();
  const submitOffering = useSubmitCourseOffering();
  const openRegistration = useOpenCourseOfferingRegistration();
  const closeRegistration = useCloseCourseOfferingRegistration();
  const cancelOffering = useCancelCourseOffering();
  const offeringQuery = useCourseOffering(currentOfferingId);

  const [tutors, setTutors] = useState([
    { id: "tut-1", name: "Dr. Ada Lovelace", role: "Assigned as Tutor" },
  ]);

  const [isSavedToast, setIsSavedToast] = useState(false);

  useEffect(() => {
    setCurrentOfferingId(offeringId);
    setCurrentRowVersion(rowVersion);
  }, [offeringId, rowVersion]);

  useEffect(() => {
    const offering = offeringQuery.data?.data;
    if (!offering) return;
    setCourseId(offering.course_id);
    setAcademicSessionId(offering.academic_session_id);
    setAcademicPeriodId(offering.academic_period_id || "");
    setTargetCapacity(String(offering.capacity));
    setCurrentRowVersion(offering.row_version);
    setDeliveryMode(
      offering.delivery_mode === "Online" || offering.delivery_mode === "Hybrid"
        ? offering.delivery_mode
        : "In-person",
    );
    setRegistrationAvailability(offering.registration_availability || "");
    setEligibleCurriculumIds(JSON.stringify(offering.eligible_curriculum_ids));
    setEligibleProgrammeIds(JSON.stringify(offering.eligible_programme_ids));
  }, [offeringQuery.data]);

  const parseIdArray = (value: string, label: string): string[] | null => {
    try {
      const parsed: unknown = JSON.parse(value);
      if (
        !Array.isArray(parsed) ||
        parsed.some((item) => typeof item !== "string")
      ) {
        setFormError(`${label} must be a JSON array of UUID strings.`);
        return null;
      }
      return parsed;
    } catch {
      setFormError(`${label} must contain valid JSON.`);
      return null;
    }
  };

  const handleSave = () => {
    setFormError(null);
    const capacity = Number(targetCapacity);
    const curriculumIds = parseIdArray(
      eligibleCurriculumIds,
      "Eligible curriculum IDs",
    );
    const programmeIds = parseIdArray(
      eligibleProgrammeIds,
      "Eligible programme IDs",
    );

    if (!courseId.trim() || !academicSessionId.trim()) {
      setFormError("Course ID and academic session ID are required.");
      return;
    }
    if (!Number.isInteger(capacity) || capacity <= 0) {
      setFormError("Capacity must be a positive integer.");
      return;
    }
    if (!curriculumIds || !programmeIds) return;

    const payload = {
      course_id: courseId.trim(),
      academic_session_id: academicSessionId.trim(),
      academic_period_id: academicPeriodId.trim() || null,
      section_label: sectionCode.trim(),
      capacity,
      eligible_curriculum_ids: curriculumIds,
      eligible_programme_ids: programmeIds,
      delivery_mode: deliveryMode,
      registration_availability: registrationAvailability.trim() || null,
    };

    const showSuccess = (message: string, leave = true) => {
      setToastMessage(message);
      setIsSavedToast(true);
      setTimeout(() => {
        setIsSavedToast(false);
        if (leave) onSave();
      }, 1200);
    };

    if (currentOfferingId) {
      updateOffering.mutate(
        {
          offeringId: currentOfferingId,
          payload: {
            row_version: currentRowVersion,
            capacity,
            delivery_mode: deliveryMode,
            registration_availability: registrationAvailability.trim() || null,
          },
        },
        {
          onSuccess: (response) => {
            setCurrentRowVersion(response.data.row_version);
            showSuccess(
              response.message || "Course offering changes saved successfully!",
            );
          },
        },
      );
      return;
    }

    createOffering.mutate(payload, {
      onSuccess: (response) => {
        setCurrentOfferingId(response.data.id);
        setCurrentRowVersion(response.data.row_version);
        showSuccess(
          response.message || "Course offering created successfully!",
        );
      },
    });
  };

  const requireSavedOffering = () => {
    if (!currentOfferingId) {
      setFormError("Save the course offering before this action.");
      return false;
    }
    return true;
  };

  const handleSubmitOffering = () => {
    setFormError(null);
    if (!requireSavedOffering()) return;
    submitOffering.mutate(
      {
        offeringId: currentOfferingId!,
        payload: { row_version: currentRowVersion },
      },
      {
        onSuccess: (response) => {
          setCurrentRowVersion(response.data.row_version);
          setToastMessage(
            response.message || "Course offering submitted for review.",
          );
          setIsSavedToast(true);
          setTimeout(() => {
            setIsSavedToast(false);
            onSave();
          }, 1200);
        },
      },
    );
  };

  const handleToggleRegistration = () => {
    setFormError(null);
    if (!requireSavedOffering()) return;
    const isOpen = registrationAvailability.toLowerCase().includes("open");
    const mutation = isOpen ? closeRegistration : openRegistration;
    mutation.mutate(
      {
        offeringId: currentOfferingId!,
        payload: { row_version: currentRowVersion },
      },
      {
        onSuccess: (response) => {
          setCurrentRowVersion(response.data.row_version);
          setRegistrationAvailability(
            response.data.registration_availability || (isOpen ? "closed" : "open"),
          );
          setToastMessage(
            response.message ||
              (isOpen
                ? "Registration closed for this offering."
                : "Registration opened for this offering."),
          );
          setIsSavedToast(true);
          setTimeout(() => setIsSavedToast(false), 1200);
        },
      },
    );
  };

  const handleCancelOffering = () => {
    setFormError(null);
    if (!requireSavedOffering()) return;
    cancelOffering.mutate(
      {
        offeringId: currentOfferingId!,
        payload: { row_version: currentRowVersion },
      },
      {
        onSuccess: (response) => {
          setToastMessage(
            response.message || "Course offering cancelled successfully.",
          );
          setIsSavedToast(true);
          setTimeout(() => {
            setIsSavedToast(false);
            onSave();
          }, 1200);
        },
      },
    );
  };

  const removeTutor = (id: string) => {
    setTutors(tutors.filter((t) => t.id !== id));
  };

  const isBusy =
    createOffering.isPending ||
    updateOffering.isPending ||
    submitOffering.isPending ||
    openRegistration.isPending ||
    closeRegistration.isPending ||
    cancelOffering.isPending;
  const isRegistrationOpen = registrationAvailability
    .toLowerCase()
    .includes("open");

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#166534] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
      {(formError ||
        offeringQuery.isError ||
        createOffering.isError ||
        updateOffering.isError ||
        submitOffering.isError ||
        openRegistration.isError ||
        closeRegistration.isError ||
        cancelOffering.isError) && (
        <div
          className="fixed top-4 right-4 z-50 mt-14 max-w-[min(90vw,520px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {formError ||
            offeringQuery.error?.message ||
            createOffering.error?.message ||
            updateOffering.error?.message ||
            submitOffering.error?.message ||
            openRegistration.error?.message ||
            closeRegistration.error?.message ||
            cancelOffering.error?.message}
          {createOffering.error?.rawErrors?.map((error, index) => (
            <div key={`${error.type}-${index}`}>{error.msg}</div>
          ))}
          {updateOffering.error?.rawErrors?.map((error, index) => (
            <div key={`update-${error.type}-${index}`}>{error.msg}</div>
          ))}
          {submitOffering.error?.rawErrors?.map((error, index) => (
            <div key={`submit-${error.type}-${index}`}>{error.msg}</div>
          ))}
          {openRegistration.error?.rawErrors?.map((error, index) => (
            <div key={`open-${error.type}-${index}`}>{error.msg}</div>
          ))}
          {closeRegistration.error?.rawErrors?.map((error, index) => (
            <div key={`close-${error.type}-${index}`}>{error.msg}</div>
          ))}
          {cancelOffering.error?.rawErrors?.map((error, index) => (
            <div key={`cancel-${error.type}-${index}`}>{error.msg}</div>
          ))}
          {offeringQuery.error?.rawErrors?.map((error, index) => (
            <div key={`detail-${error.type}-${index}`}>{error.msg}</div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f]">
                  Course ID (UUID)
                  <input
                    value={courseId}
                    onChange={(event) => setCourseId(event.target.value)}
                    placeholder="Course UUID"
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 text-[13px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f]">
                  Academic Session ID (UUID)
                  <input
                    value={academicSessionId}
                    onChange={(event) =>
                      setAcademicSessionId(event.target.value)
                    }
                    placeholder="Session UUID"
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 text-[13px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f]">
                  Academic Period ID (optional UUID)
                  <input
                    value={academicPeriodId}
                    onChange={(event) =>
                      setAcademicPeriodId(event.target.value)
                    }
                    placeholder="Period UUID"
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 text-[13px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f]">
                  Registration Availability
                  <input
                    value={registrationAvailability}
                    onChange={(event) =>
                      setRegistrationAvailability(event.target.value)
                    }
                    maxLength={50}
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 text-[13px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f] sm:col-span-2">
                  Eligible Curriculum IDs (JSON array)
                  <textarea
                    rows={2}
                    value={eligibleCurriculumIds}
                    onChange={(event) =>
                      setEligibleCurriculumIds(event.target.value)
                    }
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 font-mono text-[12px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#1f1f1f] sm:col-span-2">
                  Eligible Programme IDs (JSON array)
                  <textarea
                    rows={2}
                    value={eligibleProgrammeIds}
                    onChange={(event) =>
                      setEligibleProgrammeIds(event.target.value)
                    }
                    className="rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 font-mono text-[12px] font-normal text-[#1f1f1f] focus:border-[#046aff] focus:outline-none"
                  />
                </label>
              </div>

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
                      onClick={() => setCourseCode("")}
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
                    {(["In-person", "Online", "Hybrid"] as const).map(
                      (mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDeliveryMode(mode)}
                          className={`flex-1 py-2 px-2.5 rounded-[8px] text-xs font-semibold border transition-colors cursor-pointer text-center ${
                            deliveryMode === mode
                              ? "bg-[#046aff] text-white border-[#046aff]"
                              : "bg-white text-[#1f1f1f] border-[#d9d9d9] hover:bg-[#fafafa]"
                          }`}
                        >
                          {mode}
                        </button>
                      ),
                    )}
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
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
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
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span className="font-semibold text-[#1f1f1f]">
                        {t.name}
                      </span>
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
                  <span>
                    Requires Computer Laboratory (min 100 workstations)
                  </span>
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
                      CSC 301 is a prerequisite of CSC 305. Avoid scheduling
                      both at the same hour.
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
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2">
          <button
            onClick={handleCancelOffering}
            disabled={isBusy || !currentOfferingId}
            className="px-4 py-2 border border-[#fecaca] bg-[#fff5f5] hover:bg-[#fee2e2] text-[#dc2626] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelOffering.isPending ? "Cancelling..." : "Cancel Offering"}
          </button>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleToggleRegistration}
              disabled={isBusy || !currentOfferingId}
              className="px-4 py-2 border border-[#046aff] bg-white hover:bg-[#f0f8ff] text-[#046aff] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {openRegistration.isPending || closeRegistration.isPending
                ? "Updating registration..."
                : isRegistrationOpen
                  ? "Close Registration"
                  : "Open Registration"}
            </button>
            <button
              onClick={handleSubmitOffering}
              disabled={isBusy || !currentOfferingId}
              className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitOffering.isPending ? "Submitting..." : "Submit for Review"}
            </button>
            <button
              onClick={handleSave}
              disabled={isBusy}
              className="px-5 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {createOffering.isPending || updateOffering.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
