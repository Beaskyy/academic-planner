'use client';

import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

interface ApprovePublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (timing: 'immediate' | 'scheduled') => void;
}

export function ApprovePublicationModal({ isOpen, onClose, onApprove }: ApprovePublicationModalProps) {
  const [timing, setTiming] = useState<'immediate' | 'scheduled'>('immediate');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    onApprove(timing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[16px] shadow-2xl border border-gray-100 w-full max-w-[640px] my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Approve for Publication
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
          {/* Artifact Context Info */}
          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h4 className="text-[14px] font-bold text-[#0b0b0b]">
                Academic Calendar 2026/27 — Semester 1
              </h4>
              <p className="text-[12px] text-[#808080] font-normal">
                Version 1.4 Draft • Submitted by Dr. Amara Osei
              </p>
            </div>
            <span className="bg-[#fa7319] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              AWAITING REVIEW
            </span>
          </div>

          {/* Approval Summary Panel */}
          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] p-4 space-y-3">
            <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
              Approval Summary
            </span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] text-[#1f1f1f]">
                <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-[6px] uppercase shrink-0">
                  PASSED
                </span>
                <span>All scheduling and curriculum validation checks complete</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#1f1f1f]">
                <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-[6px] uppercase shrink-0">
                  FRESH
                </span>
                <span>All referenced database records verified as up-to-date</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#1f1f1f]">
                <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-bold px-2 py-0.5 rounded-[6px] uppercase shrink-0">
                  ASSESSED
                </span>
                <span>Impact scope: 3 programmes, 12 offerings, ~450 students</span>
              </div>
            </div>
          </div>

          {/* Publication Timing Section */}
          <div className="space-y-2.5">
            <span className="block text-[13px] font-semibold text-[#0b0b0b]">
              Publication Timing
            </span>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={timing === 'immediate'}
                  onChange={() => setTiming('immediate')}
                  className="w-4 h-4 text-[#046aff] border-[#d9d9d9] focus:ring-0"
                />
                <span className="font-medium">Publish immediately upon approval</span>
              </label>
              <label className="flex items-center gap-2.5 text-[13px] text-[#1f1f1f] cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={timing === 'scheduled'}
                  onChange={() => setTiming('scheduled')}
                  className="w-4 h-4 text-[#046aff] border-[#d9d9d9] focus:ring-0"
                />
                <span className="font-medium">Schedule publication</span>
              </label>
            </div>
          </div>

          {/* Notification Preview Scope */}
          <div className="space-y-2 pt-1 border-t border-gray-100">
            <span className="block text-[12px] font-medium text-[#5c5c5c]">
              The following will be notified upon publication:
            </span>
            <ul className="space-y-1 pl-2 text-[12px] text-[#808080]">
              <li>• Programme Coordinators (3)</li>
              <li>• Offering Managers (12)</li>
              <li>• SIS Integration Agent (Automated)</li>
              <li>• Learning Delivery channels</li>
            </ul>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-start gap-2.5 text-[13px] text-[#1f1f1f] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0 mt-0.5"
              />
              <span className="font-medium">
                I confirm I have reviewed the complete diff, validation evidence, and impact assessment.
              </span>
            </label>
          </div>

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
              disabled={!confirmed}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-sm ${
                confirmed
                  ? 'bg-[#335cff] hover:bg-[#254bdb] text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Approve &amp; Publish</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
