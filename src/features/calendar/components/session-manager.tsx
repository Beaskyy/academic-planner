'use client';

import React, { useState } from 'react';
import { Plus, ChevronRight, Menu, Calendar as CalendarIcon, Clock, Globe } from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';

interface SessionManagerProps {
  onCreateSession: () => void;
  onSelectPeriod: (periodName: string) => void;
  onOpenMobileMenu?: () => void;
}

export function SessionManager({
  onCreateSession,
  onSelectPeriod,
  onOpenMobileMenu,
}: SessionManagerProps) {
  const [activeTab, setActiveTab] = useState<'sessions' | 'periods' | 'calendar'>('sessions');

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
              <span className="text-[12px] font-medium text-[#808080]">Academic Calendar</span>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                Academic Sessions
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={onCreateSession}
          className="inline-flex items-center justify-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Session</span>
        </button>
      </div>

      {/* ── Tab Bar ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 border-b border-[#f0f0f0] text-[14px] font-medium">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`pb-2.5 transition-all cursor-pointer select-none relative ${
            activeTab === 'sessions'
              ? 'text-[#046aff] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#046aff]'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f]'
          }`}
        >
          Sessions
        </button>
        <button
          onClick={() => setActiveTab('periods')}
          className={`pb-2.5 transition-all cursor-pointer select-none relative ${
            activeTab === 'periods'
              ? 'text-[#046aff] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#046aff]'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f]'
          }`}
        >
          Periods
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-2.5 transition-all cursor-pointer select-none relative ${
            activeTab === 'calendar'
              ? 'text-[#046aff] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#046aff]'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f]'
          }`}
        >
          Calendar View
        </button>
      </div>

      {/* ── Session Card (Expanded) ─────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-6 w-full">
        {/* Card Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#f5f5f5]">
          <h2 className="text-[18px] font-bold text-[#0b0b0b]">
            2026/2027 Academic Session
          </h2>
          <StatusTag label="In Review" variant="in-review" />
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[13px] text-[#5c5c5c]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#808080]">Academic Year:</span>
            <span className="font-semibold text-[#1f1f1f]">2026/2027</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#808080]">Timezone:</span>
            <span className="font-semibold text-[#1f1f1f]">Africa/Lagos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#808080]">Range:</span>
            <span className="font-semibold text-[#1f1f1f]">01 Sep 2026 – 31 Jul 2027</span>
          </div>
        </div>

        {/* Calendar Periods Section */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="text-[14px] font-semibold text-[#0b0b0b]">Calendar Periods</h3>

          <div className="flex flex-col gap-2.5">
            {/* Period Item 1 (Clickable) */}
            <div
              onClick={() => onSelectPeriod('Semester 1')}
              className="flex items-center justify-between p-3.5 rounded-lg border border-[#ebebeb] bg-[#fafafa] hover:bg-[#f0f8ff]/60 hover:border-[#046aff]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-[#046aff]" />
                <span className="text-[14px] font-semibold text-[#1f1f1f] group-hover:text-[#046aff] transition-colors">
                  Semester 1
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-[#5c5c5c] hidden sm:inline">
                  16 Teaching Weeks
                </span>
                <StatusTag label="In Review" variant="in-review" />
                <ChevronRight className="w-4 h-4 text-[#808080] group-hover:text-[#046aff] transition-colors" />
              </div>
            </div>

            {/* Period Item 2 */}
            <div
              onClick={() => onSelectPeriod('Semester 2')}
              className="flex items-center justify-between p-3.5 rounded-lg border border-[#ebebeb] bg-[#fafafa] hover:bg-[#f0f8ff]/60 hover:border-[#046aff]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-[#808080]" />
                <span className="text-[14px] font-semibold text-[#1f1f1f] group-hover:text-[#046aff] transition-colors">
                  Semester 2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-[#5c5c5c] hidden sm:inline">
                  16 Teaching Weeks
                </span>
                <StatusTag label="Draft" variant="draft" />
                <ChevronRight className="w-4 h-4 text-[#808080] group-hover:text-[#046aff] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
