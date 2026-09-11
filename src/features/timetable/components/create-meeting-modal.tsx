'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle2,
  Video,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOverride?: () => void;
}

export function CreateMeetingModal({
  isOpen,
  onClose,
  onOpenOverride,
}: CreateMeetingModalProps) {
  const [sessionType, setSessionType] = useState<'Lecture' | 'Lab' | 'Tutorial' | 'Seminar'>('Lecture');
  const [course, setCourse] = useState('CSC 312 - Computer Graphics & Shader Prog.');
  const [deliveryMode, setDeliveryMode] = useState<'Physical' | 'Virtual' | 'Hybrid'>('Physical');
  const [venue, setVenue] = useState('Hall S-102');
  const [lecturer, setLecturer] = useState('Dr. Okafor');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Wed']);
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('13:00');

  if (!isOpen) return null;

  // Conflict triggered if Wednesday and Hall S-102 and 11:00
  const isConflict =
    selectedDays.includes('Wed') && venue === 'Hall S-102' && startTime === '11:00';

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Schedule Class Meeting</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Create recurring weekly slot or ad-hoc session in the teaching timetable.
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
          {/* Session Type Segmented Control */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Session Type
            </label>
            <div className="grid grid-cols-4 gap-2 bg-gray-100 p-1 rounded-xl">
              {(['Lecture', 'Lab', 'Tutorial', 'Seminar'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSessionType(type)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    sessionType === type
                      ? 'bg-white text-[#046aff] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Course Offering */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Course Offering
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="CSC 301 - Operating Systems & Concurrency">CSC 301 - Operating Systems & Concurrency (124 Students)</option>
              <option value="CSC 312 - Computer Graphics & Shader Prog.">CSC 312 - Computer Graphics & Shader Prog. (85 Students)</option>
              <option value="MTH 302 - Abstract Algebra II">MTH 302 - Abstract Algebra II (42 Students)</option>
              <option value="CSC 305 - Database Systems Architecture">CSC 305 - Database Systems Architecture (124 Students)</option>
            </select>
          </div>

          {/* Lead Lecturer & Delivery Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Lead Lecturer / Instructor
              </label>
              <select
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              >
                <option value="Dr. Okafor">Dr. Okafor (Senior Lecturer)</option>
                <option value="Prof. Bello">Prof. Bello (Department Chair)</option>
                <option value="Prof. Adebayo">Prof. Adebayo (Faculty Lead)</option>
                <option value="Dr. Adeleke">Dr. Adeleke (Associate Prof)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Delivery Mode
              </label>
              <select
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value as any)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              >
                <option value="Physical">Physical (In-Person Venue)</option>
                <option value="Virtual">Virtual (Zoom / Teams)</option>
                <option value="Hybrid">Hybrid (Classroom + Broadcast)</option>
              </select>
            </div>
          </div>

          {/* Venue Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Assigned Venue / Virtual Room
            </label>
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="Hall S-102">Hall S-102 (Capacity: 45) - Arts Block</option>
              <option value="Hall G-201">Hall G-201 (Capacity: 120) - Main Science Block</option>
              <option value="Computing Lab L-304">Computing Lab L-304 (Capacity: 60) - Engineering Wing</option>
              <option value="Zoom Main Hall Alpha">Zoom Main Hall Alpha (Capacity: 300)</option>
            </select>
          </div>

          {/* Recurrence Days */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Weekly Recurrence Days
            </label>
            <div className="flex items-center gap-2">
              {[
                { key: 'Mon', label: 'Monday' },
                { key: 'Tue', label: 'Tuesday' },
                { key: 'Wed', label: 'Wednesday' },
                { key: 'Thu', label: 'Thursday' },
                { key: 'Fri', label: 'Friday' },
              ].map((day) => {
                const isSelected = selectedDays.includes(day.key);
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => toggleDay(day.key)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-[#046aff] text-white border-[#046aff] shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {day.key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Span */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              >
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Live Conflict Warning Box */}
          {isConflict && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2 animate-in fade-in">
              <div className="flex items-start gap-2.5 font-bold text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Hard Conflict Detected: Venue Double-Booking</span>
              </div>
              <p className="text-rose-700 leading-relaxed pl-6">
                <strong>Hall S-102</strong> is already booked for <strong>MTH 302</strong> (Prof. Adebayo) on Wednesday from 11:00 to 13:00. Scheduling this will cause an active clash.
              </p>
              {onOpenOverride && (
                <div className="pl-6 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenOverride();
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-rose-800 underline hover:text-rose-950"
                  >
                    Request Administrative Override (aps-21) →
                  </button>
                </div>
              )}
            </div>
          )}
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

          <div className="flex items-center gap-2">
            {isConflict && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenOverride) {
                    onClose();
                    onOpenOverride();
                  }
                }}
                className="px-4 py-2 text-sm font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Proceed with Override
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              disabled={isConflict}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-sm ${
                isConflict
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#335cff] hover:bg-[#1a45e8] text-white'
              }`}
            >
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
