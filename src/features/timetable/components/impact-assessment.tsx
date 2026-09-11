'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  GraduationCap,
  Users,
  UserCheck,
  Building,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Send,
  Calendar,
  Layers,
  FileCheck,
  ChevronLeft,
} from 'lucide-react';

interface ImpactAssessmentProps {
  onBackToTimetable: () => void;
  onPublishSuccess?: () => void;
}

export function ImpactAssessment({
  onBackToTimetable,
  onPublishSuccess,
}: ImpactAssessmentProps) {
  const [effectiveDate, setEffectiveDate] = useState('2026-10-12');
  const [justification, setJustification] = useState(
    'Automated clash resolution reallocating CSC 312 to Hall G-201 to eliminate venue double-booking with MTH 302 in Hall S-102.'
  );
  const [isSignOffChecked, setIsSignOffChecked] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublished(true);
    if (onPublishSuccess) {
      setTimeout(() => onPublishSuccess(), 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToTimetable}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-900">
                Schedule Impact Assessment & Review
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f0f8ff] text-[#046aff]">
                Revision Rev-04
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Review affected stakeholders, venue reassignments, and downstream synchronization scope.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePublish}
          disabled={!isSignOffChecked || isPublished}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg shadow-sm transition-all ${
            isPublished
              ? 'bg-[#21bf2b] text-white'
              : isSignOffChecked
              ? 'bg-[#335cff] hover:bg-[#1a45e8] text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isPublished ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Published & Synced!
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Commit & Publish Schedule
            </>
          )}
        </button>
      </div>

      {/* Before vs After Split Comparison Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Schedule Revision Comparison (Wed 11:00 - 13:00)
          </span>
          <span className="text-xs font-semibold text-[#21bf2b] bg-[#f5fff6] px-2 py-0.5 rounded border border-[#b8f5be]">
            Clash Resolved
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before State */}
          <div className="p-5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Before (Active Conflict)
              </span>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                Collision
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-rose-200">
                <div className="font-bold text-gray-900">CSC 312: Computer Graphics</div>
                <div className="text-gray-600">Hall S-102 (Cap 45) • Dr. Okafor</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-rose-200">
                <div className="font-bold text-gray-900">MTH 302: Abstract Algebra II</div>
                <div className="text-gray-600">Hall S-102 (Cap 45) • Prof. Adebayo</div>
              </div>
            </div>

            <div className="text-xs text-rose-700 font-medium">
              ⚠️ Double-booked venue resulted in physical overlap of 127 total students.
            </div>
          </div>

          {/* After State */}
          <div className="p-5 rounded-xl bg-[#f5fff6]/50 border border-[#b8f5be] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#21bf2b]">
                After (Proposed Resolution)
              </span>
              <span className="text-[11px] font-bold text-[#21bf2b] bg-[#f5fff6] px-2 py-0.5 rounded">
                Valid & Clear
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-[#b8f5be]">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-900">CSC 312: Computer Graphics</div>
                  <span className="text-[10px] font-bold text-[#046aff] bg-[#f0f8ff] px-2 py-0.5 rounded border border-[#046aff]/20">
                    Reallocated
                  </span>
                </div>
                <div className="text-gray-600">Hall G-201 (Cap 120) • Dr. Okafor</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#b8f5be]">
                <div className="font-bold text-gray-900">MTH 302: Abstract Algebra II</div>
                <div className="text-gray-600">Hall S-102 (Cap 45) • Prof. Adebayo</div>
              </div>
            </div>

            <div className="text-xs text-[#21bf2b] font-medium">
              ✓ Venue capacities matched, zero collision, ample room for 85 students.
            </div>
          </div>
        </div>
      </div>

      {/* 5 Impact Stakeholder Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Affected Programmes */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-purple-600" /> Programmes
          </div>
          <div className="text-xl font-black text-gray-900">2 Programmes</div>
          <div className="text-xs text-gray-600">
            B.Sc. Computer Science & B.Sc. Mathematics (166 students total)
          </div>
        </div>

        {/* Affected Cohorts */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Users className="w-4 h-4 text-blue-600" /> Cohorts
          </div>
          <div className="text-xl font-black text-gray-900">3 Cohorts</div>
          <div className="text-xs text-gray-600">
            300L CS (85), 300L Math (42), Joint Electives (39)
          </div>
        </div>

        {/* Affected Staff */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-[#21bf2b]" /> Faculty Staff
          </div>
          <div className="text-xl font-black text-gray-900">2 Lecturers</div>
          <div className="text-xs text-gray-600">
            Dr. Okafor (CS Dept) & Prof. Adebayo (Math Dept)
          </div>
        </div>

        {/* Affected Venues */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Building className="w-4 h-4 text-amber-600" /> Venues
          </div>
          <div className="text-xl font-black text-gray-900">2 Halls</div>
          <div className="text-xs text-gray-600">
            Hall S-102 (Freed) & Hall G-201 (Booked)
          </div>
        </div>

        {/* Downstream Scope */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Radio className="w-4 h-4 text-[#046aff]" /> Downstream Scope
          </div>
          <div className="text-xl font-black text-[#046aff]">3 Systems</div>
          <div className="text-xs text-gray-600">
            Student Portal, Attendance Biometrics, LMS Sync
          </div>
        </div>
      </div>

      {/* Change Configuration & Sign-Off Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#046aff]" /> Change Configuration & Audit Authorization
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Revision Justification
            </label>
            <textarea
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Effective Implementation Date
              </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              />
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#f5fff6]/60 border border-[#b8f5be]">
              <input
                type="checkbox"
                id="signoff"
                checked={isSignOffChecked}
                onChange={(e) => setIsSignOffChecked(e.target.checked)}
                className="w-4 h-4 text-[#046aff] rounded border-gray-300 focus:ring-[#046aff] mt-0.5"
              />
              <label htmlFor="signoff" className="text-xs font-semibold text-[#1f1f1f] cursor-pointer">
                I confirm that this schedule alteration has been verified against student cohort clashes and approved by the Faculty Timetabling Committee.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
