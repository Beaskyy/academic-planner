'use client';

import React, { useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { StatusTag, type StatusTagVariant } from './status-tag';

interface PreparePeriodViewProps {
  onCancel: () => void;
  onSave: () => void;
  onOpenMobileMenu?: () => void;
}

interface ChecklistItem {
  id: number;
  title: string;
  note: string;
  statusLabel: string;
  statusVariant: StatusTagVariant;
  actionText: string;
  isBlocked?: boolean;
}

const baselineItems: ChecklistItem[] = [
  {
    id: 1,
    title: 'Academic Structures & Programmes',
    note: 'Owner: Registrar Office • v4.2 Published',
    statusLabel: 'Published ✓',
    statusVariant: 'published',
    actionText: 'Revise',
  },
  {
    id: 2,
    title: 'Academic Session & Calendar',
    note: 'Owner: Academic Committee • v2.1 Pending VP Ack',
    statusLabel: 'In Review',
    statusVariant: 'in-review',
    actionText: 'View',
  },
  {
    id: 3,
    title: 'Course Catalogue Versions',
    note: 'Owner: Syllabus Board • v12.0 Active',
    statusLabel: 'Published ✓',
    statusVariant: 'published',
    actionText: 'View',
  },
  {
    id: 4,
    title: 'Curriculum & Registration Rules',
    note: 'Owner: Curriculum Head • No published curriculum',
    statusLabel: 'Draft Required',
    statusVariant: 'draft-required',
    actionText: 'Create New',
  },
  {
    id: 5,
    title: 'Course Offerings & Assignments',
    note: 'Requires published Calendar and Curriculum',
    statusLabel: 'Blocked',
    statusVariant: 'blocked',
    actionText: 'View',
    isBlocked: true,
  },
  {
    id: 6,
    title: 'Venues, Rooms & Resources',
    note: 'Owner: Facilities Team • Needs room allocation',
    statusLabel: 'Draft Required',
    statusVariant: 'draft-required',
    actionText: 'Create New',
  },
  {
    id: 7,
    title: 'Teaching Timetable',
    note: 'Owner: Timetable Coord • Awaiting timeline baseline',
    statusLabel: 'Draft Required',
    statusVariant: 'draft-required',
    actionText: 'Create New',
  },
];

export function PreparePeriodView({ onCancel, onSave, onOpenMobileMenu }: PreparePeriodViewProps) {
  const [selectedSession, setSelectedSession] = useState('2027/2028 Academic Year');
  const [selectedPeriod, setSelectedPeriod] = useState('Semester 1');

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        {/* Title and Description */}
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
            <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Prepare Next Period
            </h1>
          </div>
          <p className="text-[14px] text-[#5c5c5c]">
            Complete the baseline steps below to authorize and configure session timetables.
          </p>
        </div>

        {/* Progress Status */}
        <div className="flex flex-col items-end gap-1.5 self-start md:self-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[12px] font-medium text-[#808080]">Baselines Prepared</span>
            <span className="text-[14px] font-bold text-[#046aff]">3 of 7 Ready</span>
          </div>
          <div className="w-[140px] h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden flex gap-[3px]">
            <div className="w-[40px] h-full bg-[#046aff]" />
            <div className="w-[40px] h-full bg-[#046aff]" />
            <div className="w-[20px] h-full bg-[#046aff]" />
            <div className="w-[40px] h-full bg-transparent" />
          </div>
        </div>
      </div>

      {/* ── Target Settings ────────────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Dropdown 1 */}
        <div className="flex items-center justify-between gap-3 w-full md:w-auto flex-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
              Target Academic Session
            </span>
            <span className="text-[14px] font-semibold text-[#1f1f1f]">{selectedSession}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-[#808080] shrink-0" />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-[#ebebeb]" />

        {/* Dropdown 2 */}
        <div className="flex items-center justify-between gap-3 w-full md:w-auto flex-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
              Target Period
            </span>
            <span className="text-[14px] font-semibold text-[#1f1f1f]">{selectedPeriod}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-[#808080] shrink-0" />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-[#ebebeb]" />

        {/* Timezone Info */}
        <div className="flex flex-col gap-0.5 w-full md:w-auto flex-1">
          <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
            School Timezone
          </span>
          <span className="text-[14px] font-semibold text-[#1f1f1f]">
            WAT — West Africa Time (GMT+1)
          </span>
        </div>
      </div>

      {/* ── Checklist Stack (7 items) ──────────────────────────────── */}
      <div className="flex flex-col gap-3 w-full">
        {baselineItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left metadata */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center text-[14px] font-semibold text-[#1f1f1f] shrink-0">
                {item.id}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[15px] font-semibold text-[#1f1f1f] truncate">
                  {item.title}
                </span>
                <span
                  className={`text-[13px] truncate ${
                    item.isBlocked ? 'text-[#dc2626] font-medium' : 'text-[#808080]'
                  }`}
                >
                  {item.note}
                </span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <StatusTag label={item.statusLabel} variant={item.statusVariant} />
              <button
                className={`border border-[#ebebeb] px-4 py-1.5 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
                  item.isBlocked
                    ? 'bg-[#fafafa] text-[#808080] cursor-not-allowed border-[#f0f0f0]'
                    : 'bg-white text-[#1f1f1f] hover:bg-[#f5f5f5]'
                }`}
                disabled={item.isBlocked}
              >
                {item.actionText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Actions Bar ─────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer select-none"
        >
          Cancel Setup
        </button>
        <button
          onClick={onSave}
          className="bg-[#335cff] hover:bg-[#254bdb] text-white px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-xs cursor-pointer select-none"
        >
          Save Plan
        </button>
      </div>
    </div>
  );
}
