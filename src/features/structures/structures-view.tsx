'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SharedSidebar } from '@/features/shared/sidebar';
import { StructuresTree } from './components/structures-tree';
import { StructureEditor } from './components/structure-editor';
import { ProgrammeDetail } from './components/programme-detail';
import { Sparkles } from 'lucide-react';

export type StructuresViewState = 'tree' | 'edit' | 'detail';

export function StructuresView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramView = searchParams.get('view') as StructuresViewState | null;
  const paramName = searchParams.get('name') || 'BSc Computer Science';

  const [currentView, setCurrentView] = useState<StructuresViewState>('tree');
  const [selectedName, setSelectedName] = useState(paramName);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (paramView && ['tree', 'edit', 'detail'].includes(paramView)) {
      setCurrentView(paramView);
    }
  }, [paramView]);

  const switchView = (view: StructuresViewState, name?: string) => {
    if (name) setSelectedName(name);
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'tree') {
      newParams.delete('view');
      newParams.delete('name');
    } else {
      newParams.set('view', view);
      if (name) newParams.set('name', name);
    }
    const queryString = newParams.toString();
    router.replace(queryString ? `/structures?${queryString}` : '/structures');
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
        {currentView === 'tree' && (
          <StructuresTree
            onAddStructure={() => switchView('edit', 'New Academic Structure')}
            onSelectProgramme={(name) => switchView('detail', name)}
            onEditStructure={(name) => switchView('edit', name)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'edit' && (
          <StructureEditor
            initialName={selectedName}
            onCancel={() => switchView('tree')}
            onSaveDraft={() => switchView('tree')}
            onSubmitForReview={() => switchView('tree')}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        )}

        {currentView === 'detail' && (
          <ProgrammeDetail
            programmeName={selectedName}
            onBack={() => switchView('tree')}
            onEdit={() => switchView('edit', selectedName)}
            onCreateRevision={() => switchView('edit', `${selectedName} Revision`)}
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
          onClick={() => switchView('tree')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'tree'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Structure Tree
        </button>
        <button
          onClick={() => switchView('edit')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'edit'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Structure Editor
        </button>
        <button
          onClick={() => switchView('detail')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
            currentView === 'detail'
              ? 'bg-[#046aff] text-white shadow-xs'
              : 'text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
          }`}
        >
          Programme Detail
        </button>
      </div>
    </div>
  );
}
