'use client';

import React from 'react';
import {
  FileText,
  FolderOpen,
  Building2,
  Calendar,
  ArrowRight,
  Menu,
} from 'lucide-react';
import { StatusTag, StatusTagVariant } from './status-tag';

interface PlanReadyDashboardProps {
  onOpenMobileMenu?: () => void;
}

const metrics: { label: string; value: string; badge: string; badgeVariant: StatusTagVariant }[] = [
  { label: 'Structures', value: '24', badge: 'Published', badgeVariant: 'published' },
  { label: 'Calendar', value: 'Published', badge: 'Healthy', badgeVariant: 'live' },
  { label: 'Offerings', value: '18 / 18 Pub', badge: 'Published', badgeVariant: 'published' },
  { label: 'Conflicts', value: '0', badge: 'Resolved', badgeVariant: 'ready' },
  { label: 'Assignments', value: '0 Gaps', badge: 'Complete', badgeVariant: 'ready' },
];

const myWork: { icon: typeof FileText; name: string; time: string; badge: string; badgeVariant: StatusTagVariant }[] = [
  { icon: FileText, name: 'BSc Computer Science Curriculum v3 — Published', time: 'Edited 45m ago', badge: 'Published', badgeVariant: 'published' },
  { icon: FolderOpen, name: 'Semester 1 Offerings batch', time: 'Edited 2h ago', badge: 'Published', badgeVariant: 'published' },
  { icon: Building2, name: 'Room allocation — Complete', time: 'Edited 1d ago', badge: 'In Progress', badgeVariant: 'in-progress' },
  { icon: Calendar, name: 'Add/Drop window dates', time: 'Edited 3d ago', badge: 'Published', badgeVariant: 'published' },
];

const checklist = [
  { label: 'Academic Structures & Programmes', badge: 'Published ✓', done: true },
  { label: 'Academic Session & Calendar', badge: 'Published ✓', done: true },
  { label: 'Course Catalogue Versions', badge: 'Published ✓', done: true },
  { label: 'Curriculum & Registration Rules', badge: 'Published ✓', done: true },
  { label: 'Offerings & Staff Assignments', badge: 'Published ✓', done: true },
];

const recommendations = [
  { label: 'Review Student Enrollment Targets', badge: 'Due Soon', urgent: true },
  { label: 'Confirm External Examiner Slots', badge: 'Optional', urgent: false },
  { label: 'Sync Timetable to Portal', badge: 'Pending', urgent: true },
];

export function PlanReadyDashboard({ onOpenMobileMenu }: PlanReadyDashboardProps) {
  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Top Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        {/* Title and Period */}
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
              Planning Home — Next Period Ready
            </h1>
          </div>
          <div className="flex items-center gap-2 pl-0.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0" />
            <p className="text-[14px] font-medium text-[#5c5c5c]">
              2026/2027 Semester 1 &bull; All required artifacts and acknowledgements healthy
            </p>
          </div>
        </div>

        {/* Completeness and CTA */}
        <div className="flex items-center gap-6 self-start md:self-auto">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-[#808080]">Plan Readiness</span>
              <span className="text-[14px] font-bold text-[#22c55e]">100%</span>
            </div>
            <div className="w-[120px] h-1.5 bg-[#dcfce7] rounded-full overflow-hidden flex gap-[3px]">
              <div className="w-[40px] h-full bg-[#22c55e]" />
              <div className="w-[40px] h-full bg-[#22c55e]" />
              <div className="w-[20px] h-full bg-[#22c55e]" />
              <div className="w-[20px] h-full bg-[#22c55e]" />
            </div>
          </div>
          <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm whitespace-nowrap flex items-center gap-2">
            Publish Period
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Metrics Cards Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white border border-[#f0f0f0] rounded-[14px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-3"
          >
            <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wide">{m.label}</span>
            <div className="flex items-end gap-2 flex-wrap">
              <span className="text-[22px] font-bold text-[#0b0b0b] leading-none">{m.value}</span>
              <StatusTag variant={m.badgeVariant} label={m.badge} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Dashboard Grid ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Workspace Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* My Planning Work Card */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-[#0b0b0b]">My Planning Work</h2>
              <span className="text-[12px] font-medium text-[#808080]">4 Active Artifacts</span>
            </div>
            <div className="flex flex-col divide-y divide-[#f5f5f5]">
              {myWork.map((item) => (
                <div key={item.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="w-9 h-9 rounded-[8px] bg-[#f0f7ff] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-[#046aff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#1f1f1f] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#808080]">{item.time}</p>
                  </div>
                  <StatusTag variant={item.badgeVariant} label={item.badge} />
                </div>
              ))}
            </div>
          </div>

          {/* Returned to Me Card */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-semibold text-[#0b0b0b] mb-4">Returned to Me</h2>
            <div className="border border-[#f0f0f0] rounded-[10px] p-4 bg-[#fafcff]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-[#1f1f1f]">Faculty of Science calendar amendment</span>
                <StatusTag variant="returned" label="Returned" />
              </div>
              <p className="text-[13px] text-[#5c5c5c] mb-2">Calendar amendment approved and published.</p>
              <p className="text-[11px] text-[#808080]">Reviewed by Dr. Marcus (VP Academic) &bull; 4h ago</p>
            </div>
          </div>
        </div>

        {/* Right Workspace Column */}
        <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-4">
          {/* Dependency Checklist Card */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-semibold text-[#0b0b0b] mb-4">Dependency Checklist</h2>
            <div className="flex flex-col gap-3">
              {checklist.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                    <span className="text-[13px] text-[#1f1f1f] truncate">{item.label}</span>
                  </div>
                  <span className="inline-flex items-center bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Configuration Card */}
          <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-[#0b0b0b]">Admin Configuration</h2>
            </div>

            {/* 2025/2026 - Lagos */}
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[10px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-semibold text-[#1f1f1f]">2026/2027 – Lagos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#808080]">Academic Planning — Awaiting publish</span>
                  <span className="inline-flex items-center bg-[#fffbeb] text-[#92400e] border border-[#fde68a] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Ready
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[10px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-semibold text-[#1f1f1f]">ODEL University – Lagos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#808080]">Academic Planning — Available</span>
                  <span className="inline-flex items-center bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[10px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-semibold text-[#1f1f1f]">Academic Planner — Standby</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#808080]">Next academic session</span>
                  <span className="inline-flex items-center bg-[#f5f5f5] text-[#5c5c5c] border border-[#e5e7eb] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Standby
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-[#046aff] hover:bg-[#254bdb] text-white py-2.5 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm">
              Switch Planning Context
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
