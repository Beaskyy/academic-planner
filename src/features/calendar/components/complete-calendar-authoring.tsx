'use client';

import React from 'react';
import { Calendar, Check, AlertCircle, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

export interface CompleteCalendarAuthoringProps {
  onBackToSessions?: () => void;
}

export function CompleteCalendarAuthoring({ onBackToSessions }: CompleteCalendarAuthoringProps) {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[13px] text-[#808080]">
          <button
            type="button"
            onClick={onBackToSessions}
            className="hover:text-[#046aff] transition-colors cursor-pointer"
          >
            Academic Calendar
          </button>
          <span>&gt;</span>
          <span>2026/2027 Session</span>
        </div>
        <h1 className="text-[26px] sm:text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
          Semester 1 — Complete Calendar Definition
        </h1>
      </div>

      {/* Visual Period Timeline (Gantt Timeline) */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#0b0b0b]">
            Visual Period Timeline
          </h2>
          <span className="text-xs font-semibold text-[#1fc16b] bg-[#eafaf1] border border-[#d1f2e1] px-2.5 py-0.5 rounded-full">
            Active Period • 16 Teaching Weeks
          </span>
        </div>

        {/* Timeline Visual Track */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Bar 1: Teaching Weeks */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Teaching weeks
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden relative">
              <div
                className="bg-[#046aff] h-full rounded-full transition-all"
                style={{ width: '65%', marginLeft: '10%' }}
                title="Teaching weeks: 07 Sep 2026 - 18 Dec 2026"
              />
            </div>
            <span className="text-[12px] font-medium text-[#1f1f1f] shrink-0 w-28 text-right">
              07 Sep – 18 Dec
            </span>
          </div>

          {/* Bar 2: Registration */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Registration
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden relative">
              <div
                className="bg-[#f59e0b] h-full rounded-full transition-all"
                style={{ width: '25%', marginLeft: '5%' }}
                title="Registration window: 24 Aug 2026 - 18 Sep 2026"
              />
            </div>
            <span className="text-[12px] font-medium text-[#1f1f1f] shrink-0 w-28 text-right">
              24 Aug – 18 Sep
            </span>
          </div>

          {/* Bar 3: Add/Drop Window */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Add/Drop Window
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden relative">
              <div
                className="bg-[#10b981] h-full rounded-full transition-all"
                style={{ width: '18%', marginLeft: '10%' }}
                title="Add/Drop: 07 Sep 2026 - 25 Sep 2026"
              />
            </div>
            <span className="text-[12px] font-medium text-[#1f1f1f] shrink-0 w-28 text-right">
              07 Sep – 25 Sep
            </span>
          </div>
        </div>
      </div>

      {/* Split Area: Table & Validation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Required Calendar Records */}
        <div className="lg:col-span-2 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <h2 className="text-[16px] font-bold text-[#0b0b0b]">
            Required Calendar Records
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f0f0f0] text-[12px] font-bold text-[#808080] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Event Type / Label</th>
                  <th className="pb-3 font-semibold">Start Date</th>
                  <th className="pb-3 font-semibold">End Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-[#0b0b0b]">
                    Teaching dates &amp; teaching weeks
                    <div className="text-[11px] text-[#808080] font-normal">
                      16 instructional teaching weeks
                    </div>
                  </td>
                  <td className="py-3.5 font-medium text-[#1f1f1f]">07 Sep 2026</td>
                  <td className="py-3.5 font-medium text-[#1f1f1f]">18 Dec 2026</td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-[#0b0b0b]">
                    Holidays, breaks &amp; academic milestones
                    <div className="text-[11px] text-[#808080] font-normal">
                      Mid-semester break &amp; national holidays
                    </div>
                  </td>
                  <td className="py-3.5 font-medium text-[#1f1f1f]">12 Oct 2026</td>
                  <td className="py-3.5 font-medium text-[#1f1f1f]">16 Oct 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Validation Summary */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#1fc16b]" />
            <h2 className="text-[16px] font-bold text-[#0b0b0b]">
              Validation Summary
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-3.5 rounded-[12px] bg-[#eafaf1] border border-[#d1f2e1] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#1fc16b] shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="text-[12px] text-[#137a43] leading-relaxed">
                Session containment, order, timezone, windows and overlaps validated
              </span>
            </div>

            <div className="p-3.5 rounded-[12px] bg-[#f0f8ff] border border-[#d0e5ff] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#046aff] shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="text-[12px] text-[#0353c7] leading-relaxed">
                Registration and add/drop windows are valid in Africa/Lagos
              </span>
            </div>
          </div>

          <div className="mt-auto pt-2 border-t border-[#f0f0f0] text-[11px] text-[#808080]">
            Timezone context: <span className="font-semibold text-[#1f1f1f]">Africa/Lagos (WAT)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
