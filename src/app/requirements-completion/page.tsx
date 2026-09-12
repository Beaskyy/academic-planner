'use client';

import React, { useState } from 'react';
import { SharedSidebar } from '@/features/shared/sidebar';
import { TopBar } from '@/features/shared/top-bar';
import { CapabilitySummary } from '@/features/auth/components/capability-summary';
import { CompleteCalendarAuthoring } from '@/features/calendar/components/complete-calendar-authoring';
import { StaffSourceUnavailable } from '@/features/offerings/components/staff-source-unavailable';
import { VirtualRoomModal } from '@/features/resources/components/virtual-room-modal';
import { ExclusiveResourceModal } from '@/features/resources/components/exclusive-resource-modal';
import { ReturnedSuccessorModal } from '@/features/approvals/components/returned-successor-modal';
import { ContextRestoredView } from '@/features/planning-home/components/context-restored-view';
import { PublicationRecovery } from '@/features/publication/components/publication-recovery';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Users,
  Video,
  Box,
  RotateCcw,
  Home,
  RefreshCw,
} from 'lucide-react';

export default function RequirementsCompletionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<
    'capability' | 'calendar' | 'staff' | 'virtual' | 'exclusive' | 'returned' | 'context' | 'publication'
  >('context');

  // Modal triggers
  const [virtualModalOpen, setVirtualModalOpen] = useState(false);
  const [exclusiveModalOpen, setExclusiveModalOpen] = useState(false);
  const [returnedModalOpen, setReturnedModalOpen] = useState(false);

  const flows = [
    { id: 'context', name: 'Context Restored', tag: 'aps-01 (3305:24956)', icon: Home },
    { id: 'capability', name: 'Capability Summary', tag: 'aps-cap (3305:24154)', icon: Layers },
    { id: 'calendar', name: 'Calendar Authoring', tag: 'aps-06 (3305:24200)', icon: Calendar },
    { id: 'staff', name: 'Staff Unavailable', tag: 'aps-16 (3305:24275)', icon: Users },
    { id: 'virtual', name: 'Virtual Room Modal', tag: 'aps-17 (3305:24468)', icon: Video },
    { id: 'exclusive', name: 'Exclusive Resource', tag: 'aps-17 (3305:24656)', icon: Box },
    { id: 'returned', name: 'Returned Revision', tag: 'aps-24 (3305:24844)', icon: RotateCcw },
    { id: 'publication', name: 'Publication Recovery', tag: 'aps-25 (3305:25261)', icon: RefreshCw },
  ] as const;

  return (
    <div className="min-h-screen bg-[#fafafa] flex w-full">
      {/* Sidebar */}
      <SharedSidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Section 11 Sticky Control Bar */}
        <div className="bg-white border-b border-[#ebebeb] px-4 sm:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-[#046aff]/10 text-[#046aff] font-bold">
              Section 11
            </span>
            <span className="font-bold text-[#0b0b0b] hidden sm:inline">
              Requirements Completion Flows
            </span>
          </div>

          {/* Flow Switcher Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {flows.map((f) => {
              const Icon = f.icon;
              const isActive = activeFlow === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFlow(f.id);
                    if (f.id === 'virtual') setVirtualModalOpen(true);
                    if (f.id === 'exclusive') setExclusiveModalOpen(true);
                    if (f.id === 'returned') setReturnedModalOpen(true);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#335cff] text-white shadow-xs'
                      : 'bg-gray-100 text-[#5c5c5c] hover:text-[#0b0b0b] hover:bg-gray-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Render Active Flow */}
        <div className="flex-1 flex flex-col">
          {activeFlow === 'context' && <ContextRestoredView />}
          {activeFlow === 'capability' && <CapabilitySummary />}
          {activeFlow === 'calendar' && <CompleteCalendarAuthoring />}
          {activeFlow === 'staff' && <StaffSourceUnavailable />}
          {activeFlow === 'publication' && <PublicationRecovery />}

          {/* Fallback for modal demos */}
          {(activeFlow === 'virtual' || activeFlow === 'exclusive' || activeFlow === 'returned') && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#046aff] flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-[20px] font-bold text-[#0b0b0b]">
                {activeFlow === 'virtual' && 'Virtual Room Modal Demo'}
                {activeFlow === 'exclusive' && 'Exclusive Resource Modal Demo'}
                {activeFlow === 'returned' && 'Returned Successor Revision Modal Demo'}
              </h2>
              <p className="text-[13px] text-[#5c5c5c] mt-2 mb-6">
                Click the button below to re-trigger the high-fidelity Figma modal.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (activeFlow === 'virtual') setVirtualModalOpen(true);
                  if (activeFlow === 'exclusive') setExclusiveModalOpen(true);
                  if (activeFlow === 'returned') setReturnedModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] shadow-xs cursor-pointer"
              >
                Re-open Modal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <VirtualRoomModal
        isOpen={virtualModalOpen}
        onClose={() => setVirtualModalOpen(false)}
      />

      <ExclusiveResourceModal
        isOpen={exclusiveModalOpen}
        onClose={() => setExclusiveModalOpen(false)}
      />

      <ReturnedSuccessorModal
        isOpen={returnedModalOpen}
        onClose={() => setReturnedModalOpen(false)}
      />
    </div>
  );
}
