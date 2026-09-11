'use client';

import React, { useState } from 'react';
import { Sidebar } from '../shared/sidebar';
import { TopBar } from '../shared/top-bar';
import { TimetableGrid } from './components/timetable-grid';
import { CreateMeetingModal } from './components/create-meeting-modal';
import { DatedExceptionModal } from './components/dated-exception-modal';
import { ScheduleValidation } from './components/schedule-validation';
import { OverrideModal } from './components/override-modal';
import { ImpactAssessment } from './components/impact-assessment';
import {
  Calendar,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Layers,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export function TimetableView() {
  const [activeScreen, setActiveScreen] = useState<'grid' | 'validation' | 'impact'>('grid');
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafa] text-[#1f1f1f] font-['Inter',sans-serif] antialiased overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="timetable" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-0 pb-24">
          {/* ── PageHeader ─────────────────────────────────────────────── */}
          {/* Figma node 3305:22896 — button always visible top-right */}
          <div className="flex items-center justify-between mb-[28px]">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-medium text-[#808080]">Academic Planning &gt; Schedule</p>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight">
                Teaching Timetable — Semester 1 2026/27
              </h1>
            </div>
            {activeScreen === 'grid' && (
              <button
                type="button"
                onClick={() => setIsMeetingModalOpen(true)}
                className="inline-flex items-center gap-1 bg-[#335cff] hover:bg-[#1a45e8] text-white text-[14px] font-medium rounded-[10px] px-[14px] py-[10px] shadow-sm transition-colors whitespace-nowrap"
              >
                <span>Schedule Meeting</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* ── Active Screen Content ────────────────────────────────── */}
          {activeScreen === 'grid' && (
            <TimetableGrid
              onScheduleMeeting={() => setIsMeetingModalOpen(true)}
              onAddException={() => setIsExceptionModalOpen(true)}
              onViewValidation={() => setActiveScreen('validation')}
              onViewImpact={() => setActiveScreen('impact')}
            />
          )}

          {activeScreen === 'validation' && (
            <ScheduleValidation
              onBackToTimetable={() => setActiveScreen('grid')}
              onOpenOverride={() => setIsOverrideModalOpen(true)}
              onOpenImpact={() => setActiveScreen('impact')}
            />
          )}

          {activeScreen === 'impact' && (
            <ImpactAssessment
              onBackToTimetable={() => setActiveScreen('grid')}
              onPublishSuccess={() => setActiveScreen('grid')}
            />
          )}
        </main>
      </div>

      {/* Schedule Meeting Modal (aps-19-meeting-create) */}
      {isMeetingModalOpen && (
        <CreateMeetingModal
          isOpen={isMeetingModalOpen}
          onClose={() => setIsMeetingModalOpen(false)}
          onOpenOverride={() => setIsOverrideModalOpen(true)}
        />
      )}

      {/* Dated Exception Modal (aps-19-exception) */}
      {isExceptionModalOpen && (
        <DatedExceptionModal
          isOpen={isExceptionModalOpen}
          onClose={() => setIsExceptionModalOpen(false)}
        />
      )}

      {/* Override Warning Modal (aps-21-override) */}
      {isOverrideModalOpen && (
        <OverrideModal
          isOpen={isOverrideModalOpen}
          onClose={() => setIsOverrideModalOpen(false)}
        />
      )}

      {/* Floating Figma Screen Switcher Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 text-xs border border-white/10">
        <span className="text-gray-400 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> Figma Screens:
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setActiveScreen('grid');
              setIsMeetingModalOpen(false);
              setIsExceptionModalOpen(false);
              setIsOverrideModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              activeScreen === 'grid' &&
              !isMeetingModalOpen &&
              !isExceptionModalOpen &&
              !isOverrideModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Timetable (aps-18)
          </button>
          <button
            onClick={() => {
              setActiveScreen('grid');
              setIsMeetingModalOpen(true);
              setIsExceptionModalOpen(false);
              setIsOverrideModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              isMeetingModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Schedule Modal (aps-19)
          </button>
          <button
            onClick={() => {
              setActiveScreen('grid');
              setIsExceptionModalOpen(true);
              setIsMeetingModalOpen(false);
              setIsOverrideModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              isExceptionModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Exception Modal (aps-19)
          </button>
          <button
            onClick={() => {
              setActiveScreen('validation');
              setIsMeetingModalOpen(false);
              setIsExceptionModalOpen(false);
              setIsOverrideModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              activeScreen === 'validation' && !isOverrideModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Validation (aps-20)
          </button>
          <button
            onClick={() => {
              setIsOverrideModalOpen(true);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              isOverrideModalOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Override Modal (aps-21)
          </button>
          <button
            onClick={() => {
              setActiveScreen('impact');
              setIsMeetingModalOpen(false);
              setIsExceptionModalOpen(false);
              setIsOverrideModalOpen(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              activeScreen === 'impact'
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Impact Review (aps-22)
          </button>
        </div>
      </div>
    </div>
  );
}
