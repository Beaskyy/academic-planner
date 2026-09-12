'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SharedSidebar } from '@/features/shared/sidebar';
import { CurriculaBrowser } from './components/curricula-browser';
import { CurriculumEditor } from './components/curriculum-editor';
import { CurriculumDiff } from './components/curriculum-diff';
import { CohortMigrationWizard } from './components/cohort-migration-wizard';
import { AcademicRulesView } from './components/academic-rules-view';
import { CurriculumEditorBlocked } from './components/curriculum-editor-blocked';
import { Sparkles } from 'lucide-react';

export type CurriculaViewState = 'browser' | 'editor' | 'diff' | 'migration' | 'rules' | 'blocked';

export function CurriculaView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as CurriculaViewState | null;

  const [currentView, setCurrentView] = useState<CurriculaViewState>('browser');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      paramView &&
      ['browser', 'editor', 'diff', 'migration', 'rules', 'blocked'].includes(paramView)
    ) {
      setCurrentView(paramView);
    }
  }, [paramView]);

  const switchView = (view: CurriculaViewState) => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'browser') {
      newParams.delete('view');
    } else {
      newParams.set('view', view);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/curricula?${queryString}` : '/curricula');
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
        {currentView === 'browser' && (
          <CurriculaBrowser
            onRevise={() => switchView('editor')}
            onNewCurriculum={() => switchView('editor')}
            onSelectRulesTab={() => switchView('rules')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'editor' && (
          <CurriculumEditor
            onCancel={() => switchView('browser')}
            onCompareDiff={() => switchView('diff')}
            onSubmitForReview={() => switchView('migration')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'diff' && (
          <CurriculumDiff
            onBack={() => switchView('editor')}
            onProceedToMigration={() => switchView('migration')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'migration' && (
          <CohortMigrationWizard
            onCancel={() => switchView('browser')}
            onFinish={() => switchView('browser')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'rules' && (
          <AcademicRulesView
            onBackToCurricula={() => switchView('browser')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'blocked' && (
          <CurriculumEditorBlocked
            onCancel={() => switchView('browser')}
            onSaveDraft={() => switchView('browser')}
            onCompareDiff={() => switchView('diff')}
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
          onClick={() => switchView('browser')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'browser'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Curricula Browser
        </button>
        <button
          onClick={() => switchView('editor')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'editor'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Curriculum Draft
        </button>
        <button
          onClick={() => switchView('blocked')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'blocked'
              ? 'bg-[#ef4444] text-white shadow-xs'
              : 'text-[#ef4444] hover:bg-[#fef2f2]'
          }`}
        >
          APS-10 Blocked
        </button>
        <button
          onClick={() => switchView('diff')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'diff'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Compare Diff
        </button>
        <button
          onClick={() => switchView('migration')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'migration'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Cohort Migration
        </button>
        <button
          onClick={() => switchView('rules')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'rules'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Academic Rules
        </button>
      </div>
    </div>
  );
}
