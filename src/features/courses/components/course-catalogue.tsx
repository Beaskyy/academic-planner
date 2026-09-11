'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { StatusTag, type StatusTagVariant } from '@/features/planning-home/components/status-tag';

interface CourseCatalogueProps {
  onAddCourse: () => void;
  onEditCourse: (courseCode: string) => void;
  onOpenMobileMenu?: () => void;
}

interface CourseItem {
  code: string;
  title: string;
  credits: string;
  department: string;
  deliveryMode: string;
  status: string;
  statusVariant: StatusTagVariant;
}

const coursesData: CourseItem[] = [
  {
    code: 'CSC 101',
    title: 'Introduction to Computer Science',
    credits: '3 Credits',
    department: 'Computer Science',
    deliveryMode: 'Hybrid',
    status: 'Published',
    statusVariant: 'published',
  },
  {
    code: 'CSC 201',
    title: 'Data Structures & Algorithms',
    credits: '4 Credits',
    department: 'Computer Science',
    deliveryMode: 'In-person',
    status: 'Published',
    statusVariant: 'published',
  },
  {
    code: 'CSC 301',
    title: 'Software Engineering Methodologies',
    credits: '4 Credits',
    department: 'Computer Science',
    deliveryMode: 'In-person',
    status: 'In Review',
    statusVariant: 'in-review',
  },
  {
    code: 'MTH 102',
    title: 'Linear Algebra & Calculus',
    credits: '3 Credits',
    department: 'Mathematics',
    deliveryMode: 'Online',
    status: 'Published',
    statusVariant: 'published',
  },
  {
    code: 'PHY 105',
    title: 'General Physics I',
    credits: '4 Credits',
    department: 'Physics',
    deliveryMode: 'Hybrid',
    status: 'Published',
    statusVariant: 'published',
  },
];

export function CourseCatalogue({
  onAddCourse,
  onEditCourse,
  onOpenMobileMenu,
}: CourseCatalogueProps) {
  const [selectedDept, setSelectedDept] = useState('Computer Science');
  const [selectedLevel, setSelectedLevel] = useState('300 Level');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

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
                Academic Planning &gt; Course Catalogue
              </span>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
                Course Catalogue
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={onAddCourse}
          className="inline-flex items-center justify-center gap-1.5 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none self-start sm:self-auto"
        >
          <span>Add Course</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Summary Cards Row (4 cards) ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Total Courses
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">142</span>
            <StatusTag label="All Curricula" variant="draft" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Published
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">118</span>
            <StatusTag label="Active" variant="published" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Drafts
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">14</span>
            <StatusTag label="In Progress" variant="in-progress" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] h-[100px] flex flex-col justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080]">
            Pending Review
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-bold text-[#0b0b0b] leading-none">10</span>
            <StatusTag label="Needs Action" variant="action-req" />
          </div>
        </div>
      </div>

      {/* ── Filters Bar ────────────────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[14px] p-3 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-wrap items-center gap-3">
        {/* Dept Filter */}
        <div className="relative">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="h-8 pl-3 pr-8 rounded-[8px] bg-[#fafafa] hover:bg-[#f5f5f5] border border-[#ebebeb] text-[13px] font-medium text-[#1f1f1f] outline-none appearance-none cursor-pointer"
          >
            <option value="All Departments">Dept: All</option>
            <option value="Computer Science">Dept: Computer Science</option>
            <option value="Mathematics">Dept: Mathematics</option>
            <option value="Physics">Dept: Physics</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Level Filter */}
        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="h-8 pl-3 pr-8 rounded-[8px] bg-[#fafafa] hover:bg-[#f5f5f5] border border-[#ebebeb] text-[13px] font-medium text-[#1f1f1f] outline-none appearance-none cursor-pointer"
          >
            <option value="All Levels">Level: All</option>
            <option value="100 Level">Level: 100 Level</option>
            <option value="200 Level">Level: 200 Level</option>
            <option value="300 Level">Level: 300 Level</option>
            <option value="400 Level">Level: 400 Level</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-8 pl-3 pr-8 rounded-[8px] bg-[#fafafa] hover:bg-[#f5f5f5] border border-[#ebebeb] text-[13px] font-medium text-[#1f1f1f] outline-none appearance-none cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Published">Status: Published</option>
            <option value="In Review">Status: In Review</option>
            <option value="Draft">Status: Draft</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-4 sm:p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] flex flex-col gap-4 overflow-x-auto w-full">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-3 pb-3 border-b border-[#f5f5f5] text-[12px] font-medium uppercase tracking-[0.5px] text-[#808080] min-w-[760px]">
          <div className="col-span-2 pl-2">Course Code</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-1.5">Credits</div>
          <div className="col-span-2.5">Department</div>
          <div className="col-span-1.5">Delivery Mode</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-0.5 text-right pr-2">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col divide-y divide-[#f5f5f5] min-w-[760px]">
          {coursesData.map((course) => (
            <div
              key={course.code}
              className="grid grid-cols-12 gap-3 items-center py-3.5 hover:bg-[#fafafa] transition-colors rounded-lg px-2"
            >
              <div className="col-span-2 font-bold text-[14px] text-[#0b0b0b]">
                {course.code}
              </div>
              <div className="col-span-3 font-medium text-[13px] text-[#1f1f1f] truncate">
                {course.title}
              </div>
              <div className="col-span-1.5 text-[13px] text-[#5c5c5c]">
                {course.credits}
              </div>
              <div className="col-span-2.5 text-[13px] text-[#5c5c5c]">
                {course.department}
              </div>
              <div className="col-span-1.5 text-[13px] text-[#5c5c5c]">
                {course.deliveryMode}
              </div>
              <div className="col-span-1">
                <StatusTag label={course.status} variant={course.statusVariant} />
              </div>
              <div className="col-span-0.5 text-right pr-2">
                <button
                  onClick={() => onEditCourse(course.code)}
                  className="text-[13px] font-semibold text-[#046aff] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f5] text-[13px] text-[#808080]">
          <span>Showing 1 to 5 of 142 courses</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-[6px] flex items-center justify-center font-medium transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#046aff] text-white'
                    : 'bg-[#fafafa] hover:bg-[#f0f0f0] text-[#1f1f1f]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
