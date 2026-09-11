'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Plus,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Users,
  CheckCircle2,
  Video,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Virtual';
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string;
  endTime: string;
  startHour: number; // e.g. 8 for 8:00
  durationHours: number; // e.g. 2 for 2 hours
  venue: string;
  instructor: string;
  cohort: string;
  hasConflict?: boolean;
  conflictDetails?: string;
}

interface TimetableGridProps {
  onScheduleMeeting: () => void;
  onAddException: () => void;
  onViewValidation: () => void;
  onViewImpact: () => void;
}

export function TimetableGrid({
  onScheduleMeeting,
  onAddException,
  onViewValidation,
  onViewImpact,
}: TimetableGridProps) {
  const [viewMode, setViewMode] = useState<'week' | 'day' | 'list'>('week');
  const [selectedDept, setSelectedDept] = useState('Computer Science');
  const [selectedLevel, setSelectedLevel] = useState('300L');
  const [searchQuery, setSearchQuery] = useState('');

  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const slots: TimetableSlot[] = [
    {
      id: 'slot-1',
      courseCode: 'CSC 301',
      courseTitle: 'Operating Systems & Concurrency',
      type: 'Lecture',
      day: 'Mon',
      startTime: '09:00',
      endTime: '11:00',
      startHour: 9,
      durationHours: 2,
      venue: 'Hall G-201',
      instructor: 'Dr. Okafor',
      cohort: 'CSC 300L (124)',
    },
    {
      id: 'slot-2',
      courseCode: 'CSC 305',
      courseTitle: 'Database Systems Architecture',
      type: 'Lecture',
      day: 'Mon',
      startTime: '13:00',
      endTime: '15:00',
      startHour: 13,
      durationHours: 2,
      venue: 'Hall G-201',
      instructor: 'Prof. Bello',
      cohort: 'CSC 300L (124)',
    },
    {
      id: 'slot-3',
      courseCode: 'MTH 301',
      courseTitle: 'Numerical Analysis I',
      type: 'Lecture',
      day: 'Tue',
      startTime: '10:00',
      endTime: '12:00',
      startHour: 10,
      durationHours: 2,
      venue: 'Hall S-102',
      instructor: 'Dr. Adeleke',
      cohort: 'CSC/MTH 300L (160)',
    },
    {
      id: 'slot-4',
      courseCode: 'CSC 307',
      courseTitle: 'Web Application Development',
      type: 'Virtual',
      day: 'Tue',
      startTime: '14:00',
      endTime: '16:00',
      startHour: 14,
      durationHours: 2,
      venue: 'Zoom Main Hall Alpha',
      instructor: 'Engr. Davies',
      cohort: 'CSC 300L (124)',
    },
    // Wednesday Conflict: MTH 302 and CSC 312 both scheduled in Hall S-102 at 11:00!
    {
      id: 'slot-5-conflict-a',
      courseCode: 'CSC 312',
      courseTitle: 'Computer Graphics & Shader Prog.',
      type: 'Lecture',
      day: 'Wed',
      startTime: '11:00',
      endTime: '13:00',
      startHour: 11,
      durationHours: 2,
      venue: 'Hall S-102',
      instructor: 'Dr. Okafor',
      cohort: 'CSC 300L (85)',
      hasConflict: true,
      conflictDetails: 'Double-booked with MTH 302 in Hall S-102',
    },
    {
      id: 'slot-5-conflict-b',
      courseCode: 'MTH 302',
      courseTitle: 'Abstract Algebra II',
      type: 'Lecture',
      day: 'Wed',
      startTime: '11:00',
      endTime: '13:00',
      startHour: 11,
      durationHours: 2,
      venue: 'Hall S-102',
      instructor: 'Prof. Adebayo',
      cohort: 'MTH 300L (42)',
      hasConflict: true,
      conflictDetails: 'Double-booked with CSC 312 in Hall S-102',
    },
    {
      id: 'slot-6',
      courseCode: 'CSC 301-LAB',
      courseTitle: 'OS Lab Group A',
      type: 'Lab',
      day: 'Thu',
      startTime: '09:00',
      endTime: '12:00',
      startHour: 9,
      durationHours: 3,
      venue: 'Computing Lab L-304',
      instructor: 'Dr. Okafor / Tech Team',
      cohort: 'CSC 300L - Grp A (60)',
    },
    {
      id: 'slot-7',
      courseCode: 'CSC 315',
      courseTitle: 'Artificial Intelligence & Neural Nets',
      type: 'Lecture',
      day: 'Thu',
      startTime: '14:00',
      endTime: '16:00',
      startHour: 14,
      durationHours: 2,
      venue: 'Amphitheater A',
      instructor: 'Prof. Bello',
      cohort: 'CSC 300L (124)',
    },
    {
      id: 'slot-8',
      courseCode: 'CSC 399',
      courseTitle: 'Junior Research Seminar',
      type: 'Tutorial',
      day: 'Fri',
      startTime: '10:00',
      endTime: '12:00',
      startHour: 10,
      durationHours: 2,
      venue: 'Auditorium 1',
      instructor: 'Dean Alabi / Faculty',
      cohort: 'CSC 300L (124)',
    },
  ];

  const getTypeStyle = (type: TimetableSlot['type'], hasConflict?: boolean) => {
    if (hasConflict) {
      return 'bg-rose-50 border-rose-300 text-rose-900 shadow-sm ring-2 ring-rose-500/40';
    }
    switch (type) {
      case 'Lecture':
        return 'bg-[#f0f8ff]/90 border-[#046aff]/30 text-[#1f1f1f] hover:border-[#046aff]';
      case 'Lab':
        return 'bg-purple-50/90 border-purple-300 text-purple-950 hover:border-purple-500';
      case 'Tutorial':
        return 'bg-amber-50/90 border-amber-300 text-amber-950 hover:border-amber-500';
      case 'Virtual':
        return 'bg-blue-50/90 border-blue-300 text-blue-950 hover:border-blue-500';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner Alert when conflicts exist */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-rose-900">
              Double-Booking Detected: Hall S-102 (Wed 11:00 - 13:00)
            </div>
            <div className="text-xs text-rose-700 mt-0.5">
              CSC 312 (Dr. Okafor) and MTH 302 (Prof. Adebayo) are booked in the same room.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewValidation}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          >
            Resolve Conflicts (aps-20)
          </button>
          <button
            onClick={onViewImpact}
            className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
          >
            Impact Review (aps-22)
          </button>
        </div>
      </div>

      {/* Control Header & Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Week Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button className="p-1 hover:bg-white rounded text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#046aff]" />
                Week 4 (Oct 12 – Oct 16, 2026)
              </div>
              <button className="p-1 hover:bg-white rounded text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button className="px-2.5 py-1 text-xs font-semibold text-[#046aff] hover:bg-[#f0f8ff] rounded-md transition-colors">
              Today
            </button>
          </div>

          {/* View Mode Toggle & Primary Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
            </div>

            <button
              onClick={onAddException}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-lg transition-all"
            >
              + Add Exception (aps-19)
            </button>
          </div>
        </div>

        {/* Filter Sub-bar */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 font-medium text-gray-700"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 font-medium text-gray-700"
              >
                <option value="100L">100 Level</option>
                <option value="200L">200 Level</option>
                <option value="300L">300 Level</option>
                <option value="400L">400 Level</option>
                <option value="500L">500 Level</option>
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter course, room, lecturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#046aff]"
              />
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-3 font-medium text-[11px] text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0f8ff]0" /> Lecture
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Lab
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Tutorial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Virtual Sync
            </span>
            <span className="flex items-center gap-1 font-bold text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Conflict
            </span>
          </div>
        </div>
      </div>

      {/* Timetable Weekly Matrix Grid */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Day Headers */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-gray-200 bg-gray-50/70 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <div className="p-3 text-center border-r border-gray-200 text-gray-400">Time</div>
            <div className="p-3 text-center border-r border-gray-200">
              Mon <span className="font-normal text-gray-500">Oct 12</span>
            </div>
            <div className="p-3 text-center border-r border-gray-200">
              Tue <span className="font-normal text-gray-500">Oct 13</span>
            </div>
            <div className="p-3 text-center border-r border-gray-200 bg-rose-50/50 text-rose-900">
              Wed <span className="font-normal text-rose-600">Oct 14</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-200 text-rose-800">
                1 clash
              </span>
            </div>
            <div className="p-3 text-center border-r border-gray-200">
              Thu <span className="font-normal text-gray-500">Oct 15</span>
            </div>
            <div className="p-3 text-center">
              Fri <span className="font-normal text-gray-500">Oct 16</span>
            </div>
          </div>

          {/* Time Rows & Slots */}
          <div className="divide-y divide-gray-100">
            {hours.map((hour) => {
              const timeLabel = `${hour.toString().padStart(2, '0')}:00`;

              return (
                <div key={hour} className="grid grid-cols-[80px_repeat(5,1fr)] min-h-[96px]">
                  {/* Time label */}
                  <div className="p-2.5 text-center border-r border-gray-100 text-xs font-mono font-semibold text-gray-500 bg-gray-50/40">
                    {timeLabel}
                  </div>

                  {/* 5 Day Cells */}
                  {days.map((day) => {
                    const daySlots = slots.filter(
                      (s) => s.day === day && s.startHour === hour
                    );

                    return (
                      <div
                        key={day}
                        className={`p-1.5 border-r last:border-r-0 border-gray-100 relative group/cell hover:bg-gray-50/40 transition-colors ${
                          day === 'Wed' && hour === 11 ? 'bg-rose-50/30' : ''
                        }`}
                      >
                        {daySlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`p-2.5 rounded-lg border text-xs transition-all shadow-sm ${getTypeStyle(
                              slot.type,
                              slot.hasConflict
                            )} mb-1`}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span className="font-black tracking-tight">{slot.courseCode}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/80 border border-black/5">
                                {slot.type}
                              </span>
                            </div>

                            <div className="font-medium text-[11px] leading-tight line-clamp-1 mb-1.5">
                              {slot.courseTitle}
                            </div>

                            <div className="space-y-0.5 text-[10px] opacity-90">
                              <div className="flex items-center gap-1 font-semibold">
                                <Clock className="w-3 h-3 shrink-0" />
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 shrink-0" />
                                {slot.venue}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 shrink-0" />
                                {slot.instructor}
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-mono text-gray-600">
                                <Users className="w-2.5 h-2.5 shrink-0" />
                                {slot.cohort}
                              </div>
                            </div>

                            {slot.hasConflict && (
                              <div className="mt-2 pt-1.5 border-t border-rose-200 text-[10px] font-bold text-rose-700 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                                {slot.conflictDetails}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
