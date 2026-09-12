'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar } from './components/sidebar';
import { ActiveDashboard } from './components/active-dashboard';
import { EmptyStateDashboard } from './components/empty-state-dashboard';
import { PreparePeriodView } from './components/prepare-period-view';
import { PlanReadyDashboard } from './components/plan-ready-dashboard';
import { Sparkles } from 'lucide-react';

export type PlanningHomeState = 'active' | 'empty' | 'prepare' | 'ready';

export function PlanningHomeView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as PlanningHomeState | null;

  const [currentView, setCurrentView] = useState<PlanningHomeState>('active');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (paramView && ['active', 'empty', 'prepare', 'ready'].includes(paramView)) {
      setCurrentView(paramView);
    }
  }, [paramView]);

  const switchView = (view: PlanningHomeState) => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'active') {
      newParams.delete('view');
    } else {
      newParams.set('view', view);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/?${queryString}` : '/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex w-full">
      {/* Sidebar (desktop persistent + mobile drawer) */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        minimalContext={currentView !== 'active' && currentView !== 'ready'}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {currentView === 'active' && (
          <ActiveDashboard
            onPreparePeriod={() => switchView('prepare')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'empty' && (
          <EmptyStateDashboard
            onPreparePeriod={() => switchView('prepare')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'prepare' && (
          <PreparePeriodView
            onCancel={() => switchView('active')}
            onSave={() => switchView('active')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'ready' && (
          <PlanReadyDashboard
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}
      </main>

      {/* ── State Switcher Floating Dock (for review & QA) ─────────── */}
      <div className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#ebebeb] shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs select-none flex-wrap">
        <div className="flex items-center gap-1.5 text-[#808080] pr-2 border-r border-[#ebebeb] font-medium hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#046aff]" />
          <span>Figma State:</span>
        </div>
        <button
          onClick={() => switchView('active')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'active'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Active Plan
        </button>
        <button
          onClick={() => switchView('ready')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'ready'
              ? 'bg-[#1fc16b] text-white shadow-xs'
              : 'text-[#1fc16b] hover:bg-[#f0fdf4]'
          }`}
        >
          APS-01 Plan Ready
        </button>
        <button
          onClick={() => switchView('empty')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'empty'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Empty State
        </button>
        <button
          onClick={() => switchView('prepare')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'prepare'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Prepare Period
        </button>
      </div>
    </div>
  );
}
