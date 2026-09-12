'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SharedSidebar } from '@/features/shared/sidebar';
import { CourseCatalogue } from './components/course-catalogue';
import { CourseEditor } from './components/course-editor';
import { CourseEditorBlocked } from './components/course-editor-blocked';
import { Sparkles } from 'lucide-react';

export type CoursesViewState = 'catalogue' | 'edit' | 'blocked';

export function CoursesView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as CoursesViewState | null;
  const paramCode = searchParams.get('code') || 'CSC 301';

  const [currentView, setCurrentView] = useState<CoursesViewState>('catalogue');
  const [selectedCode, setSelectedCode] = useState(paramCode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (paramView && ['catalogue', 'edit', 'blocked'].includes(paramView)) {
      setCurrentView(paramView);
    }
  }, [paramView]);

  const switchView = (view: CoursesViewState, code?: string) => {
    if (code) setSelectedCode(code);
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'catalogue') {
      newParams.delete('view');
      newParams.delete('code');
    } else {
      newParams.set('view', view);
      if (code) newParams.set('code', code);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/courses?${queryString}` : '/courses');
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
        {currentView === 'catalogue' && (
          <CourseCatalogue
            onAddCourse={() => switchView('edit', 'NEW 101')}
            onEditCourse={(code) => switchView('edit', code)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'edit' && (
          <CourseEditor
            courseCode={selectedCode}
            onCancel={() => switchView('catalogue')}
            onSaveDraft={() => switchView('catalogue')}
            onSubmit={() => switchView('catalogue')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'blocked' && (
          <CourseEditorBlocked
            courseCode={selectedCode}
            onCancel={() => switchView('catalogue')}
            onSaveBlockedDraft={() => switchView('catalogue')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}
      </main>

      {/* ── State Switcher Floating Dock (for review & QA) ─────────── */}
      <div className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#ebebeb] shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs select-none">
        <div className="flex items-center gap-1.5 text-[#808080] pr-2 border-r border-[#ebebeb] font-medium hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#046aff]" />
          <span>Figma Screen:</span>
        </div>
        <button
          onClick={() => switchView('catalogue')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'catalogue'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Course Catalogue
        </button>
        <button
          onClick={() => switchView('edit')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'edit'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Course Editor
        </button>
        <button
          onClick={() => switchView('blocked')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'blocked'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          APS-08 Blocked
        </button>
      </div>
    </div>
  );
}
