'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  User,
  MapPin,
  Clock,
  Users,
  ShieldAlert,
  Sparkles,
  Filter,
  Check,
  Building,
} from 'lucide-react';

interface ScheduleValidationProps {
  onOpenOverride?: () => void;
  onOpenImpact?: () => void;
  onBackToTimetable: () => void;
}

export function ScheduleValidation({
  onOpenOverride,
  onOpenImpact,
  onBackToTimetable,
}: ScheduleValidationProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'hard' | 'warning' | 'passed'>('all');
  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([]);

  const handleResolve = (id: string) => {
    setResolvedConflicts([...resolvedConflicts, id]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900">
              Automated Schedule Validation Report
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              3 Blockers Found
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time constraint engine analysis of room capacity, instructor workload, and collision checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-run Engine
          </button>
          {onOpenImpact && (
            <button
              type="button"
              onClick={onOpenImpact}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#335cff] hover:bg-[#1a45e8] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              View Impact Assessment (aps-22) →
            </button>
          )}
        </div>
      </div>

      {/* 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setFilterTab('hard')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            filterTab === 'hard'
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/30'
              : 'bg-white border-gray-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Hard Conflicts
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
          </div>
          <div className="text-2xl font-black text-rose-900 mt-2">
            {3 - resolvedConflicts.length} Active
          </div>
          <p className="text-xs text-rose-700 mt-1">
            Blocks publishing. Room double-bookings & instructor overlaps.
          </p>
        </div>

        <div
          onClick={() => setFilterTab('warning')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            filterTab === 'warning'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/30'
              : 'bg-white border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Warnings & Violations
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
              5
            </div>
          </div>
          <div className="text-2xl font-black text-amber-900 mt-2">5 Flagged</div>
          <p className="text-xs text-amber-700 mt-1">
            Room capacity deficit, heavy consecutive student slots.
          </p>
        </div>

        <div
          onClick={() => setFilterTab('passed')}
          className={`p-5 rounded-xl border cursor-pointer transition-all ${
            filterTab === 'passed'
              ? 'bg-[#f5fff6] border-[#b8f5be] ring-2 ring-[#21bf2b]/30'
              : 'bg-white border-gray-200 hover:border-[#b8f5be]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#21bf2b]">
              Passed Checks
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#f5fff6] text-[#21bf2b] flex items-center justify-center font-bold text-sm">
              142
            </div>
          </div>
          <div className="text-2xl font-black text-[#21bf2b] mt-2">142 Slots Valid</div>
          <p className="text-xs text-[#21bf2b] mt-1">
            100% compliant with room capacities, faculty availability & rules.
          </p>
        </div>
      </div>

      {/* Conflict Items List */}
      <div className="space-y-4">
        {/* Conflict Card 1: Room Double-Booking */}
        <div
          className={`bg-white rounded-xl border shadow-sm transition-all overflow-hidden ${
            resolvedConflicts.includes('conf-1')
              ? 'border-[#b8f5be] bg-[#f5fff6]/30'
              : 'border-rose-200'
          }`}
        >
          <div className="p-4 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                Hard Conflict #1
              </span>
              <span className="font-bold text-sm text-gray-900">
                Venue Double-Booking: Hall S-102
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Wednesday 11:00 AM – 01:00 PM
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#046aff] bg-[#ebf1ff] px-2 py-0.5 rounded">
                    Meeting A (Scheduled)
                  </span>
                  <span className="text-xs text-gray-500 font-medium">85 Students</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  CSC 312: Computer Graphics & Shader Programming
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" /> Dr. Okafor
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> Hall S-102 (Cap 45)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                    Meeting B (Clashing)
                  </span>
                  <span className="text-xs text-gray-500 font-medium">42 Students</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  MTH 302: Abstract Algebra II
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" /> Prof. Adebayo
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> Hall S-102 (Cap 45)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Solution Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-700">
                Recommended Solution: Reallocate CSC 312 to Hall G-201 (Available, Cap 120)
              </div>

              <div className="flex items-center gap-2">
                {resolvedConflicts.includes('conf-1') ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f5fff6] text-[#21bf2b] text-xs font-bold">
                    <Check className="w-3.5 h-3.5" /> Reassigned to Hall G-201
                  </span>
                ) : (
                  <>
                    {onOpenOverride && (
                      <button
                        type="button"
                        onClick={onOpenOverride}
                        className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                      >
                        Override (aps-21)
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleResolve('conf-1')}
                      className="px-4 py-1.5 text-xs font-bold bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-lg transition-all shadow-sm"
                    >
                      Auto-Reassign Venue
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conflict Card 2: Instructor Overlap */}
        <div className="bg-white rounded-xl border border-rose-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                Hard Conflict #2
              </span>
              <span className="font-bold text-sm text-gray-900">
                Instructor Overlap: Dr. Okafor
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Tuesday 02:00 PM – 04:00 PM
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                <div className="text-xs font-bold text-[#046aff] bg-[#ebf1ff] px-2 py-0.5 rounded w-fit">
                  Slot 1: Physical Lecture
                </div>
                <div className="text-sm font-bold text-gray-900">
                  CSC 301: Operating Systems & Concurrency
                </div>
                <div className="text-xs text-gray-600">Hall G-201 • 124 Students</div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                <div className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded w-fit">
                  Slot 2: Virtual Synchronous
                </div>
                <div className="text-sm font-bold text-gray-900">
                  CSC 307: Web Application Development
                </div>
                <div className="text-xs text-gray-600">Zoom Main Hall Alpha • 124 Students</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-700">
                Recommended Solution: Delegate CSC 307 virtual moderation to Engr. Davies.
              </div>
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-bold bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-lg transition-all shadow-sm"
              >
                Reassign Instructor
              </button>
            </div>
          </div>
        </div>

        {/* Warning Card 3: Capacity Deficit */}
        <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-600 text-white">
                Capacity Warning
              </span>
              <span className="font-bold text-sm text-gray-900">
                Venue Capacity Deficit: Hall S-102 (45 seats for 85 students)
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              CSC 312 • 40 unseated students
            </span>
          </div>

          <div className="p-5 space-y-3">
            <p className="text-xs text-gray-600">
              The assigned venue capacity (45) is insufficient for current course enrollment (85 students). Relocation to Lecture Hall G-201 (120 capacity) is strongly recommended.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-bold bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-lg transition-all shadow-sm"
              >
                Upgrade to Hall G-201
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
