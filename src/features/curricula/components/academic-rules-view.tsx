"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Plus,
  ArrowLeft,
  Save,
  CheckCircle2,
  Trash2,
  Layers,
  Sparkles,
  Menu,
} from "lucide-react";
import {
  useCreateAcademicRule,
  useAcademicRule,
  useSubmitAcademicRule,
  useListAcademicRules,
} from "@/hooks/use-academic-rules";

interface AcademicRulesViewProps {
  onBackToCurricula: () => void;
  onOpenMobileMenu?: () => void;
}

export function AcademicRulesView({
  onBackToCurricula,
  onOpenMobileMenu,
}: AcademicRulesViewProps) {
  const [activeCategory, setActiveCategory] = useState("Prerequisites");
  const [field1, setField1] = useState("student.standing");
  const [operator1, setOperator1] = useState(">=");
  const [value1, setValue1] = useState("'Year 2'");

  const [field2, setField2] = useState("course.credits");
  const [operator2, setOperator2] = useState("<=");
  const [value2, setValue2] = useState("18");

  const [thenAction, setThenAction] = useState("allow_registration");
  const [explanation, setExplanation] = useState(
    "Sophomores must stay within 18 credits during this registration window.",
  );
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [scope, setScope] = useState("curriculum");
  const [scopeRefId, setScopeRefId] = useState("");
  const [targetCourseId, setTargetCourseId] = useState("");
  const [selectedRuleId, setSelectedRuleId] = useState<string | undefined>();
  const [ruleError, setRuleError] = useState<string | null>(null);
  const createRule = useCreateAcademicRule();
  const submitRule = useSubmitAcademicRule();
  const rulesQuery = useListAcademicRules({ limit: 200, offset: 0 });
  const ruleDetailQuery = useAcademicRule(selectedRuleId);

  const ruleItems = rulesQuery.data?.data.items ?? [];
  const categories = [
    "Prerequisites",
    "Co-requisites",
    "Standing Requirements",
    "Credit/Load Limits",
  ].map((name) => ({
    name,
    count: ruleItems.filter((rule) => rule.rule_type === name).length,
  }));

  const handleSaveRule = () => {
    setRuleError(null);

    if (!scopeRefId.trim()) {
      setRuleError("Scope reference ID is required.");
      return;
    }

    createRule.mutate(
      {
        scope: scope.trim(),
        scope_ref_id: scopeRefId.trim(),
        rule_type: activeCategory,
        target_course_id: targetCourseId.trim() || null,
        rule_definition: {
          conditions: [
            { field: field1, operator: operator1, value: value1 },
            { field: field2, operator: operator2, value: value2 },
          ],
          action: thenAction,
          explanation,
        },
      },
      {
        onSuccess: () => {
          setIsSavedToast(true);
          setTimeout(() => setIsSavedToast(false), 3000);
        },
      },
    );
  };

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#166534] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Rule saved successfully!</span>
        </div>
      )}
      {(ruleError || createRule.isError || submitRule.isError) && (
        <div
          className="fixed top-4 right-4 z-50 mt-14 max-w-[min(90vw,480px)] rounded-xl border border-[#F69999] bg-[#FEF0F0] px-4 py-3 text-xs font-semibold text-[#B91C1C] shadow-lg"
          role="alert"
        >
          {ruleError || createRule.error?.message || submitRule.error?.message}
          {createRule.error?.rawErrors?.map((error, index) => (
            <div key={`${error.type}-${index}`}>{error.msg}</div>
          ))}
          {submitRule.error?.rawErrors?.map((error, index) => (
            <div key={`submit-${error.type}-${index}`}>{error.msg}</div>
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
            <span>Academic Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3]" />
            <span className="text-[#1f1f1f] font-semibold">
              Registration Rules
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Registration Rules
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCurricula}
            className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#5c5c5c]" />
            <span>Back to Curricula</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 sm:px-8 bg-white border-b border-[#ebebeb] flex items-center gap-8">
        <button
          onClick={onBackToCurricula}
          className="py-3 text-[14px] font-medium text-[#5c5c5c] hover:text-[#1f1f1f] transition-colors cursor-pointer"
        >
          Curricula
        </button>
        <button className="py-3 text-[14px] font-semibold text-[#046aff] border-b-2 border-[#046aff] relative -mb-[1px]">
          Academic Rules
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Categories Card */}
          <div className="lg:col-span-4 bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-[#1f1f1f]">
              Rule Categories
            </h3>

            <div className="flex flex-col gap-1.5">
              {categories.map((c) => {
                const isActive = activeCategory === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActiveCategory(c.name)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-[10px] text-[13px] transition-colors cursor-pointer text-left ${
                      isActive
                        ? "bg-[#f0f8ff] text-[#046aff] font-semibold border border-[#d2e4ff]"
                        : "text-[#1f1f1f] font-medium hover:bg-[#fafafa] border border-transparent"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#046aff] text-white font-bold"
                          : "bg-[#f5f5f5] text-[#808080]"
                      }`}
                    >
                      {c.count} rules
                    </span>
                  </button>
                );
              })}
            </div>

            {rulesQuery.isError && (
              <div
                role="alert"
                className="rounded-[8px] border border-[#F69999] bg-[#FEF0F0] px-3 py-2 text-[12px] text-[#B91C1C]"
              >
                {rulesQuery.error.message}
                {rulesQuery.error.rawErrors?.map((error, index) => (
                  <div key={`${error.type}-${index}`}>{error.msg}</div>
                ))}
              </div>
            )}
            {rulesQuery.isFetching && (
              <span className="text-[11px] text-[#808080]">
                Refreshing rules...
              </span>
            )}
          </div>

          {/* Right Rule Builder Card */}
          <div className="lg:col-span-8 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-6">
            <div className="rounded-[10px] border border-[#ebebeb] bg-[#fafafa] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-[14px] font-bold text-[#1f1f1f]">
                    Saved Academic Rules
                  </h3>
                  <p className="text-[11px] text-[#808080] mt-1">
                    {rulesQuery.data
                      ? `${rulesQuery.data.data.total} rule${rulesQuery.data.data.total === 1 ? "" : "s"} loaded`
                      : "Loading rules..."}
                  </p>
                </div>
                {rulesQuery.isFetching && (
                  <span className="text-[11px] text-[#808080]">Loading...</span>
                )}
              </div>
              {!rulesQuery.isLoading && ruleItems.length === 0 && (
                <p className="text-[12px] text-[#808080]">
                  No saved academic rules found.
                </p>
              )}
              {ruleItems.length > 0 && (
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
                  {ruleItems.map((rule) => (
                    <div
                      key={rule.id}
                      className="rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 text-[12px]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRuleId(rule.id)}
                          className="font-semibold text-[#046aff] hover:underline"
                        >
                          {rule.rule_type}
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="text-[#808080]">
                            v{rule.version_number}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              submitRule.mutate({
                                ruleId: rule.id,
                                payload: { row_version: rule.row_version },
                              })
                            }
                            disabled={submitRule.isPending}
                            className="rounded-[6px] bg-[#046aff] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#0356d6] disabled:opacity-50"
                          >
                            {submitRule.isPending ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                      <div className="text-[#5c5c5c] mt-1">
                        Scope: {rule.scope}
                      </div>
                      <div className="text-[#808080] break-all">
                        Scope ref: {rule.scope_ref_id} · Row version:{" "}
                        {rule.row_version}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {ruleDetailQuery.isError && (
                <div
                  role="alert"
                  className="rounded-[8px] border border-[#F69999] bg-[#FEF0F0] px-3 py-2 text-[12px] text-[#B91C1C]"
                >
                  {ruleDetailQuery.error.message}
                  {ruleDetailQuery.error.rawErrors?.map((error, index) => (
                    <div key={`detail-${error.type}-${index}`}>{error.msg}</div>
                  ))}
                </div>
              )}
              {ruleDetailQuery.data && (
                <div className="rounded-[8px] border border-[#d2e4ff] bg-[#f0f8ff] px-3 py-2 text-[12px] text-[#334155]">
                  <div className="font-semibold text-[#1f1f1f]">
                    Selected rule definition
                  </div>
                  <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words font-mono text-[11px]">
                    {JSON.stringify(
                      ruleDetailQuery.data.data.rule_definition,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f5f5f5]">
              <div>
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  {activeCategory} Builder
                </h3>
                <p className="text-[12px] text-[#808080]">
                  Configure system constraints for curriculum course selection
                </p>
              </div>
              <button
                onClick={handleSaveRule}
                className="px-4 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-start sm:self-center"
              >
                <Plus className="w-4 h-4" />
                <span>New Rule</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Scope
                <input
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                  maxLength={50}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium normal-case tracking-normal text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                />
              </label>
              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider sm:col-span-2">
                Scope Reference ID (UUID)
                <input
                  value={scopeRefId}
                  onChange={(event) => setScopeRefId(event.target.value)}
                  placeholder="Required UUID"
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium normal-case tracking-normal text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                />
              </label>
              <label className="flex flex-col gap-1 text-[11px] font-semibold text-[#808080] uppercase tracking-wider sm:col-span-3">
                Target Course ID (optional UUID)
                <input
                  value={targetCourseId}
                  onChange={(event) => setTargetCourseId(event.target.value)}
                  placeholder="Optional UUID"
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium normal-case tracking-normal text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                />
              </label>
            </div>

            {/* Rule Card Block */}
            <div className="border border-[#e5e5e5] rounded-[14px] p-5 bg-[#fafafa] flex flex-col gap-4">
              <span className="text-[13px] font-bold text-[#1f1f1f]">
                Rule 1: Advanced Standing Requirement
              </span>

              {/* Condition 1: IF */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="w-10 text-xs font-bold text-[#046aff] uppercase tracking-wide">
                  IF
                </span>
                <select
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                >
                  <option value="student.standing">student.standing</option>
                  <option value="student.gpa">student.gpa</option>
                  <option value="student.credits_completed">
                    student.credits_completed
                  </option>
                </select>

                <select
                  value={operator1}
                  onChange={(e) => setOperator1(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-2.5 py-1.5 text-[13px] font-bold text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                >
                  <option value=">=">&gt;=</option>
                  <option value="<=">&lt;=</option>
                  <option value="==">==</option>
                  <option value="!=">!=</option>
                </select>

                <input
                  type="text"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] w-28 focus:outline-none focus:border-[#046aff]"
                />
              </div>

              {/* Condition 2: AND */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="w-10 text-xs font-bold text-[#046aff] uppercase tracking-wide">
                  AND
                </span>
                <select
                  value={field2}
                  onChange={(e) => setField2(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                >
                  <option value="course.credits">course.credits</option>
                  <option value="course.level">course.level</option>
                  <option value="semester.load">semester.load</option>
                </select>

                <select
                  value={operator2}
                  onChange={(e) => setOperator2(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-2.5 py-1.5 text-[13px] font-bold text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
                >
                  <option value="<=">&lt;=</option>
                  <option value=">=">&gt;=</option>
                  <option value="==">==</option>
                </select>

                <input
                  type="text"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] w-20 focus:outline-none focus:border-[#046aff]"
                />
              </div>

              {/* Then Clause */}
              <div className="flex items-center gap-2.5 flex-wrap pt-1 border-t border-[#e5e5e5]">
                <span className="w-10 text-xs font-bold text-[#16a34a] uppercase tracking-wide">
                  THEN
                </span>
                <select
                  value={thenAction}
                  onChange={(e) => setThenAction(e.target.value)}
                  className="bg-white border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-semibold text-[#166534] focus:outline-none focus:border-[#046aff]"
                >
                  <option value="allow_registration">allow_registration</option>
                  <option value="require_advisor_approval">
                    require_advisor_approval
                  </option>
                  <option value="block_registration">block_registration</option>
                </select>
              </div>
            </div>

            {/* Field Student-Safe Explanation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Student-Safe Explanation
              </label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
              />
              <span className="text-[11px] text-[#808080]">
                This message is shown to students if rule conditions trigger an
                exception.
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f5f5f5]">
              <button
                onClick={onBackToCurricula}
                className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRule}
                disabled={createRule.isPending}
                className="px-5 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{createRule.isPending ? "Saving..." : "Save Rule"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
