'use client';

import React, { useState } from 'react';
import { Sidebar } from '../shared/sidebar';
import { TopBar } from '../shared/top-bar';
import { ApprovalsDashboard } from './components/approvals-dashboard';
import { ApprovalDetail } from './components/approval-detail';
import { SelfApprovalBlocked } from './components/self-approval-blocked';
import { SubmitReviewModal } from './components/submit-review-modal';
import { ReturnCandidateModal } from './components/return-candidate-modal';
import { ApprovePublicationModal } from './components/approve-publication-modal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export type ApprovalsViewMode = 'dashboard' | 'detail' | 'self-blocked';

export function ApprovalsView() {
  const [viewMode, setViewMode] = useState<ApprovalsViewMode>('dashboard');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReturnSuccess = (reason: string) => {
    showToast('Proposal successfully returned to Maker with feedback.');
    setViewMode('dashboard');
  };

  const handleApproveSuccess = (timing: 'immediate' | 'scheduled') => {
    showToast(
      timing === 'immediate'
        ? 'Proposal approved and published to live catalogue!'
        : 'Proposal approved and scheduled for automated publication.'
    );
    setViewMode('dashboard');
  };

  const handleSubmitSuccess = (data: any) => {
    showToast('Draft successfully submitted for governance review.');
    setViewMode('dashboard');
  };

  return (
    <div className="flex h-screen bg-[#fafafa] text-[#1f1f1f] font-['Inter',sans-serif] antialiased overflow-hidden">
      {/* Shared Sidebar */}
      <Sidebar
        activeItem="approvals"
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-0 pb-28">
          {/* Active View Screen */}
          {viewMode === 'dashboard' && (
            <ApprovalsDashboard
              onSelectProposal={() => setViewMode('detail')}
              onSelectOwnProposal={() => setViewMode('self-blocked')}
              onSubmitNewReview={() => setIsSubmitModalOpen(true)}
            />
          )}

          {viewMode === 'detail' && (
            <ApprovalDetail
              onBackToQueue={() => setViewMode('dashboard')}
              onOpenReturnDialog={() => setIsReturnModalOpen(true)}
              onOpenApproveDialog={() => setIsApproveModalOpen(true)}
              onSwitchToMakerView={() => setViewMode('self-blocked')}
            />
          )}

          {viewMode === 'self-blocked' && (
            <SelfApprovalBlocked
              onBackToQueue={() => setViewMode('dashboard')}
              onSwitchToApproverView={() => setViewMode('detail')}
            />
          )}
        </main>
      </div>

      {/* Modal 1: Submit for Review (aps-submit-review-dialog) */}
      {isSubmitModalOpen && (
        <SubmitReviewModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleSubmitSuccess}
        />
      )}

      {/* Modal 2: Return Candidate to Maker (aps-24-return-dialog) */}
      {isReturnModalOpen && (
        <ReturnCandidateModal
          isOpen={isReturnModalOpen}
          onClose={() => setIsReturnModalOpen(false)}
          onReturn={handleReturnSuccess}
        />
      )}

      {/* Modal 3: Approve for Publication (aps-24-approve-dialog) */}
      {isApproveModalOpen && (
        <ApprovePublicationModal
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          onApprove={handleApproveSuccess}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0b0b0b] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#1fc16b]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Figma Screen Switcher Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 text-xs border border-white/10 max-w-[95vw] overflow-x-auto">
        <span className="text-gray-400 font-medium flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> Figma Screens:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setViewMode('dashboard');
              setIsSubmitModalOpen(false);
              setIsReturnModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              viewMode === 'dashboard' && !isSubmitModalOpen && !isReturnModalOpen && !isApproveModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Approvals Queue (aps-23)
          </button>
          <button
            onClick={() => {
              setViewMode('detail');
              setIsSubmitModalOpen(false);
              setIsReturnModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              viewMode === 'detail' && !isSubmitModalOpen && !isReturnModalOpen && !isApproveModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Review Detail (aps-24)
          </button>
          <button
            onClick={() => {
              setViewMode('self-blocked');
              setIsSubmitModalOpen(false);
              setIsReturnModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              viewMode === 'self-blocked'
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Self-Approval Blocked
          </button>
          <button
            onClick={() => {
              setIsSubmitModalOpen(true);
              setIsReturnModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              isSubmitModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Submit Dialog
          </button>
          <button
            onClick={() => {
              setViewMode('detail');
              setIsReturnModalOpen(true);
              setIsSubmitModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              isReturnModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Return Dialog
          </button>
          <button
            onClick={() => {
              setViewMode('detail');
              setIsApproveModalOpen(true);
              setIsSubmitModalOpen(false);
              setIsReturnModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              isApproveModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Approve Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
