'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';

interface OfferingsDashboardProps {
  onCreateOffering: () => void;
  onEditOffering: (sectionCode: string) => void;
  onOpenMobileMenu?: () => void;
}

export function OfferingsDashboard({
  onCreateOffering,
  onEditOffering,
  onOpenMobileMenu,
}: OfferingsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('2026/2027 Sem 1');
  const [selectedProg, setSelectedProg] = useState('Computer Science');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const offerings = [
    {
      code: 'CSC 301-A',
      title: 'Software Engineering I',
      programme: 'BSc Computer Science',
      mode: 'In-person',
      enrolled: 85,
      capacity: 100,
      instructor: 'Dr. Charles Ononiwu',
      status: 'in-review' as const,
      statusLabel: 'UNDER REVIEW',
    },
    {
      code: 'CSC 301-B',
      title: 'Software Engineering I',
      programme: 'BSc Computer Science',
      mode: 'Online',
      enrolled: 95,
      capacity: 100,
      instructor: 'Prof. Grace Hopper',
      status: 'published' as const,
      statusLabel: 'APPROVED',
    },
    {
      code: 'CSC 312-A',
      title: 'Database Systems',
      programme: 'BSc Computer Science',
      mode: 'Hybrid',
      enrolled: 30,
      capacity: 50,
      instructor: 'Dr. Alan Turing',
      status: 'draft' as const,
      statusLabel: 'DRAFT',
    },
    {
      code: 'CSC 305-A',
      title: 'Operating Systems',
      programme: 'BSc Computer Science',
      mode: 'In-person',
      enrolled: 60,
      capacity: 60,
      instructor: 'Unassigned',
      status: 'action-req' as const,
      statusLabel: 'ACTION REQ',
    },
    {
      code: 'MTH 302-A',
      title: 'Abstract Algebra',
      programme: 'BSc Mathematics',
      mode: 'In-person',
      enrolled: 16,
      capacity: 40,
      instructor: 'Dr. Ada Lovelace',
      status: 'published' as const,
      statusLabel: 'PUBLISHED',
    },
  ];

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
            <span className="text-[#1f1f1f] font-semibold">Course Offerings</span>
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
                48 Sections
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                Active Session
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Sections with Lead
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">41</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                Complete Staffing
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Sections without Lead
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#dc2626]">7</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#fff1f2] text-[#be123c] border border-[#fecdd3]">
                Action Required
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between h-[104px]">
            <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Avg. Capacity Util.
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-bold text-[#1f1f1f]">82.4%</span>
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
              <option value="Software Engineering">Prog: Software Engineering</option>
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
                {offerings.map((o) => {
                  const pct = Math.round((o.enrolled / o.capacity) * 100);
                  const isUnassigned = o.instructor === 'Unassigned';

                  return (
                    <tr
                      key={o.code}
                      className="hover:bg-[#fafafa] transition-colors"
                    >
                      <td className="py-3.5 px-3 font-semibold text-[#1f1f1f]">
                        {o.code}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-[#1f1f1f]">
                        {o.title}
                      </td>
                      <td className="py-3.5 px-3 text-[#5c5c5c]">
                        {o.programme}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-[#5c5c5c] font-medium">
                          {o.mode}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col gap-1 w-24">
                          <div className="w-full bg-[#e5e5e5] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                pct >= 100
                                  ? 'bg-[#dc2626]'
                                  : pct >= 80
                                  ? 'bg-[#046aff]'
                                  : 'bg-[#16a34a]'
                              }`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-[#808080] font-medium">
                            {o.enrolled}/{o.capacity} ({pct}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        {isUnassigned ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#fee2e2] text-[#b91c1c]">
                            Unassigned
                          </span>
                        ) : (
                          <span className="font-medium text-[#1f1f1f]">
                            {o.instructor}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <StatusTag label={o.statusLabel} variant={o.status} />
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => onEditOffering(o.code)}
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
            <span>Showing 1 to 5 of 48 section offerings</span>
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
