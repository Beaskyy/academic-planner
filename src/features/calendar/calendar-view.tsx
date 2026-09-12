'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SharedSidebar } from '@/features/shared/sidebar';
import { SessionManager } from './components/session-manager';
import { CalendarDetail } from './components/calendar-detail';
import { ImpactPreview } from './components/impact-preview';
import { CompleteCalendarAuthoring } from './components/complete-calendar-authoring';
import { CreateSuccessorVersion } from './components/create-successor-version';
import { Sparkles } from 'lucide-react';

export type CalendarViewState = 'sessions' | 'detail' | 'impact' | 'complete-authoring' | 'successor';

export function CalendarView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as CalendarViewState | null;
  const paramPeriod = searchParams.get('period') || 'Semester 1';

  const [currentView, setCurrentView] = useState<CalendarViewState>('sessions');
  const [selectedPeriod, setSelectedPeriod] = useState(paramPeriod);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (paramView && ['sessions', 'detail', 'impact', 'complete-authoring', 'successor'].includes(paramView)) {
      setCurrentView(paramView);
    }
  }, [paramView]);


  const switchView = (view: CalendarViewState, period?: string) => {
    if (period) setSelectedPeriod(period);
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'sessions') {
      newParams.delete('view');
      newParams.delete('period');
    } else {
      newParams.set('view', view);
      if (period) newParams.set('period', period);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/calendar?${queryString}` : '/calendar');
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
        {currentView === 'sessions' && (
          <SessionManager
            onCreateSession={() => switchView('detail', 'Semester 1')}
            onSelectPeriod={(p) => switchView('detail', p)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'detail' && (
          <CalendarDetail
            periodName={selectedPeriod}
            onBack={() => switchView('sessions')}
            onPreviewImpact={() => switchView('impact')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'impact' && (
          <ImpactPreview
            onBack={() => switchView('detail', selectedPeriod)}
            onSubmit={() => switchView('sessions')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'complete-authoring' && (
          <CompleteCalendarAuthoring
            onBackToSessions={() => switchView('sessions')}
          />
        )}

        {currentView === 'successor' && (
          <CreateSuccessorVersion
            onCancel={() => switchView('sessions')}
            onCreateSuccessor={() => switchView('sessions')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}
      </main>

      {/* ── State Switcher Floating Dock (for review & QA) ─────────── */}
      <div className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#ebebeb] shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs select-none flex-wrap">
        <div className="flex items-center gap-1.5 text-[#808080] pr-2 border-r border-[#ebebeb] font-medium hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#046aff]" />
          <span>Figma Screen:</span>
        </div>
        <button
          onClick={() => switchView('sessions')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'sessions'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Session Manager
        </button>
        <button
          onClick={() => switchView('detail')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'detail'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Calendar Detail
        </button>
        <button
          onClick={() => switchView('complete-authoring')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'complete-authoring'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Complete Authoring
        </button>
        <button
          onClick={() => switchView('successor')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'successor'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#046aff] hover:bg-[#eff6ff]'
          }`}
        >
          APS-25 Successor
        </button>
        <button
          onClick={() => switchView('impact')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'impact'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Impact Preview
        </button>
      </div>
    </div>
  );
}
