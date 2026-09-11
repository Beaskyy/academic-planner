'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  Search,
  Filter,
  Check,
  ArrowLeft,
  User,
  Menu,
} from 'lucide-react';

export interface StaffMember {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  coursesCount: number;
  workloadStatus: 'Light' | 'Medium' | 'Max Load' | 'Overload';
  availability: 'Available' | 'Partially Available' | 'Unavailable';
  specializations: string[];
  assignments: string[];
}

interface StaffSearchModalProps {
  onSelectStaff: (staff: StaffMember) => void;
  onCancel: () => void;
  onOpenMobileMenu?: () => void;
}

export function StaffSearchModal({
  onSelectStaff,
  onCancel,
  onOpenMobileMenu,
}: StaffSearchModalProps) {
  const staffList: StaffMember[] = [
    {
      id: 'staff-1',
      name: 'Dr. Charles Ononiwu',
      roleTitle: 'Assistant Professor',
      department: 'Computer Science',
      coursesCount: 2,
      workloadStatus: 'Medium',
      availability: 'Available',
      specializations: ['Software Eng', 'Distributed Sys'],
      assignments: [
        'CSC 311-A (Algorithm Analysis)',
        'CSC 410-A (Parallel Computing)',
      ],
    },
    {
      id: 'staff-2',
      name: 'Prof. Grace Hopper',
      roleTitle: 'Full Professor',
      department: 'Computer Science',
      coursesCount: 3,
      workloadStatus: 'Max Load',
      availability: 'Unavailable',
      specializations: ['Compilers', 'Security'],
      assignments: [
        'CSC 101-A (Intro Programming)',
        'CSC 420-A (Compiler Design)',
        'CSC 499-A (Senior Project)',
      ],
    },
    {
      id: 'staff-3',
      name: 'Dr. Alan Turing',
      roleTitle: 'Associate Professor',
      department: 'Computer Science',
      coursesCount: 1,
      workloadStatus: 'Light',
      availability: 'Partially Available',
      specializations: ['Algorithms', 'AI/ML'],
      assignments: ['CSC 312-A (Database Systems)'],
    },
    {
      id: 'staff-4',
      name: 'Dr. Ada Lovelace',
      roleTitle: 'Senior Lecturer',
      department: 'Mathematics',
      coursesCount: 1,
      workloadStatus: 'Light',
      availability: 'Available',
      specializations: ['Applied Math', 'Cryptography'],
      assignments: ['MTH 302-A (Abstract Algebra)'],
    },
    {
      id: 'staff-5',
      name: 'Prof. Richard Feynman',
      roleTitle: 'Visiting Professor',
      department: 'Physics',
      coursesCount: 4,
      workloadStatus: 'Overload',
      availability: 'Unavailable',
      specializations: ['Quantum Comp'],
      assignments: [
        'PHY 201-A (Classical Mechanics)',
        'PHY 301-A (Electrodynamics)',
        'PHY 401-A (Quantum Physics)',
        'PHY 402-A (Statistical Physics)',
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedAvail, setSelectedAvail] = useState('All');
  const [activeProfile, setActiveProfile] = useState<StaffMember>(staffList[0]);

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specializations.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesDept =
      selectedDept === 'All' || s.department === selectedDept;
    const matchesAvail =
      selectedAvail === 'All' || s.availability === selectedAvail;
    return matchesSearch && matchesDept && matchesAvail;
  });

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
            <span className="text-[#1f1f1f] font-semibold">Staffing</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
            Assign Teaching Staff
          </h1>
        </div>

        <button
          onClick={onCancel}
          className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-center"
        >
          <ArrowLeft className="w-4 h-4 text-[#5c5c5c]" />
          <span>Back to Offering</span>
        </button>
      </header>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
        {/* Search Controls */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-wrap items-center gap-4 shadow-xs">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-[#808080] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or specialization tags..."
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] pl-10 pr-3.5 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="All">Dept: All Departments</option>
              <option value="Computer Science">Dept: Computer Science</option>
              <option value="Mathematics">Dept: Mathematics</option>
              <option value="Physics">Dept: Physics</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="relative min-w-[180px]">
            <select
              value={selectedAvail}
              onChange={(e) => setSelectedAvail(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="All">Availability: All</option>
              <option value="Available">Availability: Available</option>
              <option value="Partially Available">Availability: Partially Available</option>
              <option value="Unavailable">Availability: Unavailable</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>
        </div>

        {/* 2-Column Results Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Results Table */}
          <div className="lg:col-span-8 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#f0f0f0] text-[11px] font-bold text-[#808080] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Name / Department</th>
                    <th className="py-2.5 px-3">Current Workload</th>
                    <th className="py-2.5 px-3">Availability</th>
                    <th className="py-2.5 px-3">Specialization</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                  {filteredStaff.map((s) => {
                    const isSelected = activeProfile.id === s.id;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setActiveProfile(s)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#f0f8ff]/60' : 'hover:bg-[#fafafa]'
                        }`}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#046aff] flex items-center justify-center font-bold text-xs shrink-0">
                              {s.name
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#1f1f1f]">
                                {s.name}
                              </span>
                              <span className="text-xs text-[#808080]">
                                {s.department}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-col gap-1 w-24">
                            <div className="w-full bg-[#e5e5e5] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  s.coursesCount >= 4
                                    ? 'bg-[#dc2626]'
                                    : s.coursesCount === 3
                                    ? 'bg-[#d97706]'
                                    : 'bg-[#16a34a]'
                                }`}
                                style={{
                                  width: `${Math.min((s.coursesCount / 4) * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-[11px] text-[#808080]">
                              {s.coursesCount} Courses ({s.workloadStatus})
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              s.availability === 'Available'
                                ? 'bg-[#dcfce7] text-[#15803d]'
                                : s.availability === 'Partially Available'
                                ? 'bg-[#fef3c7] text-[#b45309]'
                                : 'bg-[#fee2e2] text-[#b91c1c]'
                            }`}
                          >
                            {s.availability}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {s.specializations.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-[6px] bg-[#f5f5f5] text-[#5c5c5c] text-[11px] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectStaff(s);
                            }}
                            className="px-3 py-1 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[6px] text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Selected Profile Info Card */}
          <div className="lg:col-span-4 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4 sticky top-6">
            <div className="flex flex-col items-center text-center gap-2 pb-4 border-b border-[#f5f5f5]">
              <div className="w-16 h-16 rounded-full bg-[#dbeafe] text-[#046aff] flex items-center justify-center font-bold text-xl">
                {activeProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                  {activeProfile.name}
                </h3>
                <span className="text-xs text-[#808080]">
                  {activeProfile.roleTitle} • {activeProfile.department}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                Current Assignments Sem 1
              </span>
              <div className="flex flex-col gap-1.5">
                {activeProfile.assignments.map((ass, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-[8px] bg-[#fafafa] border border-[#ebebeb] text-[12px] font-medium text-[#1f1f1f]"
                  >
                    • {ass}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectStaff(activeProfile)}
              className="w-full py-2.5 bg-[#046aff] hover:bg-[#0356d6] text-white rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs mt-2"
            >
              <Check className="w-4 h-4" />
              <span>Assign {activeProfile.name.split(' ')[1] || activeProfile.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
