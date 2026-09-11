'use client';

import React, { useState } from 'react';
import { X, Calendar, Check, AlertCircle } from 'lucide-react';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function SubmitReviewModal({ isOpen, onClose, onSubmit }: SubmitReviewModalProps) {
  const [changeSummary, setChangeSummary] = useState(
    'Adjusted Semester 1 start bounds by 3 days to eliminate overlapping conflict records with winter holiday blocks. Approved.'
  );
  const [notifyCoordinators, setNotifyCoordinators] = useState(true);
  const [notifyManagers, setNotifyManagers] = useState(true);
  const [notifySIS, setNotifySIS] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      changeSummary,
      notifyCoordinators,
      notifyManagers,
      notifySIS,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[16px] shadow-2xl border border-gray-100 w-full max-w-[640px] my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Submit for Review
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Summary Card */}
          <div className="bg-white border border-[#ebebeb] rounded-[12px] p-4 flex items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[10px] bg-[#f0f8ff] flex items-center justify-center text-[#046aff] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[14px] font-semibold text-[#0b0b0b]">
                  Academic Calendar 2026/27 — Semester 1
                </h4>
                <p className="text-[12px] text-[#808080] font-normal">
                  Version Draft v2.1 • Last saved today at 10:45 AM
                </p>
              </div>
            </div>
            <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-semibold px-2.5 py-1 rounded-[6px] uppercase tracking-wider shrink-0">
              DRAFT
            </span>
          </div>

          {/* Validation and Dependencies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Validation Block */}
            <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
                Validation Evidence
              </span>
              <ul className="space-y-2 text-[12px] text-[#1f1f1f]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span>Date order valid</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span>No period overlaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span>Session containment valid</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fc16b] shrink-0" />
                  <span>Timezone consistent</span>
                </li>
              </ul>
            </div>

            {/* Dependencies Block */}
            <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
                Required Dependencies
              </span>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-[12px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] shrink-0 mt-1.5" />
                  <div>
                    <div className="font-semibold text-[#1f1f1f]">Academic Structures v3.0</div>
                    <div className="text-[11px] text-[#1fc16b] font-medium">Published ✓</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[12px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] shrink-0 mt-1.5" />
                  <div>
                    <div className="font-semibold text-[#1f1f1f]">Course Catalogue v2.0</div>
                    <div className="text-[11px] text-[#1fc16b] font-medium">Published ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Summary Form */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-[#0b0b0b]">
              Change Summary
            </label>
            <textarea
              rows={3}
              value={changeSummary}
              onChange={(e) => setChangeSummary(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] p-3 text-[13px] text-[#1f1f1f] focus:outline-none focus:border-[#046aff] focus:bg-white transition-colors"
              placeholder="Provide a clear description of the modifications..."
            />
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-gray-100">
            <div>
              <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider mb-1">
                Impact Assessment
              </span>
              <p className="text-[13px] font-medium text-[#1f1f1f]">
                3 programmes affected, 12 offerings, ~450 students
              </p>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider mb-1">
                Effective Time Picker
              </span>
              <p className="text-[13px] font-medium text-[#1f1f1f]">
                Immediate upon approval
              </p>
            </div>
          </div>

          {/* Notification Scope */}
          <div className="space-y-2.5 pt-1 border-t border-gray-100">
            <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Notification Scope
            </span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyCoordinators}
                  onChange={(e) => setNotifyCoordinators(e.target.checked)}
                  className="w-4 h-4 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0"
                />
                <span>Notify affected programme coordinators</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyManagers}
                  onChange={(e) => setNotifyManagers(e.target.checked)}
                  className="w-4 h-4 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0"
                />
                <span>Notify offering managers</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifySIS}
                  onChange={(e) => setNotifySIS(e.target.checked)}
                  className="w-4 h-4 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0"
                />
                <span>Notify SIS integration</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[10px] text-[14px] font-medium text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-gray-50 border border-[#e5e7eb] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
