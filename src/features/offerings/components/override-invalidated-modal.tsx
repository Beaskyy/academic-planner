'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface OverrideInvalidatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  onRequestNewOverride: () => void;
}

export function OverrideInvalidatedModal({
  isOpen,
  onClose,
  onAcknowledge,
  onRequestNewOverride,
}: OverrideInvalidatedModalProps) {
  const [understood, setUnderstood] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="override-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative bg-white rounded-[16px] shadow-2xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#f0f0f0]">
          <h2
            id="override-modal-title"
            className="text-[18px] font-bold text-[#0b0b0b] leading-tight pr-4"
          >
            Override Invalidated After Meeting Edit
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] hover:bg-[#f5f5f5] text-[#808080] hover:text-[#1f1f1f] transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="mx-6 mt-5 p-4 bg-[#fff7ed] border border-[#fed7aa] rounded-[10px]">
          <div className="flex items-center gap-2.5 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#c2410c] flex-shrink-0" />
            <span className="text-[14px] font-semibold text-[#92400e]">Previous override no longer applies</span>
          </div>
          <p className="text-[13px] text-[#78350f] leading-relaxed mb-3">
            The lead lecturer and meeting hours changed after approval. The version-scoped warning override was automatically invalidated.
          </p>
          <div className="bg-white/70 rounded-[8px] px-3 py-2">
            <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-1">Changed fields</p>
            <p className="text-[13px] text-[#1f1f1f] leading-relaxed">
              Lead lecturer: Dr. Okafor → Dr. Bello &bull; Weekly hours: 3 → 4 &bull; Edited 03 Sep 2026, 10:42 WAT
            </p>
          </div>
        </div>

        {/* Previous Justification */}
        <div className="px-6 mt-5">
          <label className="text-[13px] font-semibold text-[#1f1f1f]">Previous justification — Read only</label>
          <div className="mt-2 p-4 bg-[#fafafa] border border-[#ebebeb] rounded-[10px]">
            <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
              Operational staffing shortage. This reason remains in audit history but cannot authorize the changed meeting.
            </p>
          </div>
          <p className="text-[11px] text-[#808080] mt-1">0 / 250 characters</p>
        </div>

        {/* Approver Info */}
        <div className="px-6 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-[12px] font-medium text-[#808080] uppercase tracking-wide mb-1">Previous independent approver</p>
            <p className="text-[13px] font-semibold text-[#1f1f1f]">Dean Alabi</p>
            <span className="inline-flex items-center bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1">
              Invalidated
            </span>
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#808080] uppercase tracking-wide mb-1">Required next action</p>
            <p className="text-[13px] text-[#1f1f1f] leading-relaxed">
              Revalidate meeting and request a new independent override
            </p>
          </div>
        </div>

        {/* Acknowledgement Checkbox */}
        <div className="px-6 mt-5">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={understood}
                onChange={(e) => setUnderstood(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-all ${
                  understood
                    ? 'bg-[#046aff] border-[#046aff]'
                    : 'bg-white border-[#d1d5db] group-hover:border-[#046aff]'
                }`}
              >
                {understood && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[13px] text-[#1f1f1f]">
              I understand the previous override cannot be reused.
            </span>
          </label>
        </div>

        {/* Audit Note */}
        <div className="mx-6 mt-4 p-3 bg-[#f5f5f5] rounded-[8px]">
          <p className="text-[12px] text-[#808080]">
            The invalidation, changed fields, actor, and timestamp are retained in the audit log.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-5 mt-2 border-t border-[#f0f0f0] flex items-center justify-end gap-3 flex-wrap">
          <button
            onClick={onAcknowledge}
            disabled={!understood}
            className={`px-4 py-2.5 rounded-[8px] text-[13px] font-medium transition-all ${
              understood
                ? 'border border-[#ebebeb] bg-white hover:bg-[#f5f5f5] text-[#5c5c5c] cursor-pointer'
                : 'border border-[#ebebeb] bg-white text-[#a0a0a0] cursor-not-allowed opacity-50'
            }`}
          >
            Acknowledge &amp; Continue
          </button>
          <button
            onClick={onRequestNewOverride}
            disabled={!understood}
            className={`px-5 py-2.5 rounded-[8px] text-[13px] font-medium transition-all ${
              understood
                ? 'bg-[#046aff] hover:bg-[#254bdb] text-white shadow-sm cursor-pointer'
                : 'bg-[#ebebeb] text-[#a0a0a0] cursor-not-allowed'
            }`}
          >
            Request New Independent Override
          </button>
        </div>

        {/* Previous Overrides History */}
        <div className="px-6 pb-6">
          <div className="border-t border-[#f5f5f5] pt-4">
            <p className="text-[12px] font-semibold text-[#808080] uppercase tracking-wide mb-3">Previous Overrides for this Instructor</p>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#1f1f1f]">Semester 2 (2025) • 6 Sections Load</p>
                <p className="text-[12px] text-[#808080] mt-1 leading-relaxed">
                  Justification: Academic department staffing shortage. Approved by VP Academic Marcus on 12 Sep 2025.
                </p>
              </div>
              <span className="inline-flex items-center bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                Past ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
