'use client';

import React, { useState } from 'react';
import { Sidebar } from '../shared/sidebar';
import { TopBar } from '../shared/top-bar';
import { VersionHistory } from './components/version-history';
import { DeliveryStatus } from './components/delivery-status';
import { AuditTrail } from './components/audit-trail';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export type PublicationTab = 'versions' | 'delivery' | 'audit';

export function PublicationView({ initialTab = 'versions' }: { initialTab?: PublicationTab }) {
  const [activeTab, setActiveTab] = useState<PublicationTab>(initialTab);
  const [isFailureState, setIsFailureState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafa] text-[#1f1f1f] font-['Inter',sans-serif] antialiased overflow-hidden">
      {/* Shared Sidebar */}
      <Sidebar
        activeItem={activeTab === 'audit' ? 'audit' : 'publication'}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-6 pb-28">
          {/* Header Area with Page Title & ViewToggle Tabs */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
              {activeTab === 'audit' ? 'Publication & Audit' : 'Publication'}
            </h1>

            {/* ViewToggle Tabs */}
            <div className="bg-white border border-[#f5f5f5] rounded-[8px] p-1 inline-flex items-center gap-1 self-start shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('versions');
                  setIsFailureState(false);
                }}
                className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all cursor-pointer ${
                  activeTab === 'versions' && !isFailureState
                    ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
                    : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
                }`}
              >
                Version History
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('delivery');
                  setIsFailureState(false);
                }}
                className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
                    : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
                }`}
              >
                Delivery Status
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('audit');
                  setIsFailureState(false);
                }}
                className={`px-4 py-1.5 rounded-[6px] text-[13px] transition-all cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
                    : 'text-[#5c5c5c] font-medium hover:text-[#1f1f1f]'
                }`}
              >
                Audit Logs
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'versions' && (
            <VersionHistory
              isFailureState={isFailureState}
              onToggleFailureState={setIsFailureState}
            />
          )}

          {activeTab === 'delivery' && <DeliveryStatus />}

          {activeTab === 'audit' && <AuditTrail />}
        </main>
      </div>

      {/* Floating Figma Screen Switcher Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 text-xs border border-white/10 max-w-[95vw] overflow-x-auto">
        <span className="text-gray-400 font-medium flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> Figma Screens:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setActiveTab('versions');
              setIsFailureState(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'versions' && !isFailureState
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Versions (aps-25)
          </button>
          <button
            onClick={() => {
              setActiveTab('versions');
              setIsFailureState(true);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'versions' && isFailureState
                ? 'bg-[#fb3748] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Delivery Failure (aps-25)
          </button>
          <button
            onClick={() => {
              setActiveTab('delivery');
              setIsFailureState(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'delivery'
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Delivery Status (aps-26)
          </button>
          <button
            onClick={() => {
              setActiveTab('audit');
              setIsFailureState(false);
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#335cff] text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Audit Trail (aps-27)
          </button>
        </div>
      </div>
    </div>
  );
}
