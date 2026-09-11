'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCircle2, Clock, Filter, Plus } from 'lucide-react';
import { ProposalItem } from '../types';

interface ApprovalsDashboardProps {
  onSelectProposal: (proposalId: string) => void;
  onSelectOwnProposal: (proposalId: string) => void;
  onSubmitNewReview: () => void;
}

export function ApprovalsDashboard({
  onSelectProposal,
  onSelectOwnProposal,
  onSubmitNewReview,
}: ApprovalsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'my-approvals' | 'awaiting' | 'all'>('my-approvals');

  return (
    <div className="flex flex-col gap-6 max-w-[1160px]">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#808080]">Academic Planning</span>
          <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Approvals
          </h1>
        </div>

        {/* Top-Right CTA Button: Submit for Review modal trigger */}
        <button
          type="button"
          onClick={onSubmitNewReview}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>Submit for Review</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── View Toggle Tabs ──────────────────────────────────────── */}
      <div className="bg-white border border-[#f5f5f5] rounded-[8px] p-1 inline-flex items-center gap-1 self-start shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('my-approvals')}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === 'my-approvals'
              ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
              : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
          }`}
        >
          My Approvals
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('awaiting')}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === 'awaiting'
              ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
              : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
          }`}
        >
          Awaiting My Review (2)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all ${
            activeTab === 'all'
              ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
              : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
          }`}
        >
          All Submissions
        </button>
      </div>

      {/* ── Tab 1: My Submitted Proposals ─────────────────────────── */}
      {(activeTab === 'my-approvals' || activeTab === 'all') && (
        <div className="flex flex-col gap-3">
          <h2 className="text-[14px] font-semibold text-[#5c5c5c]">
            My Submitted Proposals
          </h2>

          <div className="flex flex-col gap-3">
            {/* Proposal Card 1 */}
            <div
              onClick={() => onSelectOwnProposal('curriculum-v3')}
              className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex items-center justify-between hover:border-[#d2e4ff] transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold text-[#0b0b0b] group-hover:text-[#046aff] transition-colors">
                  BSc Computer Science Curriculum Amendment v3
                </h3>
                <p className="text-[12px] text-[#808080]">
                  Submitted on 12 Jan 2026 • Reviewer: Dr. Marcus (VP Academic)
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#046aff] transition-colors" />
            </div>

            {/* Proposal Card 2 */}
            <div
              onClick={() => onSelectOwnProposal('calendar-2026')}
              className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex items-center justify-between hover:border-[#d2e4ff] transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold text-[#0b0b0b] group-hover:text-[#046aff] transition-colors">
                  Academic Calendar 2026/2027 draft
                </h3>
                <p className="text-[12px] text-[#808080]">
                  Submitted on 10 Jan 2026 • Reviewer: Registrar Office
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#046aff] transition-colors" />
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      {activeTab === 'my-approvals' && (
        <div className="h-px bg-[#ebebeb] w-full my-1" />
      )}

      {/* ── Tab 2: Awaiting My Review (Action Required) ───────────── */}
      {(activeTab === 'my-approvals' || activeTab === 'awaiting' || activeTab === 'all') && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[14px] font-semibold text-[#5c5c5c]">
            Awaiting My Review (Action Required)
          </h2>

          <div className="flex flex-col gap-4">
            {/* Awaiting Card 1 */}
            <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex flex-col gap-4 hover:border-[#d2e4ff] transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[14px] font-semibold text-[#0b0b0b]">
                    Faculty of Science calendar amendment
                  </h3>
                  <p className="text-[12px] text-[#808080]">
                    Submitted by Dr. Marcus (VP Academic) • 4h ago
                  </p>
                </div>
                <span className="bg-[#fb3748] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  High Priority
                </span>
              </div>

              <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
                <span className="font-semibold text-[#1f1f1f]">Change Summary Preview: </span>
                <span>&quot;Review date constraints: Reading week overlaps with regional holiday. Please slide back by 3 calendar days.&quot;</span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-semibold text-[#808080]">Impact Count:</span>
                  <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                    8 Programmes
                  </span>
                  <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                    14 Courses
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProposal('calendar-amendment')}
                  className="inline-flex items-center justify-center gap-1 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[8px] px-3.5 py-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>Review Proposal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Awaiting Card 2 */}
            <div className="bg-white border border-[#f5f5f5] rounded-[12px] p-5 shadow-xs flex flex-col gap-4 hover:border-[#d2e4ff] transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[14px] font-semibold text-[#0b0b0b]">
                    Department of Physics Lab Schedule
                  </h3>
                  <p className="text-[12px] text-[#808080]">
                    Submitted by Prof. Janet Cole • 1d ago
                  </p>
                </div>
                <span className="bg-[#7b7b7b] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Normal Priority
                </span>
              </div>

              <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
                <span className="font-semibold text-[#1f1f1f]">Change Summary Preview: </span>
                <span>&quot;Reallocated PHY 102 laboratory practical slots due to equipment calibration schedule. All students notified.&quot;</span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-semibold text-[#808080]">Impact Count:</span>
                  <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                    3 Programmes
                  </span>
                  <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                    2 Venues
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProposal('physics-lab')}
                  className="inline-flex items-center justify-center gap-1 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[8px] px-3.5 py-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>Review Proposal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
