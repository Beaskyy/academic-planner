'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Bell,
  Sparkles,
} from 'lucide-react';

interface DatedExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DatedExceptionModal({
  isOpen,
  onClose,
}: DatedExceptionModalProps) {
  const [exceptionType, setExceptionType] = useState<'Reschedule' | 'Cancel' | 'Relocate' | 'Substitute'>('Reschedule');
  const [targetCourse, setTargetCourse] = useState('CSC 312 - Computer Graphics');
  const [originalDate, setOriginalDate] = useState('2026-10-14');
  const [newDate, setNewDate] = useState('2026-10-16');
  const [newStartTime, setNewStartTime] = useState('14:00');
  const [newEndTime, setNewEndTime] = useState('16:00');
  const [newVenue, setNewVenue] = useState('Hall G-201');
  const [reason, setReason] = useState('Lecturer attending Faculty Senate Board Meeting; slot relocated to Friday.');
  const [notifyStudents, setNotifyStudents] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Dated Schedule Exception</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Override a single date occurrence without modifying the recurring master timetable.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Exception Type Pills */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Exception Action
            </label>
            <div className="grid grid-cols-4 gap-2 bg-gray-100 p-1 rounded-xl">
              {(['Reschedule', 'Cancel', 'Relocate', 'Substitute'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setExceptionType(type)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    exceptionType === type
                      ? 'bg-white text-[#046aff] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Affected Target Course & Original Occurrence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Target Scheduled Course
              </label>
              <select
                value={targetCourse}
                onChange={(e) => setTargetCourse(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              >
                <option value="CSC 312 - Computer Graphics">CSC 312 - Wed 11:00 (Hall S-102)</option>
                <option value="CSC 301 - Operating Systems">CSC 301 - Mon 09:00 (Hall G-201)</option>
                <option value="MTH 301 - Numerical Analysis">MTH 301 - Tue 10:00 (Hall S-102)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Original Date Occurrence
              </label>
              <input
                type="date"
                value={originalDate}
                onChange={(e) => setOriginalDate(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              />
            </div>
          </div>

          {/* New Proposed Slot details (if Reschedule or Relocate) */}
          {exceptionType !== 'Cancel' && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#046aff]" /> New Replacement Schedule
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    New Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Start Time
                  </label>
                  <select
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium"
                  >
                    <option value="14:00">14:00 (02:00 PM)</option>
                    <option value="15:00">15:00 (03:00 PM)</option>
                    <option value="16:00">16:00 (04:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    End Time
                  </label>
                  <select
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium"
                  >
                    <option value="16:00">16:00 (04:00 PM)</option>
                    <option value="17:00">17:00 (05:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Relocated Venue
                </label>
                <select
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium"
                >
                  <option value="Hall G-201">Hall G-201 (Capacity 120 - Available)</option>
                  <option value="Auditorium 1">Auditorium 1 (Capacity 250 - Available)</option>
                  <option value="Zoom Main Hall Alpha">Zoom Main Hall Alpha (Virtual)</option>
                </select>
              </div>

              {/* Conflict Status Bar */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#21bf2b] bg-[#f5fff6] px-3 py-2 rounded-lg border border-[#b8f5be]">
                <CheckCircle2 className="w-4 h-4 text-[#21bf2b] shrink-0" />
                <span>Slot Available: No timetable clashes or lecturer conflicts found.</span>
              </div>
            </div>
          )}

          {/* Reason for Exception */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Reason & Audit Justification
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide reason for student portal notice and academic audit..."
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            />
          </div>

          {/* Broadcast notification checkbox */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <input
              type="checkbox"
              id="notify"
              checked={notifyStudents}
              onChange={(e) => setNotifyStudents(e.target.checked)}
              className="w-4 h-4 text-[#046aff] rounded border-gray-300 focus:ring-[#046aff]"
            />
            <label htmlFor="notify" className="text-xs font-medium text-gray-700 cursor-pointer">
              Automatically broadcast schedule change SMS / Push notification to 85 enrolled students and academic advisor.
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-lg transition-all shadow-sm"
          >
            Save Dated Exception
          </button>
        </div>
      </div>
    </div>
  );
}
