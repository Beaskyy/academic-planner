'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  Filter,
  Plus,
  Edit3,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  Menu,
} from 'lucide-react';
import { StatusTag } from '@/features/planning-home/components/status-tag';

interface CurriculaBrowserProps {
  onRevise: () => void;
  onNewCurriculum?: () => void;
  onSelectRulesTab: () => void;
  onOpenMobileMenu?: () => void;
}

export function CurriculaBrowser({
  onRevise,
  onNewCurriculum,
  onSelectRulesTab,
  onOpenMobileMenu,
}: CurriculaBrowserProps) {
  const [selectedProgramme, setSelectedProgramme] = useState('BSc Computer Science');
  const [selectedCohort, setSelectedCohort] = useState('2026/2027');

  const courseMappings = [
    {
      code: 'CSC 301',
      title: 'Software Engineering Methodologies',
      role: 'Required',
      contribution: 'Core Computer Science Requirements',
      group: 'None',
    },
    {
      code: 'CSC 305',
      title: 'Database Management Systems',
      role: 'Required',
      contribution: 'Core Computer Science Requirements',
      group: 'None',
    },
    {
      code: 'CSC 310',
      title: 'Distributed Systems & Cloud',
      role: 'Elective',
      contribution: 'Advanced Software Track Elective',
      group: 'Group A',
    },
    {
      code: 'MTH 302',
      title: 'Numerical Analysis',
      role: 'Required',
      contribution: 'Mathematics Foundations',
      group: 'None',
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
            <span className="text-[#1f1f1f] font-semibold">Curricula &amp; Rules</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Curricula &amp; Rules
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRevise}
            className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-[#5c5c5c]" />
            <span>Revise</span>
          </button>
          <button
            onClick={onNewCurriculum || onRevise}
            className="px-4 py-2 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Curriculum</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 sm:px-8 bg-white border-b border-[#ebebeb] flex items-center gap-8">
        <button className="py-3 text-[14px] font-semibold text-[#046aff] border-b-2 border-[#046aff] relative -mb-[1px]">
          Curricula
        </button>
        <button
          onClick={onSelectRulesTab}
          className="py-3 text-[14px] font-medium text-[#5c5c5c] hover:text-[#1f1f1f] transition-colors cursor-pointer"
        >
          Academic Rules
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* Filters Bar */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-wrap items-center gap-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#808080] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <div className="relative min-w-[260px]">
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="BSc Computer Science">Programme: BSc Computer Science</option>
              <option value="BSc Software Engineering">Programme: BSc Software Engineering</option>
              <option value="BSc Data Science">Programme: BSc Data Science</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="relative min-w-[180px]">
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="2026/2027">Cohort: 2026/2027</option>
              <option value="2025/2026">Cohort: 2025/2026</option>
              <option value="2024/2025">Cohort: 2024/2025</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>
        </div>

        {/* Programme Overview Card */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f5f5f5]">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[18px] font-bold text-[#1f1f1f]">
                  BSc Computer Science Curriculum
                </h2>
                <StatusTag label="PUBLISHED" variant="published" />
              </div>
              <p className="text-[13px] text-[#808080] font-medium mt-1">
                Current Version: v2.0 (Published)
              </p>
            </div>
            <button
              onClick={onRevise}
              className="text-xs font-semibold text-[#046aff] hover:underline flex items-center gap-1 self-start sm:self-center"
            >
              <span>Edit / Revise Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Degree Level
              </span>
              <span className="text-[15px] font-semibold text-[#1f1f1f]">
                Undergraduate (BSc)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Total Credits Required
              </span>
              <span className="text-[15px] font-semibold text-[#1f1f1f]">
                120 Credits
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Duration
              </span>
              <span className="text-[15px] font-semibold text-[#1f1f1f]">
                4 Years
              </span>
            </div>
          </div>
        </div>

        {/* Course Mapping Section */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#1f1f1f]">
              Course Mapping (Semester 1 - Year 3)
            </h3>
            <span className="text-xs text-[#808080] font-medium">
              4 Courses active in this period
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                  <th className="py-3 px-3">Course Code</th>
                  <th className="py-3 px-3">Course Title</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Credit Contribution</th>
                  <th className="py-3 px-3">Elective Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                {courseMappings.map((c, i) => (
                  <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#1f1f1f]">
                      {c.code}
                    </td>
                    <td className="py-3.5 px-3 text-[#1f1f1f] font-medium">
                      {c.title}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          c.role === 'Required'
                            ? 'bg-[#eef4ff] text-[#046aff] border border-[#d2e4ff]'
                            : 'bg-[#faf5ff] text-[#7e22ce] border border-[#e9d5ff]'
                        }`}
                      >
                        {c.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#5c5c5c]">
                      {c.contribution}
                    </td>
                    <td className="py-3.5 px-3 text-[#5c5c5c]">
                      {c.group}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
