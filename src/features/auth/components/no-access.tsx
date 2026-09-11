'use client';

import { XCircle } from 'lucide-react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusNavLogo } from './icons';

/**
 * No-access (permission denied) state — aps-no-access (Figma node 3074:3074).
 *
 * Layout (1440×900 canvas):
 *   - Same gradient background as error / expired states.
 *   - Same nav bar.
 *   - White card 500×589 px centred horizontally, y≈155.5.
 *   - Card padding 40 px (px-10 py-10). Content width = 420 px.
 *   - Sections separated by 32 px gaps (note: wider than the 24 px in error state):
 *       Icon (64) → Text (97) → InfoBox (112) → Actions (76) → Footer (32).
 *
 * Info-box row breakdown (height 112 px):
 *   - 20 px top padding
 *   - Role row (20 px)  →  16 px gap  →  divider  →  16 px gap  →  School row (20 px)
 *   - 20 px bottom padding
 *   = 20+20+16+0+16+20+20 = 112 ✓
 *
 * Actions (height 76 px):
 *   - "Request Access" button (height 40)
 *   - 16 px gap
 *   - "Switch to another workspace" link (height 20)
 */
export function NoAccess() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #4E9EFC 0%, #B4DCFB 55%, #EBF5FF 100%)',
      }}
    >
      {/* ── Nav bar ── */}
      <header className="px-12 py-8">
        <CampusNavLogo />
      </header>

      {/* ── Card — 500 px wide ── */}
      <div className="flex justify-center px-4 pb-12">
        <div
          className="w-[500px] max-w-full bg-white"
          style={{
            borderRadius: '16px',
            border: '1px solid #E0E0E0',
            boxShadow:
              '0px 4px 6px -2px rgba(0,0,0,0.05), 0px 8px 24px -4px rgba(0,0,0,0.08)',
          }}
        >
          <div className="px-10 py-10">
            {/* ── Icon container — 64×64 centred (x=218 in 500px card) ── */}
            <div className="flex justify-center">
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{
                  background: '#FEF2F2',
                  borderRadius: '50%',
                }}
              >
                <XCircle
                  className="w-8 h-8 text-[#DC2626]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ── Text section — 32 px below icon ─────────────────── */}
            {/* Height 97 px: heading (29) + gap (8) + description (60) */}
            <div className="mt-8 text-center">
              <h1 className="text-[22px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.32]">
                Academic Planning Access Required
              </h1>
              {/* y=37 in text section → 8 px gap (29+8=37) */}
              <p className="mt-2 text-[14px] text-[#808080] leading-[1.5]">
                You do not have permission to access Academic Planning for ODEL
                University. Your current role does not include planning
                capabilities.
              </p>
            </div>

            {/* ── Info box — 32 px below text ──────────────────────── */}
            <div
              className="mt-8 overflow-hidden"
              style={{
                borderRadius: '12px',
                border: '1px solid #EBEBEB',
              }}
            >
              {/* Role row — 20 px top/bottom padding, 20 px left/right padding */}
              <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#808080]">
                  Your Current Role
                </span>
                <span className="text-[14px] font-semibold text-[#1F1F1F]">
                  Finance Administrator
                </span>
              </div>
              {/* Divider — y=56 in info box → 20 top + 20 row + 16 gap = 56 ✓ */}
              <div style={{ height: '1px', background: '#EBEBEB' }} />
              {/* School row — 16 px gap from divider, 20 px bottom padding */}
              <div className="px-5 pt-4 pb-5 flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#808080]">
                  School
                </span>
                <span className="text-[14px] font-semibold text-[#1F1F1F]">
                  ODEL University – Lagos
                </span>
              </div>
            </div>

            {/* ── Actions — 32 px below info box ───────────────────── */}
            {/* Height 76 px: button (40) + gap (16) + link (20) */}
            <div className="mt-8">
              <Button
                variant="default"
                className="w-full h-10 text-[14px] font-medium"
              >
                Request Access
              </Button>

              {/* "Switch to another workspace" — y=56 in Actions → 16 px below button */}
              {/* Centred: x=113 in 420-wide area, width=194 (113+97=210=420/2 ✓) */}
              <p className="mt-4 text-center">
                <a
                  href="/login"
                  className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                >
                  Switch to another workspace
                </a>
              </p>
            </div>

            {/* ── Footer — 32 px below actions ─────────────────────── */}
            {/* Height 32 px; text at y=16 (vertically centred: (32-16)/2=8 ✓, then +8 ≈ centre) */}
            <p className="mt-8 text-center text-[12px] text-[#B0B0B0] leading-[1.5]">
              If you believe this is an error, contact your school administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
