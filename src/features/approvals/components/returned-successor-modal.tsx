'use client';

import React from 'react';
import { X, AlertCircle, ArrowRight, FileText, CheckCircle2, History } from 'lucide-react';

export interface ReturnedSuccessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRevision?: () => void;
  onViewFrozen?: () => void;
  artifactName?: string;
  revisionCode?: string;
  frozenCode?: string;
  authorName?: string;
  reviewerName?: string;
  returnedDate?: string;
  reasonsText?: string;
}

export function ReturnedSuccessorModal({
  isOpen,
  onClose,
  onOpenRevision,
  onViewFrozen,
  artifactName = 'Academic Calendar 2026/2027',
  revisionCode = 'CAL-2026-R4',
  frozenCode = 'CAL-2026-R3',
  authorName = 'Dr. Amara Osei',
  reviewerName = 'Prof. Kunle Adebayo',
  returnedDate = 'Sep 16, 2026 at 09:10 WAT',
  reasonsText = 'Adjust the reading-week date range and refresh the missing dependency before resubmitting.',
}: ReturnedSuccessorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[640px] bg-white rounded-[16px] shadow-[0px_20px_40px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="returned-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0f0f0]">
          <h2 id="returned-modal-title" className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Return completed
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

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(85vh-130px)]">
          {/* Artifact Summary Info */}
          <div className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fff1f2] text-[#fb3748] border border-[#fecdd3]">
                Returned
              </span>
              <span className="text-[14px] font-bold text-[#0b0b0b]">
                New editable revision created for {authorName}
              </span>
            </div>
            <div className="text-[12px] text-[#5c5c5c]">
              Returned by <span className="font-semibold text-[#1f1f1f]">{reviewerName}</span> on {returnedDate}
            </div>
          </div>

          {/* Actionable Reviewer Reasons */}
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-[#0b0b0b]">
              Actionable reviewer reasons
            </span>
            <div className="p-4 rounded-[10px] bg-white border border-[#d1d5db] text-[13px] text-[#1f1f1f] leading-relaxed shadow-xs font-mono text-xs sm:text-[13px] sm:font-sans">
              &ldquo;{reasonsText}&rdquo;
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#808080] px-1">
              <span>Frozen {frozenCode} remains read-only</span>
              <span>Revision lineage preserved</span>
            </div>
          </div>

          {/* Next Steps Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#808080]">
              Next steps
            </span>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 rounded-[8px] bg-gray-100 border border-gray-200 text-xs font-medium text-[#1f1f1f]">
                1. Open editable revision {revisionCode}
              </div>
              <div className="px-3 py-1.5 rounded-[8px] bg-gray-100 border border-gray-200 text-xs font-medium text-[#1f1f1f]">
                2. Resolve dependency and validation issues
              </div>
              <div className="px-3 py-1.5 rounded-[8px] bg-gray-100 border border-gray-200 text-xs font-medium text-[#1f1f1f]">
                3. Revalidate and resubmit
              </div>
              <button
                type="button"
                onClick={onViewFrozen}
                className="px-3 py-1.5 rounded-[8px] bg-[#f0f8ff] border border-[#bae6fd] text-xs font-medium text-[#046aff] hover:underline cursor-pointer"
              >
                View frozen submission {frozenCode}
              </button>
            </div>
          </div>

          {/* Published Version Authoritative Notice */}
          <div className="p-3.5 rounded-[10px] bg-[#f0f8ff] border border-[#d0e5ff] text-[12px] text-[#0353c7] leading-relaxed">
            The current published version remains authoritative until {revisionCode} completes independent review and publication.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f0f0f0] bg-[#fafafa]">
          <button
            type="button"
            onClick={onViewFrozen || onClose}
            className="px-4 py-2 bg-white border border-[#ebebeb] hover:bg-gray-50 text-[#1f1f1f] text-[13px] font-medium rounded-[10px] transition-colors cursor-pointer"
          >
            View Frozen {frozenCode}
          </button>
          <button
            type="button"
            onClick={onOpenRevision || onClose}
            className="px-5 py-2 bg-[#335cff] hover:bg-[#254bdb] text-white text-[13px] font-medium rounded-[10px] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Open Editable Revision {revisionCode}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
