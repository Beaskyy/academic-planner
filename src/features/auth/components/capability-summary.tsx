'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Shield, Globe, Clock, Building2, User } from 'lucide-react';

export function CapabilitySummary() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<'lagos' | 'accra'>('lagos');
  const [selectedCapability, setSelectedCapability] = useState<'structures' | 'curricula' | 'approvals'>('structures');

  const handleEnterWorkspace = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between">
      {/* Navbar */}
      <header className="h-16 bg-white border-b border-[#ebebeb] px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#046aff] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            OS
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-gray-900 text-sm leading-tight">
              CampusOS
            </span>
            <span className="text-[11px] text-[#046aff] font-medium leading-tight">
              Academic Planning
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold">
            LH
          </div>
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">
            Laura Hills
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-[1040px] mx-auto w-full">
        {/* Greeting Block */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Confirm Academic Planning Access
          </h1>
          <p className="text-[14px] text-[#5c5c5c] mt-2 max-w-[620px] mx-auto leading-relaxed">
            Review the active school, timezone, role, and effective capabilities before entering the workspace.
          </p>
        </div>

        {/* Selection Area (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Column 1: Active School Context */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#808080]">
              Active School Context
            </h2>

            {/* School Card 1: Lagos (Selected) */}
            <div
              onClick={() => setSelectedSchool('lagos')}
              className={`p-4 rounded-[14px] border transition-all cursor-pointer select-none flex flex-col gap-2 ${
                selectedSchool === 'lagos'
                  ? 'bg-white border-[#046aff] shadow-[0px_4px_12px_rgba(4,106,255,0.08)] ring-1 ring-[#046aff]'
                  : 'bg-white border-[#ebebeb] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#0b0b0b]">
                  ODEL University – Lagos
                </span>
                {selectedSchool === 'lagos' && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b] border border-[#d1f2e1]">
                    Selected
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[#5c5c5c] flex items-center gap-1.5">
                <span>Timezone: <span className="font-medium text-[#1f1f1f]">Africa/Lagos</span></span>
                <span>•</span>
                <span>Last accessed: Today</span>
              </div>
            </div>

            {/* School Card 2: Accra */}
            <div
              onClick={() => setSelectedSchool('accra')}
              className={`p-4 rounded-[14px] border transition-all cursor-pointer select-none flex flex-col gap-2 ${
                selectedSchool === 'accra'
                  ? 'bg-white border-[#046aff] shadow-[0px_4px_12px_rgba(4,106,255,0.08)] ring-1 ring-[#046aff]'
                  : 'bg-white border-[#ebebeb] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#0b0b0b]">
                  ODEL University – Accra
                </span>
                <span className="text-[12px] text-[#808080]">
                  Accra, Ghana
                </span>
              </div>
              <div className="text-[12px] text-[#5c5c5c] flex items-center gap-1.5">
                <span>Timezone: <span className="font-medium text-[#1f1f1f]">Africa/Accra</span></span>
                <span>•</span>
                <span>Last accessed: 2 days ago</span>
              </div>
            </div>
          </div>

          {/* Column 2: Effective Capabilities */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#808080]">
              Effective Capabilities
            </h2>

            {/* Capability 1: Structures & Courses — Edit (Active) */}
            <div
              onClick={() => setSelectedCapability('structures')}
              className={`p-3.5 rounded-[12px] border transition-all cursor-pointer select-none flex flex-col gap-1 ${
                selectedCapability === 'structures'
                  ? 'bg-[#f0f8ff] border-[#335cff] shadow-xs'
                  : 'bg-white border-[#ebebeb] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0b0b0b]">
                  Structures &amp; Courses — Edit
                </span>
                {selectedCapability === 'structures' && (
                  <div className="w-4 h-4 rounded-full bg-[#335cff] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                Create, revise, validate, and submit structures and catalogue courses.
              </p>
            </div>

            {/* Capability 2: Curricula & Timetable — View only */}
            <div
              onClick={() => setSelectedCapability('curricula')}
              className={`p-3.5 rounded-[12px] border transition-all cursor-pointer select-none flex flex-col gap-1 ${
                selectedCapability === 'curricula'
                  ? 'bg-[#f0f8ff] border-[#335cff] shadow-xs'
                  : 'bg-white border-[#ebebeb] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0b0b0b]">
                  Curricula &amp; Timetable — View only
                </span>
                {selectedCapability === 'curricula' && (
                  <div className="w-4 h-4 rounded-full bg-[#335cff] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                May inspect published versions; create and edit actions are unavailable.
              </p>
            </div>

            {/* Capability 3: Approvals & Publication — No access */}
            <div
              onClick={() => setSelectedCapability('approvals')}
              className={`p-3.5 rounded-[12px] border transition-all cursor-pointer select-none flex flex-col gap-1 ${
                selectedCapability === 'approvals'
                  ? 'bg-[#f0f8ff] border-[#335cff] shadow-xs'
                  : 'bg-white border-[#ebebeb] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0b0b0b]">
                  Approvals &amp; Publication — No access
                </span>
                {selectedCapability === 'approvals' && (
                  <div className="w-4 h-4 rounded-full bg-[#335cff] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[12px] text-[#5c5c5c] leading-relaxed">
                Hidden from navigation and blocked if opened by protected link.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Confirm Bar */}
        <div className="mt-8 w-full bg-white border border-[#ebebeb] rounded-[16px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-[13px] text-[#5c5c5c] text-center sm:text-left">
            Active: <span className="font-semibold text-[#1f1f1f]">{selectedSchool === 'lagos' ? 'ODEL University – Lagos' : 'ODEL University – Accra'}</span> •{' '}
            <span className="text-[#1f1f1f]">{selectedSchool === 'lagos' ? 'Africa/Lagos' : 'Africa/Accra'}</span> •{' '}
            <span className="text-[#046aff] font-medium">Academic Planning Administrator</span>
          </div>

          <button
            type="button"
            onClick={handleEnterWorkspace}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Enter Planning Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 border-t border-[#ebebeb] bg-white text-center text-xs text-[#808080]">
        CampusOS Academic Planning Platform • v4.2 Requirements Specification
      </footer>
    </div>
  );
}
