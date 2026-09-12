'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SharedSidebar } from '@/features/shared/sidebar';
import { OfferingsDashboard } from './components/offerings-dashboard';
import { OfferingEditor } from './components/offering-editor';
import { StaffSearchModal, StaffMember } from './components/staff-search-modal';
import { OfferingEditorBlocked } from './components/offering-editor-blocked';
import { OverrideInvalidatedModal } from './components/override-invalidated-modal';
import { Sparkles } from 'lucide-react';

export type OfferingsViewState = 'dashboard' | 'edit' | 'staff-search' | 'blocked';

export function OfferingsView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as OfferingsViewState | null;
  const paramSection = searchParams.get('section') || 'CSC 301-A';

  const [currentView, setCurrentView] = useState<OfferingsViewState>('dashboard');
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(paramSection);
  const [leadInstructor, setLeadInstructor] = useState({
    name: 'Dr. Charles Ononiwu',
    department: 'Dept. of Computer Science',
    workload: 'Current workload: 2/3 Courses',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      paramView &&
      ['dashboard', 'edit', 'staff-search', 'blocked'].includes(paramView)
    ) {
      setCurrentView(paramView);
    }
    if (paramView === 'override' as any) {
      setIsOverrideModalOpen(true);
    }
  }, [paramView]);

  const switchView = (view: OfferingsViewState, sectionCode?: string) => {
    if (sectionCode) setSelectedSection(sectionCode);
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'dashboard') {
      newParams.delete('view');
      newParams.delete('section');
    } else {
      newParams.set('view', view);
      if (sectionCode) newParams.set('section', sectionCode);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/offerings?${queryString}` : '/offerings');
  };

  const handleSelectStaff = (staff: StaffMember) => {
    setLeadInstructor({
      name: staff.name,
      department: `Dept. of ${staff.department}`,
      workload: `Current workload: ${staff.coursesCount}/3 Courses`,
    });
    switchView('edit', selectedSection);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex w-full">
      {/* Shared Sidebar */}
      <SharedSidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace */}
      <main className="flex-1 min-w-0 flex flex-col">
        {currentView === 'dashboard' && (
          <OfferingsDashboard
            onCreateOffering={() => switchView('edit', 'CSC 101-A')}
            onEditOffering={(code) => switchView('edit', code)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'edit' && (
          <OfferingEditor
            sectionCode={selectedSection}
            leadInstructor={leadInstructor}
            onCancel={() => switchView('dashboard')}
            onSave={() => switchView('dashboard')}
            onChangeStaff={() => switchView('staff-search')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'blocked' && (
          <OfferingEditorBlocked
            onCancel={() => switchView('dashboard')}
            onSaveBlockedDraft={() => switchView('dashboard')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'staff-search' && (
          <StaffSearchModal
            onSelectStaff={handleSelectStaff}
            onCancel={() => switchView('edit', selectedSection)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        <OverrideInvalidatedModal
          isOpen={isOverrideModalOpen}
          onClose={() => setIsOverrideModalOpen(false)}
          onAcknowledge={() => setIsOverrideModalOpen(false)}
          onRequestNewOverride={() => {
            setIsOverrideModalOpen(false);
            switchView('edit');
          }}
        />
      </main>

      {/* ── State Switcher Floating Dock (for review & QA) ─────────── */}
      <div className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#ebebeb] shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs select-none flex-wrap">
        <div className="flex items-center gap-1.5 text-[#808080] pr-2 border-r border-[#ebebeb] font-medium hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#046aff]" />
          <span>Figma Screen:</span>
        </div>
        <button
          onClick={() => switchView('dashboard')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'dashboard'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Offerings Dashboard
        </button>
        <button
          onClick={() => switchView('edit')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'edit'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Offering Editor
        </button>
        <button
          onClick={() => switchView('blocked')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'blocked'
              ? 'bg-[#ef4444] text-white shadow-xs'
              : 'text-[#ef4444] hover:bg-[#fef2f2]'
          }`}
        >
          APS-15 Blocked
        </button>
        <button
          onClick={() => setIsOverrideModalOpen(true)}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            isOverrideModalOpen
              ? 'bg-[#c2410c] text-white shadow-xs'
              : 'text-[#c2410c] hover:bg-[#fff7ed]'
          }`}
        >
          APS-21 Override Modal
        </button>
        <button
          onClick={() => switchView('staff-search')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'staff-search'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Assign Staff Search
        </button>
      </div>
    </div>
  );
}
