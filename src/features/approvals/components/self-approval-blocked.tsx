'use client';

import React from 'react';
import { AlertTriangle, ChevronRight, ArrowLeft } from 'lucide-react';

interface SelfApprovalBlockedProps {
  onBackToQueue: () => void;
  onSwitchToApproverView?: () => void;
}

export function SelfApprovalBlocked({ onBackToQueue, onSwitchToApproverView }: SelfApprovalBlockedProps) {
  return (
    <div className="flex flex-col gap-6 max-w-[1160px]">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] text-[#808080]">
          <button
            onClick={onBackToQueue}
            className="hover:text-[#1f1f1f] transition-colors"
          >
            Approvals
          </button>
          <span>&gt;</span>
          <span>Academic Calendar 2026/27</span>
          <span>&gt;</span>
          <span className="font-semibold text-[#0b0b0b]">Review</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
            Review Academic Calendar
          </h1>
          {onSwitchToApproverView && (
            <button
              onClick={onSwitchToApproverView}
              className="text-xs font-medium text-[#046aff] hover:underline bg-[#f0f8ff] px-3 py-1.5 rounded-lg border border-[#046aff]/20"
            >
              Switch to Approver Persona (aps-24)
            </button>
          )}
        </div>
      </div>

      {/* Artifact Header Card */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-[#f4ebff] text-[#7f56d9] text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              CALENDAR ARTIFACT
            </span>
            <span className="text-[13px] font-normal text-[#808080]">
              ID: CAL-2026-R3
            </span>
          </div>
          <h2 className="text-[20px] font-bold text-[#0b0b0b]">
            Academic Calendar 2026/2027 draft
          </h2>
          <p className="text-[13px] text-[#5c5c5c]">
            Submitted by <span className="font-semibold text-[#0b0b0b]">Dr. Amara Osei (VP Academic)</span> on Sep 15, 2026 at 14:30 WAT
          </p>
        </div>
        <span className="bg-[#fa7319] text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-center">
          AWAITING REVIEW
        </span>
      </div>

      {/* Submission Timeline & Change Log */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-4">
        <h3 className="text-[16px] font-semibold text-[#0b0b0b]">
          Submission Timeline &amp; Change Log
        </h3>
        <ul className="space-y-3 text-[13px] text-[#1f1f1f]">
          <li className="flex items-center gap-2">
            <span className="text-[#808080]">•</span>
            <span>Created calendar draft v1.0 — Sep 10, 10:00 by Dr. Amara Osei</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#808080]">•</span>
            <span>Completed schedule validation checks — Sep 12, 14:05</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#808080]">•</span>
            <span>Candidate submitted for final approval — Sep 15, 14:30</span>
          </li>
        </ul>
      </div>

      {/* Decision Block (Self-Approval Restricted) */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-6">
        {/* Self-Approval Warning Box */}
        <div className="bg-[#fef3ec] border border-[#fbd5c0] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#fa7319] font-semibold text-[14px]">
            <AlertTriangle className="w-5 h-5" />
            <span>Self-Approval Not Permitted</span>
          </div>
          <p className="text-[13px] text-[#1f1f1f] pl-7">
            You submitted this candidate and cannot approve it. An independent approver must review and decide.
          </p>
        </div>

        {/* Eligible Approvers Directory */}
        <div className="space-y-3">
          <span className="block text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
            Current Eligible Approvers:
          </span>
          <div className="divide-y divide-gray-100">
            <div className="py-2.5 flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#1fc16b]" />
                <span className="font-semibold text-[#1f1f1f]">Prof. Kunle Adebayo</span>
                <span className="text-[#808080]">(Dean of Science)</span>
              </div>
              <span className="text-[#808080] text-[12px]">Active 10 mins ago</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="font-semibold text-[#1f1f1f]">Dr. Marcus (VP Academic)</span>
                <span className="text-[#808080]">(Senior Registrar)</span>
              </div>
              <span className="text-[#808080] text-[12px]">Active yesterday</span>
            </div>
          </div>
        </div>

        {/* Alternative Action Links */}
        <div className="flex items-center gap-2 text-[13px] text-[#046aff]">
          <button type="button" className="hover:underline font-medium">
            Reassign to specific approver
          </button>
          <span className="text-[#808080]">•</span>
          <button type="button" className="hover:underline font-medium">
            View queue history
          </button>
        </div>

        {/* Action Buttons (Blocked / Disabled) */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            disabled
            className="px-4 py-2.5 rounded-[10px] text-[14px] font-medium bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          >
            Return to Draft
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] text-[14px] font-medium bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          >
            <span>Approve &amp; Publish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
