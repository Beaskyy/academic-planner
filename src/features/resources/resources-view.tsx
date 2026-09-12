'use client';

import React, { useState } from 'react';
import { Sidebar } from '../shared/sidebar';
import { TopBar } from '../shared/top-bar';
import { PhysicalVenues } from './components/physical-venues';
import { VirtualRooms } from './components/virtual-rooms';
import { ExclusiveResources } from './components/exclusive-resources';
import { AddVenueModal } from './components/add-venue-modal';
import { VirtualRoomModal } from './components/virtual-room-modal';
import { ExclusiveResourceModal } from './components/exclusive-resource-modal';
import { Plus, ChevronRight, Sparkles } from 'lucide-react';

type ResourceTab = 'physical' | 'virtual' | 'exclusive';

const tabConfig: Record<ResourceTab, { label: string; btnLabel: string }> = {
  physical: { label: 'Physical Venues', btnLabel: 'Add Venue' },
  virtual: { label: 'Virtual Rooms', btnLabel: 'Add Virtual Room' },
  exclusive: { label: 'Exclusive Resources', btnLabel: 'Add Resource' },
};

export function ResourcesView() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('physical');
  const [isAddVenueOpen, setIsAddVenueOpen] = useState(false);
  const [isAddVirtualOpen, setIsAddVirtualOpen] = useState(false);
  const [isAddExclusiveOpen, setIsAddExclusiveOpen] = useState(false);

  const breadcrumb = 'Academic Planning > Resources';

  const handlePrimaryAction = () => {
    if (activeTab === 'physical') {
      setIsAddVenueOpen(true);
    } else if (activeTab === 'virtual') {
      setIsAddVirtualOpen(true);
    } else if (activeTab === 'exclusive') {
      setIsAddExclusiveOpen(true);
    }
  };


  return (
    <div className="flex h-screen bg-[#fafafa] text-[#1f1f1f] font-['Inter',sans-serif] antialiased overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="resources" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-0 pb-24">
          {/* ── PageHeader ─────────────────────────────────────────────────── */}
          {/* Figma node 3305:22487 — flex justify-between, button top-right */}
          <div className="flex items-center justify-between mb-[28px]">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-medium text-[#808080]">{breadcrumb}</p>
              <h1 className="text-[28px] font-bold text-[#0b0b0b] leading-tight">
                Resources &amp; Venues
              </h1>
            </div>

            {/* Primary CTA — Figma primary-base #335cff, radius-10, text-white */}
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-1 bg-[#335cff] hover:bg-[#1a45e8] text-white text-[14px] font-medium rounded-[10px] px-[14px] py-[10px] shadow-sm transition-colors whitespace-nowrap"
            >
              <span>{tabConfig[activeTab].btnLabel}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* ── TabGroup ────────────────────────────────────────────────────── */}
          {/* Figma node 3305:22492 — gap-6, border-b #f5f5f5 */}
          <div className="flex items-start gap-6 border-b border-[#f5f5f5] mb-6">
            {(['physical', 'virtual', 'exclusive'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-[14px] whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-[#046aff] text-[#046aff] font-semibold'
                    : 'border-transparent text-[#808080] font-medium hover:text-[#1f1f1f]'
                }`}
              >
                {tabConfig[tab].label}
              </button>
            ))}
          </div>

          {/* ── Active Tab Content ───────────────────────────────────────── */}
          {activeTab === 'physical' && (
            <PhysicalVenues />
          )}
          {activeTab === 'virtual' && <VirtualRooms />}
          {activeTab === 'exclusive' && <ExclusiveResources />}
        </main>
      </div>

      {/* Add Physical Venue Modal (aps-17-venue-edit) */}
      {isAddVenueOpen && (
        <AddVenueModal
          isOpen={isAddVenueOpen}
          onClose={() => setIsAddVenueOpen(false)}
          onSave={() => setIsAddVenueOpen(false)}
        />
      )}

      {/* Add Virtual Room Modal (aps-17-virtual-room-edit, node 3305:24468) */}
      <VirtualRoomModal
        isOpen={isAddVirtualOpen}
        onClose={() => setIsAddVirtualOpen(false)}
      />

      {/* Add Exclusive Resource Modal (aps-17-exclusive-resource-edit, node 3305:24656) */}
      <ExclusiveResourceModal
        isOpen={isAddExclusiveOpen}
        onClose={() => setIsAddExclusiveOpen(false)}
      />

      {/* Figma Screen Switcher Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-50 text-xs border border-white/10">
        <span className="text-gray-400 font-medium flex items-center gap-1.5 hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> Figma Screens:
        </span>
        <div className="flex items-center gap-1">
          {(['physical', 'virtual', 'exclusive'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsAddVenueOpen(false); setIsAddVirtualOpen(false); setIsAddExclusiveOpen(false); }}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === tab && !isAddVenueOpen && !isAddVirtualOpen && !isAddExclusiveOpen
                  ? 'bg-[#335cff] text-white shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab === 'physical' ? 'Physical' : tab === 'virtual' ? 'Virtual' : 'Exclusive'}
            </button>
          ))}
          <button
            onClick={() => { setActiveTab('virtual'); setIsAddVirtualOpen(true); }}
            className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
              isAddVirtualOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            + Virtual Modal (3305:24468)
          </button>
          <button
            onClick={() => { setActiveTab('exclusive'); setIsAddExclusiveOpen(true); }}
            className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
              isAddExclusiveOpen
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            + Exclusive Modal (3305:24656)
          </button>
        </div>
      </div>
    </div>
  );
}

