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
import { PublicationReviewResponseData } from '@/types/publication-reviews';
import {
  useApprovePublicationReview,
  useReturnPublicationReview,
} from '@/hooks/use-publication-reviews';
import { formatReviewTitle, formatStatusLabel } from './review-display';

export type ApprovalsViewMode = 'dashboard' | 'detail' | 'self-blocked';

export function ApprovalsView() {
  const [viewMode, setViewMode] = useState<ApprovalsViewMode>('dashboard');
  const [selectedReview, setSelectedReview] =
    useState<PublicationReviewResponseData | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const approveReview = useApprovePublicationReview();
  const returnReview = useReturnPublicationReview();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectProposal = (review: PublicationReviewResponseData) => {
    setSelectedReview(review);
    setViewMode('detail');
  };

  const handleSelectOwnProposal = (review: PublicationReviewResponseData) => {
    setSelectedReview(review);
    setViewMode('self-blocked');
  };

  const handleReturn = (reason: string) => {
    if (!selectedReview) return;
    returnReview.mutate(
      {
        reviewId: selectedReview.id,
        payload: {
          row_version: selectedReview.row_version,
          reason,
        },
      },
      {
        onSuccess: (response) => {
          setSelectedReview(response.data);
          setIsReturnModalOpen(false);
          showToast(
            response.message ||
              'Proposal successfully returned to Maker with feedback.',
          );
          setViewMode('dashboard');
        },
      },
    );
  };

  const handleApprove = (reason?: string) => {
    if (!selectedReview) return;
    approveReview.mutate(
      {
        reviewId: selectedReview.id,
        payload: {
          row_version: selectedReview.row_version,
          reason: reason || null,
        },
      },
      {
        onSuccess: (response) => {
          setSelectedReview(response.data);
          setIsApproveModalOpen(false);
          showToast(
            response.message ||
              'Proposal approved and published to live catalogue!',
          );
          setViewMode('dashboard');
        },
      },
    );
  };

  const handleSubmitSuccess = () => {
    showToast('Draft successfully submitted for governance review.');
    setViewMode('dashboard');
  };

  return (
    <div className="flex h-screen bg-[#fafafa] text-[#1f1f1f] font-['Inter',sans-serif] antialiased overflow-hidden">
      <Sidebar
        activeItem="approvals"
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-0 pb-28">
          {viewMode === 'dashboard' && (
            <ApprovalsDashboard
              onSelectProposal={handleSelectProposal}
              onSelectOwnProposal={handleSelectOwnProposal}
              onSubmitNewReview={() => setIsSubmitModalOpen(true)}
            />
          )}

          {viewMode === 'detail' && selectedReview && (
            <ApprovalDetail
              reviewId={selectedReview.id}
              onBackToQueue={() => setViewMode('dashboard')}
              onOpenReturnDialog={() => setIsReturnModalOpen(true)}
              onOpenApproveDialog={() => setIsApproveModalOpen(true)}
              onSwitchToMakerView={() => setViewMode('self-blocked')}
            />
          )}

          {viewMode === 'self-blocked' && selectedReview && (
            <SelfApprovalBlocked
              reviewId={selectedReview.id}
              onBackToQueue={() => setViewMode('dashboard')}
              onSwitchToApproverView={() => setViewMode('detail')}
            />
          )}
        </main>
      </div>

      {isSubmitModalOpen && (
        <SubmitReviewModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleSubmitSuccess}
        />
      )}

      {isReturnModalOpen && (
        <ReturnCandidateModal
          isOpen={isReturnModalOpen}
          onClose={() => setIsReturnModalOpen(false)}
          onReturn={handleReturn}
          title={
            selectedReview ? formatReviewTitle(selectedReview) : 'Publication review'
          }
          statusLabel={
            selectedReview
              ? formatStatusLabel(selectedReview.status)
              : 'AWAITING REVIEW'
          }
          isPending={returnReview.isPending}
          errorMessage={returnReview.error?.message}
        />
      )}

      {isApproveModalOpen && (
        <ApprovePublicationModal
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          onApprove={handleApprove}
          title={
            selectedReview ? formatReviewTitle(selectedReview) : 'Publication review'
          }
          statusLabel={
            selectedReview
              ? formatStatusLabel(selectedReview.status)
              : 'AWAITING REVIEW'
          }
          isPending={approveReview.isPending}
          errorMessage={approveReview.error?.message}
        />
      )}

      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0b0b0b] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#1fc16b]" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              viewMode === 'dashboard' &&
              !isSubmitModalOpen &&
              !isReturnModalOpen &&
              !isApproveModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Approvals Queue (aps-23)
          </button>
          <button
            onClick={() => {
              setViewMode(selectedReview ? 'detail' : 'dashboard');
              setIsSubmitModalOpen(false);
              setIsReturnModalOpen(false);
              setIsApproveModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
              viewMode === 'detail' &&
              !isSubmitModalOpen &&
              !isReturnModalOpen &&
              !isApproveModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Review Detail (aps-24)
          </button>
          <button
            onClick={() => {
              setViewMode(selectedReview ? 'self-blocked' : 'dashboard');
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
              if (selectedReview) setViewMode('detail');
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
              if (selectedReview) setViewMode('detail');
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
