"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Plus,
  Filter,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Edit,
  Menu,
} from "lucide-react";
import { StatusTag } from "@/features/planning-home/components/status-tag";
import { useListCourseOfferings } from "@/hooks/use-course-offerings";

interface OfferingsDashboardProps {
  onCreateOffering: () => void;
  onEditOffering: (
    sectionCode: string,
    offeringId: string,
    rowVersion: number,
  ) => void;
  onOpenMobileMenu?: () => void;
}

export function OfferingsDashboard({
  onCreateOffering,
  onEditOffering,
  onOpenMobileMenu,
}: OfferingsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("2026/2027 Sem 1");
  const [selectedProg, setSelectedProg] = useState("Computer Science");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const offeringsQuery = useListCourseOfferings({ limit: 200, offset: 0 });
  const offerings = offeringsQuery.data?.data.items ?? [];
  const totalOfferings = offeringsQuery.data?.data.total ?? offerings.length;
  const draftCount = offerings.filter(
    (offering) => offering.status.toLowerCase() === "draft",
  ).length;
  const publishedCount = offerings.filter((offering) =>
    ["published", "approved"].includes(offering.status.toLowerCase()),
  ).length;
  const openRegistrationCount = offerings.filter((offering) =>
    (offering.registration_availability || "").toLowerCase().includes("open"),
  ).length;

  return (
    <div className="flex-1 min-w-0 bg-[#fafafa] flex flex-col">
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
            <span className="text-[#1f1f1f] font-semibold">
              Course Offerings
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Course Offerings
          </h1>
        </div>

        <button
          onClick={onCreateOffering}
          className="px-4 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Create Offering</span>
        </button>
      </header>

      {/* Content Body */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* Summary KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Total Offerings
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">
                {offeringsQuery.isLoading
                  ? "…"
                  : `${totalOfferings} ${totalOfferings === 1 ? "Section" : "Sections"}`}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                Active Session
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Draft Offerings
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">
                {offeringsQuery.isLoading ? "…" : draftCount}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                Complete Staffing
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Published Offerings
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">
                {offeringsQuery.isLoading ? "…" : publishedCount}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                Live catalogue
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Open Registration
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">
                {offeringsQuery.isLoading ? "…" : openRegistrationCount}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef4ff] text-[#046aff] border border-[#d2e4ff]">
                Healthy load
              </span>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-wrap items-center gap-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#808080] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="2026/2027 Sem 1">Period: 2026/2027 Sem 1</option>
              <option value="2026/2027 Sem 2">Period: 2026/2027 Sem 2</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="relative min-w-[210px]">
            <select
              value={selectedProg}
              onChange={(e) => setSelectedProg(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="Computer Science">Prog: Computer Science</option>
              <option value="Software Engineering">
                Prog: Software Engineering
              </option>
              <option value="Mathematics">Prog: Mathematics</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="relative min-w-[180px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="All">Status: All</option>
              <option value="Under Review">Status: Under Review</option>
              <option value="Approved">Status: Approved</option>
              <option value="Action Required">Status: Action Required</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>
        </div>

        {/* Offerings Table Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                  <th className="py-3 px-3">Section Code</th>
                  <th className="py-3 px-3">Course Title</th>
                  <th className="py-3 px-3">Programme Context</th>
                  <th className="py-3 px-3">Delivery Mode</th>
                  <th className="py-3 px-3">Capacity Util.</th>
                  <th className="py-3 px-3">Lead Instructor</th>
                  <th className="py-3 px-3">Workflow Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                {offeringsQuery.isError && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-[#b91c1c]">
                      {offeringsQuery.error.message}
                    </td>
                  </tr>
                )}
                {!offeringsQuery.isLoading &&
                  !offeringsQuery.isError &&
                  offerings.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-[#808080]"
                      >
                        No course offerings found.
                      </td>
                    </tr>
                  )}
                {offerings.map((o) => {
                  const statusVariant =
                    o.status === "published"
                      ? "published"
                      : o.status === "draft"
                        ? "draft"
                        : "in-review";
                  const statusLabel = o.status
                    .replace(/[_-]/g, " ")
                    .toUpperCase();

                  return (
                    <tr
                      key={o.id}
                      className="hover:bg-[#fafafa] transition-colors"
                    >
                      <td className="py-3.5 px-3 font-semibold text-[#1f1f1f]">
                        {o.section_label}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-[#1f1f1f]">
                        {o.course_id}
                      </td>
                      <td className="py-3.5 px-3 text-[#5c5c5c]">
                        {o.eligible_programme_ids.length
                          ? o.eligible_programme_ids.join(", ")
                          : "All programmes"}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-[#5c5c5c] font-medium">
                          {o.delivery_mode || "Not specified"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-24">
                          <span className="text-[11px] text-[#808080] font-medium">
                            Capacity: {o.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-[#808080]">Not provided</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <StatusTag
                          label={statusLabel}
                          variant={statusVariant}
                        />
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() =>
                            onEditOffering(o.section_label, o.id, o.row_version)
                          }
                          className="px-3 py-1.5 text-xs font-semibold text-[#046aff] hover:bg-[#f0f8ff] rounded-[6px] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f5] text-xs text-[#808080]">
            <span>
              {offeringsQuery.isLoading
                ? "Loading offerings..."
                : `Showing ${offerings.length} of ${offeringsQuery.data?.data.total ?? 0} section offerings`}
            </span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md bg-[#046aff] text-white font-semibold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded-md hover:bg-[#f5f5f5] text-[#1f1f1f] font-medium flex items-center justify-center">
                2
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
