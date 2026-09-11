'use client';

import React, { useState } from 'react';
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Building2,
  GraduationCap,
  Layers,
  Menu,
} from 'lucide-react';
import { StatusTag, type StatusTagVariant } from '@/features/planning-home/components/status-tag';

interface StructuresTreeProps {
  onAddStructure: () => void;
  onSelectProgramme: (programmeName: string) => void;
  onEditStructure: (name: string) => void;
  onOpenMobileMenu?: () => void;
}

interface TreeNode {
  id: string;
  name: string;
  code: string;
  type: 'faculty' | 'department' | 'programme';
  status: string;
  statusVariant: StatusTagVariant;
  effectiveDate: string;
  children?: TreeNode[];
}

const initialTreeData: TreeNode[] = [
  {
    id: 'fsci',
    name: 'Faculty of Science',
    code: 'FSCI',
    type: 'faculty',
    status: 'Published',
    statusVariant: 'published',
    effectiveDate: '01 Sep 2026',
    children: [
      {
        id: 'dept-csci',
        name: 'Department of Computer Science',
        code: 'CSCI',
        type: 'department',
        status: 'Published',
        statusVariant: 'published',
        effectiveDate: '01 Sep 2026',
        children: [
          {
            id: 'prog-bcsci',
            name: 'BSc Computer Science',
            code: 'B-CSCI',
            type: 'programme',
            status: 'In Review',
            statusVariant: 'in-review',
            effectiveDate: '01 Sep 2026',
          },
          {
            id: 'prog-msc-csci',
            name: 'MSc Computer Science',
            code: 'M-CSCI',
            type: 'programme',
            status: 'Published',
            statusVariant: 'published',
            effectiveDate: '01 Sep 2026',
          },
        ],
      },
      {
        id: 'dept-mth',
        name: 'Department of Mathematics',
        code: 'MATH',
        type: 'department',
        status: 'Published',
        statusVariant: 'published',
        effectiveDate: '01 Sep 2026',
        children: [
          {
            id: 'prog-bmth',
            name: 'BSc Mathematics & Statistics',
            code: 'B-MATH',
            type: 'programme',
            status: 'Published',
            statusVariant: 'published',
            effectiveDate: '01 Sep 2026',
          },
        ],
      },
    ],
  },
  {
    id: 'fart',
    name: 'Faculty of Arts & Humanities',
    code: 'FART',
    type: 'faculty',
    status: 'Published',
    statusVariant: 'published',
    effectiveDate: '01 Sep 2026',
    children: [
      {
        id: 'dept-eng',
        name: 'Department of English & Literature',
        code: 'ENGL',
        type: 'department',
        status: 'Published',
        statusVariant: 'published',
        effectiveDate: '01 Sep 2026',
        children: [
          {
            id: 'prog-beng',
            name: 'BA English Literature',
            code: 'B-ENGL',
            type: 'programme',
            status: 'Draft Required',
            statusVariant: 'draft-required',
            effectiveDate: '01 Sep 2026',
          },
        ],
      },
    ],
  },
];

