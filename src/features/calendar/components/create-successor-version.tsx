'use client';

import React, { useState } from 'react';
import { Search, Menu, Circle } from 'lucide-react';

interface CreateSuccessorVersionProps {
  onCancel: () => void;
  onCreateSuccessor: () => void;
  onOpenMobileMenu?: () => void;
}

type ToggleTab = 'base' | 'delivery' | 'audit';

const versions = [
  {
    id: 'v4.0',
    label: 'v4.0 — Selected Base',
    sublabel: 'Current published version remains authoritative',
    description: 'Successor draft will be v4.1 and future-effective',
    badge: 'Selected',
    isSelected: true,
    workflow: [
      '1. Create draft from v4.0',
      '2. Edit future-effective values',
      '3. Validate',
      '4. Independent review',
      '5. Publish',
    ],
    change: '- Shifted Semester 1 start date to October 9, 2026.',
    hasLine: true,
  },
  {
    id: 'v3.1',
    label: 'v3.1',
    sublabel: 'Updated Reading Week block start',
    description: 'Published on Jan 05, 2026 by Marcus Cole',
    badge: 'Published',
    isSelected: false,
    hasLine: true,
  },
  {
    id: 'v3.0',
    label: 'v3.0',
    sublabel: 'Major draft calendar setup for 26/27',
    description: 'Published on Dec 18, 2025 by Laura Hills',
    badge: 'Published',
    isSelected: false,
    hasLine: true,
  },
  {
    id: 'v2.0',
    label: 'v2.0',
    sublabel: 'Academic Year 2025/2026 Archive',
    description: 'Published on Jun 15, 2025 by System Admin',
    badge: 'Archived',
    isSelected: false,
    hasLine: false,
  },
];

const badgeClass = (badge: string) => {
  switch (badge) {
    case 'Selected':
      return 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
    case 'Published':
      return 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]';
    case 'Archived':
      return 'bg-[#f5f5f5] text-[#808080] border-[#e5e7eb]';
    default:
      return 'bg-[#f5f5f5] text-[#808080] border-[#e5e7eb]';
  }
};

const syncBadgeClass = 'bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]';

export function CreateSuccessorVersion({
  onCancel,
  onCreateSuccessor,
  onOpenMobileMenu,
}: CreateSuccessorVersionProps) {
  const [activeTab, setActiveTab] = useState<ToggleTab>('base');

  const tabs: { key: ToggleTab; label: string }[] = [
    { key: 'base', label: 'Choose immutable base version' },
    { key: 'delivery', label: 'Delivery Status' },
    { key: 'audit', label: 'Audit Logs' },
  ];

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="lg:hidden p-1.5 rounded-lg border border-[#ebebeb] text-[#1f1f1f] hover:bg-[#f5f5f5]"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Create Successor Version
            </h1>
          </div>

          {/* Tab Toggle */}
          <div className="inline-flex bg-[#f5f5f5] rounded-[10px] p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-white text-[#1f1f1f] shadow-sm'
                    : 'text-[#808080] hover:text-[#1f1f1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Row ─────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-[#f0f0f0]">
        <div className="max-w-[1440px] mx-auto flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-[320px] bg-white border border-[#ebebeb] rounded-[8px] px-3 h-9">
            <Search className="w-4 h-4 text-[#808080] flex-shrink-0" />
            <input
              type="text"
              placeholder="Select a published version to use as the successor draft base..."
              className="flex-1 min-w-0 text-[12px] text-[#1f1f1f] placeholder:text-[#a0a0a0] outline-none bg-transparent"
            />
          </div>
          <button className="h-9 px-4 border border-[#046aff] text-[#046aff] text-[13px] font-medium rounded-[8px] hover:bg-[#f0f8ff] transition-colors cursor-pointer">
            Filter by Status
          </button>
          <button className="h-9 px-4 border border-[#ebebeb] bg-white text-[#1f1f1f] text-[13px] font-medium rounded-[8px] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
            Sort by Publish Date
          </button>
        </div>
      </div>

      {/* ── Timeline Workspace ─────────────────────────────────────── */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Timeline List */}
          <div className="flex-1 min-w-0 flex flex-col">
            {versions.map((v, idx) => (
              <div key={v.id} className="flex gap-4">
                {/* Timeline graphic */}
                <div className="flex flex-col items-center pt-1 w-6 flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 border-2 ${
                      v.isSelected
                        ? 'bg-[#046aff] border-[#046aff]'
                        : 'bg-white border-[#d1d5db]'
                    }`}
                  />
                  {v.hasLine && <div className="w-0.5 flex-1 bg-[#e5e7eb] mt-1" style={{ minHeight: 64 }} />}
                </div>

                {/* Version card */}
                <div className={`flex-1 mb-4 bg-white border rounded-[12px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.03)] transition-all ${
                  v.isSelected ? 'border-[#046aff] shadow-[0_0_0_3px_rgba(4,106,255,0.08)]' : 'border-[#f0f0f0] hover:border-[#d1d5db]'
                }`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-bold text-[#1f1f1f]">{v.label}</span>
                        {v.sublabel && (
                          <span className="text-[13px] text-[#808080]">{v.sublabel}</span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#808080] mt-1">{v.description}</p>
                    </div>
                    <span className={`inline-flex items-center border text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${badgeClass(v.badge)}`}>
                      {v.badge}
                    </span>
                  </div>

                  {v.workflow && (
                    <div className="mt-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[8px] p-3">
                      <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-1.5">Successor workflow</p>
                      <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                        {v.workflow.join(' → ')}
                      </p>
                      {v.change && (
                        <p className="text-[12px] text-[#046aff] mt-1.5 font-medium">{v.change}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detail Column — Selected version info */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white border border-[#f0f0f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.03)]">
              <h3 className="text-[15px] font-semibold text-[#0b0b0b] mb-5">New Successor Draft Details</h3>

              {/* Metadata */}
              <div className="flex flex-col gap-3 mb-5">
                {[
                  { label: 'Draft Version', value: 'v4.1 (not yet authoritative)' },
                  { label: 'Base Version', value: 'v4.0 — immutable' },
                  { label: 'Effective Time', value: 'Schedule during approval' },
                ].map((meta) => (
                  <div key={meta.label} className="flex items-center justify-between text-[13px]">
                    <span className="text-[#808080] font-medium">{meta.label}</span>
                    <span className="text-[#1f1f1f] font-semibold text-right">{meta.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#f5f5f5] pt-5 mb-5">
                <h4 className="text-[13px] font-semibold text-[#1f1f1f] mb-3">Downstream Integrations</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { name: 'Student Information System (SIS)', badge: 'Pending' },
                    { name: 'Learning Management (LMS)', badge: 'Pending' },
                    { name: 'Admissions Module', badge: 'Pending' },
                  ].map((sync) => (
                    <div key={sync.name} className="flex items-center justify-between text-[13px]">
                      <span className="text-[#5c5c5c]">{sync.name}</span>
                      <span className={`inline-flex items-center border text-[11px] font-semibold px-2 py-0.5 rounded-full ${syncBadgeClass}`}>
                        {sync.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onCreateSuccessor}
                className="w-full bg-[#046aff] hover:bg-[#254bdb] text-white py-2.5 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Create Successor Draft from v4.0
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
