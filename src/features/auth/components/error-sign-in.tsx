'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusNavLogo } from './icons';

/**
 * Error sign-in state — aps-sign-in-error (Figma node 3074:2956).
 *
 * Layout (1440×900 canvas):
 *   - Gradient background (blue → light blue/white, top → bottom).
 *   - Top-left CampusOS nav logo at px-12 py-8.
 *   - White card 440×547 px centred horizontally, y≈176.5 from viewport top.
 *   - Card padding 32 px (px-8 py-8). Content width = 376 px.
 *   - Sections separated by 24 px gaps:
 *       Title (55) → Alert (64) → Fields (176) → Action (68) → ResetLink (24).
 *
 * Field details (error state):
 *   - Labels: 14 px / 20 px height (vs 13 px in default state).
 *   - Inputs:  40 px height with red border (error ring).
 *   - Eye toggle on password input (x=346 in 376-wide wrapper).
 *   - "Forgot password?" right-aligned 8 px BELOW the password input (not inline with label).
 */
export function ErrorSignIn() {
  const [email, setEmail] = useState('laura.hills@odel.edu.ng');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    // In production: re-authenticate, then redirect or show a new error.
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #4E9EFC 0%, #B4DCFB 55%, #EBF5FF 100%)',
      }}
    >
      {/* ── Nav bar — logo at x=48 y=32 on the 1440px canvas ── */}
      <header className="px-12 py-8">
        <CampusNavLogo />
      </header>

      {/* ── Card — centred horizontally, top-biased vertically ── */}
      <div className="flex justify-center px-4 pb-12">
        <div
          className="w-[440px] max-w-full bg-white"
          style={{
            borderRadius: '16px',
            border: '1px solid #E0E0E0',
            boxShadow:
              '0px 4px 6px -2px rgba(0,0,0,0.05), 0px 8px 24px -4px rgba(0,0,0,0.08)',
          }}
        >
          {/* Card inner — 32 px horizontal padding, 32 px vertical padding */}
          <div className="px-8 py-8">
            {/* ── Title section — height 55 px ─────────────────────────── */}
            <div>
              <h1 className="text-[24px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.21]">
                Sign in to Academic Planning
              </h1>
              {/* Subtitle y=35 → 6 px gap from heading bottom (29+6=35) */}
              <p className="mt-1.5 text-[14px] text-[#808080] leading-[1.43]">
                Enter your credentials to manage courses and curricula.
              </p>
            </div>

            {/* ── Error alert — 24 px below title bottom ──────────────── */}
            {/* Figma: 376×64, icon x=12 y=22 (centred), text x=42 y=12 (top-aligned) */}
            <div
              className="mt-6 flex items-start gap-2.5 px-3 py-3"
              style={{
                borderRadius: '8px',
                border: '1px solid #F69999',
                background: '#FEF0F0',
                minHeight: '64px',
              }}
            >
              <AlertCircle
                className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]"
                aria-hidden="true"
              />
              <p className="text-[13px] text-[#DC2626] leading-[1.54]">
                The credentials you entered are incorrect. Please try again.
              </p>
            </div>

            {/* ── Fields section — 24 px below alert bottom ─────────── */}
            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              {/* FieldEmail — height 66 px (label 20 + gap 6 + input 40) */}
              <div>
                <label
                  htmlFor="error-email"
                  className="block text-[14px] font-medium text-[#1F1F1F] leading-[20px]"
                >
                  School Email Address
                </label>
                <input
                  id="error-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5 w-full h-10 px-3 bg-white border rounded-lg text-[14px] text-[#1F1F1F] focus:outline-none focus:ring-2 transition-colors duration-150"
                  style={{
                    borderColor: '#DC2626',
                    // @ts-expect-error — CSS custom property for focus ring
                    '--tw-ring-color': 'rgba(220,38,38,0.15)',
                  }}
                />
              </div>

              {/* Password group — y=82 → 16 px gap after FieldEmail bottom (66+16=82) */}
              {/* Group height = 94 px (password field 66 + gap 8 + forgot pwd 20) */}
              <div className="mt-4">
                <label
                  htmlFor="error-password"
                  className="block text-[14px] font-medium text-[#1F1F1F] leading-[20px]"
                >
                  Password
                </label>
                {/* InputWrapper 376×40 with eye icon at x=346 y=10 */}
                <div className="mt-1.5 relative">
                  <input
                    id="error-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 px-3 pr-10 bg-white border rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 transition-colors duration-150"
                    style={{
                      borderColor: '#DC2626',
                      // @ts-expect-error
                      '--tw-ring-color': 'rgba(220,38,38,0.15)',
                    }}
                  />
                  {/* Eye icon — right: 10px from right edge (376-346-20=10) */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#5C5C5C] transition-colors focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* "Forgot password?" — y=74 in password group → 8 px below input bottom (66+8=74) */}
                {/* Right-aligned: x=257 in 376-wide frame, width=119 (257+119=376 ✓) */}
                <div className="mt-2 flex justify-end">
                  <a
                    href="#"
                    className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* ── Action section — 24 px below fields bottom ────────── */}
              {/* Height 68 px: button (40) + gap (12) + "Need access?" (16) */}
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="default"
                  disabled={loading}
                  className="w-full h-10 text-[14px] font-medium"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>

                {/* "Need access?" — y=52 in Action → 12 px below button bottom */}
                <p className="mt-3 text-center text-[13px] text-[#5C5C5C]">
                  Need access?{' '}
                  <a
                    href="#"
                    className="font-semibold text-[#1F1F1F] hover:underline focus:outline-none focus:underline"
                  >
                    Contact your administrator.
                  </a>
                </p>
              </div>

              {/* ── Reset link — 24 px below Action bottom ────────────── */}
              {/* Height 24 px; text vertically centred (y=8, h=16) */}
              <div className="mt-6 flex justify-center">
                <p className="text-[13px] text-[#808080]">
                  Too many attempts?{' '}
                  <a
                    href="#"
                    className="text-[#046aff] font-medium hover:underline focus:outline-none focus:underline"
                  >
                    Reset your password
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