export function StructuresTree({
  onAddStructure,
  onSelectProgramme,
  onEditStructure,
  onOpenMobileMenu,
}: StructuresTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    fsci: true,
    'dept-csci': true,
    fart: false,
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              <span className="text-[12px] font-medium text-[#808080]">Academic Structures</span>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                ODEL Structure Tree
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={onAddStructure}
          className="inline-flex items-center justify-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Structure</span>
        </button>
      </div>

      {/* ── Summary Cards Row (4 cards) ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[84px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Total Faculties
          </span>
          <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">4</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[84px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Departments
          </span>
          <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">18</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[84px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Programmes
          </span>
          <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">32</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[84px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Pending Changes
          </span>
          <span className="text-[24px] font-bold text-[#046aff] leading-none">2 Drafts</span>
        </div>
      </div>

      {/* ── Tree Section Card ──────────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-4 sm:p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 overflow-x-auto w-full">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#f5f5f5] text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080] min-w-[720px]">
          <div className="col-span-5 pl-2">Structure Node Name</div>
          <div className="col-span-2">Code</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Effective Dates</div>
          <div className="col-span-1 text-right pr-2">Actions</div>
        </div>

        {/* Tree Rows */}
        <div className="flex flex-col gap-1 min-w-[720px]">
          {initialTreeData.map((faculty) => {
            const facultyOpen = expandedNodes[faculty.id] ?? false;

            return (
              <React.Fragment key={faculty.id}>
                {/* Faculty Row */}
                <div className="grid grid-cols-12 gap-4 items-center p-2.5 rounded-lg bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors">
                  <div className="col-span-5 flex items-center gap-2">
                    <button
                      onClick={() => toggleExpand(faculty.id)}
                      className="p-1 rounded text-[#808080] hover:text-[#1f1f1f] cursor-pointer"
                    >
                      {facultyOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <Layers className="w-4 h-4 text-[#046aff] shrink-0" />
                    <span className="text-[14px] font-bold text-[#0b0b0b]">{faculty.name}</span>
                  </div>
                  <div className="col-span-2 text-[13px] font-medium text-[#5c5c5c]">
                    {faculty.code}
                  </div>
                  <div className="col-span-2">
                    <StatusTag label={faculty.status} variant={faculty.statusVariant} />
                  </div>
                  <div className="col-span-2 text-[13px] text-[#5c5c5c]">
                    {faculty.effectiveDate}
                  </div>
                  <div className="col-span-1 text-right pr-2">
                    <button
                      onClick={() => onEditStructure(faculty.name)}
                      className="text-[13px] text-[#046aff] font-medium hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Departments */}
                {facultyOpen &&
                  faculty.children?.map((dept) => {
                    const deptOpen = expandedNodes[dept.id] ?? false;

                    return (
                      <React.Fragment key={dept.id}>
                        {/* Dept Row */}
                        <div className="grid grid-cols-12 gap-4 items-center p-2.5 rounded-lg hover:bg-[#fafafa] transition-colors pl-8">
                          <div className="col-span-5 flex items-center gap-2">
                            <button
                              onClick={() => toggleExpand(dept.id)}
                              className="p-1 rounded text-[#808080] hover:text-[#1f1f1f] cursor-pointer"
                            >
                              {deptOpen ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            <Building2 className="w-4 h-4 text-[#5c5c5c] shrink-0" />
                            <span className="text-[14px] font-medium text-[#1f1f1f]">
                              {dept.name}
                            </span>
                          </div>
                          <div className="col-span-2 text-[13px] font-medium text-[#5c5c5c]">
                            {dept.code}
                          </div>
                          <div className="col-span-2">
                            <StatusTag label={dept.status} variant={dept.statusVariant} />
                          </div>
                          <div className="col-span-2 text-[13px] text-[#5c5c5c]">
                            {dept.effectiveDate}
                          </div>
                          <div className="col-span-1 text-right pr-2">
                            <button
                              onClick={() => onEditStructure(dept.name)}
                              className="text-[13px] text-[#046aff] font-medium hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Programmes */}
                        {deptOpen &&
                          dept.children?.map((prog) => (
                            <div
                              key={prog.id}
                              className="grid grid-cols-12 gap-4 items-center p-2.5 rounded-lg hover:bg-[#f0f8ff]/50 transition-colors pl-16 group"
                            >
                              <div className="col-span-5 flex items-center gap-2">
                                <ChevronRight className="w-4 h-4 text-[#808080] group-hover:text-[#046aff] transition-colors" />
                                <GraduationCap className="w-4 h-4 text-[#046aff] shrink-0" />
                                <button
                                  onClick={() => onSelectProgramme(prog.name)}
                                  className="text-[14px] font-semibold text-[#046aff] hover:underline cursor-pointer text-left"
                                >
                                  {prog.name}
                                </button>
                              </div>
                              <div className="col-span-2 text-[13px] font-medium text-[#5c5c5c]">
                                {prog.code}
                              </div>
                              <div className="col-span-2">
                                <StatusTag label={prog.status} variant={prog.statusVariant} />
                              </div>
                              <div className="col-span-2 text-[13px] text-[#5c5c5c]">
                                {prog.effectiveDate}
                              </div>
                              <div className="col-span-1 text-right pr-2">
                                <button
                                  onClick={() => onEditStructure(prog.name)}
                                  className="text-[13px] text-[#046aff] font-medium hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          ))}
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
