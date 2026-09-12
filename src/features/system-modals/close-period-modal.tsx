'use client';

import React, { useState } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';

export interface ClosePeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClose?: () => void;
  sessionName?: string;
  periodName?: string;
  dateRange?: string;
}

export function ClosePeriodModal({
  isOpen,
  onClose,
  onConfirmClose,
  sessionName = '2026/2027 Academic Session',
  periodName = 'Semester 1',
  dateRange = 'Oct 9, 2026 - Feb 15, 2027',
}: ClosePeriodModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const checklistItems = [
    'All planning artifacts published',
    'No unresolved blocking issues',
    'All downstream events acknowledged',
    'No pending revisions in review',
    'Teaching timetable complete',
  ];

  const handleClosePeriod = () => {
    if (!isConfirmed) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmClose?.();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-[640px] bg-white rounded-[16px] shadow-[0px_20px_40px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="close-period-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 id="close-period-title" className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Close Academic Period
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#808080] hover:text-[#0b0b0b] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 flex flex-col gap-5">
          {/* Period Info Card */}
          <div className="bg-[#fafafa] border border-[#ebebeb] rounded-[12px] p-4 flex flex-col gap-2.5">
            <div className="text-[15px] font-bold text-[#0b0b0b]">
              {sessionName} — {periodName}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
              <span className="text-[#5c5c5c]">
                Date Range: <span className="font-medium text-[#1f1f1f]">{dateRange}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1fc16b]" />
                <span className="text-[13px] font-medium text-[#1fc16b]">Active</span>
              </div>
            </div>
          </div>

          {/* Pre-close Checklist */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[13px] font-semibold text-[#0b0b0b]">
              Pre-Close Checklist (System Check)
            </h3>
            <div className="flex flex-col gap-2.5">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#eafaf1] text-[#1fc16b] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-[13px] text-[#1f1f1f] font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Impact Warning Box */}
          <div className="bg-[#fef6ee] border border-[#fbd5c0] rounded-[10px] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#ea580c]">
              <AlertTriangle className="w-4 h-4 text-[#ea580c] shrink-0" />
              <span className="text-[13px] font-bold text-[#ea580c]">
                Closing Impact Warning
              </span>
            </div>
            <p className="text-[13px] text-[#9a3412] leading-relaxed">
              Closing will mark planning artifacts as historical for this period and keep every published version accessible as read-only.
            </p>
            <p className="text-[11px] text-[#c2410c] mt-0.5">
              * Note: This does NOT close active SIS cases, LMS modules, finance records, or results workflows.
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer select-none group mt-1">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#d1d5db] text-[#335cff] focus:ring-[#335cff] cursor-pointer"
            />
            <span className="text-[13px] text-[#1f1f1f] group-hover:text-[#0b0b0b] transition-colors leading-tight">
              I understand that closing changes the planning lifecycle state.
            </span>
          </label>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#ebebeb] hover:bg-[#f5f5f5] text-[#1f1f1f] text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!isConfirmed || isSubmitting}
              onClick={handleClosePeriod}
              className="px-4 py-2 bg-[#fb3748] hover:bg-[#e02839] text-white text-[14px] font-medium rounded-[10px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              {isSubmitting ? 'Closing...' : 'Close Period'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
