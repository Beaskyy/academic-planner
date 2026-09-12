'use client';

import React, { useState } from 'react';
import { SharedSidebar } from '@/features/shared/sidebar';
import { TopBar } from '@/features/shared/top-bar';
import {
  ClosePeriodModal,
  ConcurrentEditModal,
  SignOutModal,
  ResolutionStrategy,
} from '@/features/system-modals';
import {
  Calendar,
  AlertTriangle,
  LogOut,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function SystemModalsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal open states
  const [closePeriodOpen, setClosePeriodOpen] = useState(false);
  const [concurrentEditOpen, setConcurrentEditOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  // Notifications / feedback
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] flex w-full">
      {/* Sidebar */}
      <SharedSidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#808080] uppercase tracking-wider">
              <span>Section 10</span>
              <span>•</span>
              <span>Lifecycle &amp; Session Management</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
                  System Modals &amp; Operations
                </h1>
                <p className="text-[14px] text-[#5c5c5c] mt-1">
                  High-fidelity modal implementations matching Figma node <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">3305:22165</code>
                </p>
              </div>

              {lastAction && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lastAction}</span>
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Close Academic Period */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col justify-between gap-6 hover:border-[#046aff]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#fff1f2] border border-[#fecdd3] text-[#fb3748] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#808080] tracking-wider uppercase">
                    aps-period-close (3305:22166)
                  </div>
                  <h2 className="text-[18px] font-bold text-[#0b0b0b] mt-0.5">
                    Close Academic Period
                  </h2>
                  <p className="text-[13px] text-[#5c5c5c] mt-1.5 leading-relaxed">
                    Triggered from Academic Calendar. Includes pre-close system checklist, closing impact warning, and explicit state confirmation.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
                <button
                  type="button"
                  onClick={() => setClosePeriodOpen(true)}
                  className="w-full py-2.5 px-4 bg-[#fb3748] hover:bg-[#e02839] text-white text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Open Close Period Modal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-[#808080] text-center">
                  Trigger: &ldquo;→ Click &lsquo;Close Period&rsquo;&rdquo;
                </div>
              </div>
            </div>

            {/* Card 2: Concurrent Edit Detected */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col justify-between gap-6 hover:border-[#046aff]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#fef6ee] border border-[#fbd5c0] text-[#ea580c] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#808080] tracking-wider uppercase">
                    aps-concurrent-edit (3305:22279)
                  </div>
                  <h2 className="text-[18px] font-bold text-[#0b0b0b] mt-0.5">
                    Concurrent Edit Detected
                  </h2>
                  <p className="text-[13px] text-[#5c5c5c] mt-1.5 leading-relaxed">
                    Triggered upon conflicting changes. Side-by-side comparison of local changes vs server version with 3 resolution strategies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
                <button
                  type="button"
                  onClick={() => setConcurrentEditOpen(true)}
                  className="w-full py-2.5 px-4 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Open Concurrent Edit Modal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-[#808080] text-center">
                  Trigger: &ldquo;⚠️ State: Concurrent edit detected&rdquo;
                </div>
              </div>
            </div>

            {/* Card 3: Sign Out of CampusOS */}
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col justify-between gap-6 hover:border-[#046aff]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#f0f8ff] border border-[#bae6fd] text-[#046aff] flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#808080] tracking-wider uppercase">
                    aps-sign-out (3305:22399)
                  </div>
                  <h2 className="text-[18px] font-bold text-[#0b0b0b] mt-0.5">
                    Sign Out of CampusOS
                  </h2>
                  <p className="text-[13px] text-[#5c5c5c] mt-1.5 leading-relaxed">
                    Center modal card for ending user session with school/workspace switching links and active session duration summary.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
                <button
                  type="button"
                  onClick={() => setSignOutOpen(true)}
                  className="w-full py-2.5 px-4 bg-[#0b0b0b] hover:bg-neutral-800 text-white text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Open Sign Out Dialog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-[#808080] text-center">
                  Trigger: &ldquo;→ Avatar menu → Sign Out&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Inline Previews Container */}
          <div className="mt-4 bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#046aff]" />
                <h3 className="text-[16px] font-bold text-[#0b0b0b]">
                  Section 10 System Modals Reference Specs
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-[#5c5c5c] rounded-md">
                3 Interactive Modals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#5c5c5c]">
              <div className="p-3.5 rounded-lg bg-[#fafafa] border border-[#f0f0f0] flex flex-col gap-2">
                <div className="font-bold text-[#0b0b0b] text-[13px]">1. Close Academic Period</div>
                <div>• Width: 640px, rounded-[16px]</div>
                <div>• Pre-close 5-point system check with emerald checks</div>
                <div>• Closing impact warning banner (orange)</div>
                <div>• Explicit confirmation checkbox validation</div>
                <div>• Danger red action: Close Period</div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#fafafa] border border-[#f0f0f0] flex flex-col gap-2">
                <div className="font-bold text-[#0b0b0b] text-[13px]">2. Concurrent Edit Detected</div>
                <div>• Width: 760px, rounded-[16px]</div>
                <div>• Split columns: Local changes vs Server saved values</div>
                <div>• Highlighted diff boxes (yellow local vs neutral server)</div>
                <div>• 3-tier selectable radio resolution strategy</div>
                <div>• Primary action: Apply Resolution</div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#fafafa] border border-[#f0f0f0] flex flex-col gap-2">
                <div className="font-bold text-[#0b0b0b] text-[13px]">3. Sign Out Dialog</div>
                <div>• Width: 480px, rounded-[24px], centered card</div>
                <div>• User identity: Laura Hills (email, school context)</div>
                <div>• Branded sign out button &amp; cancel</div>
                <div>• Switch School / Switch Workspace links</div>
                <div>• Session duration &amp; timezone footer</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <ClosePeriodModal
        isOpen={closePeriodOpen}
        onClose={() => setClosePeriodOpen(false)}
        onConfirmClose={() => {
          setLastAction('Academic Period closed successfully (Semester 1 marked historical)');
        }}
      />

      <ConcurrentEditModal
        isOpen={concurrentEditOpen}
        onClose={() => setConcurrentEditOpen(false)}
        onApplyResolution={(strategy) => {
          setLastAction(`Resolution strategy applied: ${strategy}`);
        }}
      />

      <SignOutModal
        isOpen={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirmSignOut={() => {
          setLastAction('User signed out of CampusOS session');
        }}
      />
    </div>
  );
}
