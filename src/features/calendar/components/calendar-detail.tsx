'use client';

import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ChevronRight, Menu } from 'lucide-react';

interface CalendarDetailProps {
  periodName?: string;
  onBack: () => void;
  onPreviewImpact: () => void;
  onOpenMobileMenu?: () => void;
}

export function CalendarDetail({
  periodName = 'Semester 1',
  onBack,
  onPreviewImpact,
  onOpenMobileMenu,
}: CalendarDetailProps) {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
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
                Academic Calendar &gt; 2026/2027 Session
              </span>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                {periodName} Detail View
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] px-3.5 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sessions</span>
          </button>
          <button
            onClick={onPreviewImpact}
            className="inline-flex items-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors shadow-xs cursor-pointer select-none"
          >
            <span>Preview Impact</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Gantt Period Timeline Card ─────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-5 overflow-x-auto w-full">
        <h2 className="text-[16px] font-semibold text-[#0b0b0b]">Visual Period Timeline</h2>

        <div className="flex flex-col gap-4 min-w-[620px] pt-1">
          {/* Bar 1: Teaching weeks */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Teaching weeks
            </span>
            <div className="flex-1 bg-[#f5f5f5] h-5 rounded-md relative flex items-center">
              <div
                className="bg-[#046aff] h-4 rounded-md text-white text-[10px] font-semibold px-2 flex items-center shadow-xs"
                style={{ width: '60%', marginLeft: '10%' }}
              >
                16 Teaching Weeks
              </div>
            </div>
          </div>

          {/* Bar 2: Registration */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Registration
            </span>
            <div className="flex-1 bg-[#f5f5f5] h-5 rounded-md relative flex items-center">
              <div
                className="border-2 border-[#1fc16b] bg-[#e0faec] text-[#1fc16b] h-4 rounded-md text-[10px] font-semibold px-2 flex items-center"
                style={{ width: '22%', marginLeft: '0%' }}
              >
                01 Sep – 05 Sep
              </div>
            </div>
          </div>

          {/* Bar 3: Add/Drop Window */}
          <div className="flex items-center gap-4">
            <span className="w-32 text-[13px] font-medium text-[#5c5c5c] shrink-0">
              Add/Drop Window
            </span>
            <div className="flex-1 bg-[#f5f5f5] h-5 rounded-md relative flex items-center">
              <div
                className="border-2 border-[#f97316] bg-[#ffedd5] text-[#c2410c] h-4 rounded-md text-[10px] font-semibold px-2 flex items-center"
                style={{ width: '18%', marginLeft: '12%' }}
              >
                14 Sep – 25 Sep
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Split Area: Event Records & Validation Summary ─────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left: Event Records Table */}
        <div className="flex-1 min-w-0 bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 overflow-x-auto w-full">
          <h3 className="text-[16px] font-semibold text-[#0b0b0b]">Event Records</h3>

          <div className="min-w-[500px]">
            {/* Headers */}
            <div className="grid grid-cols-12 gap-3 pb-3 border-b border-[#f5f5f5] text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
              <div className="col-span-6 pl-2">Event Type / Label</div>
              <div className="col-span-3">Start Date</div>
              <div className="col-span-3">End Date</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-[#f5f5f5]">
              <div className="grid grid-cols-12 gap-3 items-center py-3">
                <div className="col-span-6 pl-2 text-[13px] font-semibold text-[#1f1f1f]">
                  Registration
                </div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">01 Sep 2026</div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">05 Sep 2026</div>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center py-3">
                <div className="col-span-6 pl-2 text-[13px] font-semibold text-[#1f1f1f]">
                  Teaching Week 1
                </div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">07 Sep 2026</div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">11 Sep 2026</div>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center py-3">
                <div className="col-span-6 pl-2 text-[13px] font-semibold text-[#1f1f1f]">
                  Teaching Week 2 (Add/Drop Opens)
                </div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">14 Sep 2026</div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">18 Sep 2026</div>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center py-3">
                <div className="col-span-6 pl-2 text-[13px] font-semibold text-[#1f1f1f]">
                  Add/Drop Window Close
                </div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">25 Sep 2026</div>
                <div className="col-span-3 text-[13px] text-[#5c5c5c]">25 Sep 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Validation Summary Card */}
        <div className="w-full lg:w-[360px] shrink-0 bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <h3 className="text-[16px] font-semibold text-[#0b0b0b]">Validation Summary</h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#e0faec]/40 border border-[#e0faec]">
              <CheckCircle2 className="w-4 h-4 text-[#1fc16b] shrink-0 mt-0.5" />
              <span className="text-[13px] font-medium text-[#15803d]">
                Date sequence logical
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#fff7ed] border border-[#fed7aa]">
              <AlertTriangle className="w-4 h-4 text-[#c2410c] shrink-0 mt-0.5" />
              <span className="text-[13px] font-medium text-[#c2410c]">
                Registration overlaps slightly with setup week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
