'use client';

import React, { useState } from 'react';
import { X, ChevronRight, AlertTriangle } from 'lucide-react';

interface ReturnCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturn: (reason: string) => void;
  title?: string;
  statusLabel?: string;
  isPending?: boolean;
  errorMessage?: string;
}

const QUICK_TAGS = [
  'Date range needs adjustment',
  'Missing dependency update',
  'Impact assessment incomplete',
  'Validation evidence insufficient',
];

export function ReturnCandidateModal({
  isOpen,
  onClose,
  onReturn,
  title = 'Publication review',
  statusLabel = 'AWAITING REVIEW',
  isPending = false,
  errorMessage,
}: ReturnCandidateModalProps) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleAppendTag = (tagText: string) => {
    setReason((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `• ${tagText}: `;
      return `${trimmed}\n• ${tagText}: `;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim().length < 10 || isPending) return;
    onReturn(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[16px] shadow-2xl border border-gray-100 w-full max-w-[640px] my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Return Candidate to Maker
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
          {/* Artifact Summary Info */}
          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-[#fa7319] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {statusLabel}
              </span>
              <h4 className="text-[14px] font-bold text-[#0b0b0b]">
                {title}
              </h4>
            </div>
            <p className="text-[12px] text-[#808080]">
              Submitted by <span className="font-medium text-[#1f1f1f]">Dr. Amara Osei</span> on Sep 15, 2026 at 14:30 WAT
            </p>
          </div>

          {/* Reasons Section */}
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#0b0b0b]">
              Return Reasons (Required)*
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide specific, actionable reasons for returning this candidate..."
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] p-3 text-[13px] text-[#1f1f1f] focus:outline-none focus:border-[#dc2626] focus:bg-white transition-colors"
              required
            />
            <div className="flex items-center justify-between text-[11px] text-[#808080] pt-1">
              <span>Minimum 50 characters recommended</span>
              <span className={reason.length > 1000 ? 'text-[#dc2626] font-bold' : ''}>
                {reason.length} / 1000
              </span>
            </div>
          </div>

          {/* Quick-add section */}
          <div className="space-y-2">
            <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Click to append quick-add feedback
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAppendTag(tag)}
                  className="px-2.5 py-1 text-[12px] font-medium bg-[#f5f5f5] hover:bg-[#ebebeb] text-[#1f1f1f] rounded-md transition-colors cursor-pointer border border-transparent hover:border-[#d9d9d9]"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Explanatory Note */}
          <div className="bg-[#fcfcfc] border border-[#ebebeb] rounded-[8px] p-3 text-[12px] text-[#5c5c5c] leading-relaxed">
            The current published version will remain authoritative. The maker will receive a new editable revision with your feedback.
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-[10px] border border-[#F69999] bg-[#FEF0F0] px-3 py-2 text-[12px] text-[#B91C1C]"
            >
              {errorMessage}
            </div>
          )}

          {/* Footer Buttons */}
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
              disabled={reason.trim().length < 10 || isPending}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#fb3748] hover:bg-[#dc2626] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              <span>{isPending ? 'Returning...' : 'Return to Maker'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
