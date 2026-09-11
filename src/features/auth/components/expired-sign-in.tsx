'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Eye, EyeOff, Info } from 'lucide-react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusNavLogo } from './icons';

/**
 * Expired-session sign-in — aps-sign-in-expired (Figma node 3074:2992).
 *
 * Layout (1440×900 canvas):
 *   - Same gradient background as error state.
 *   - Same nav bar.
 *   - White card 440×527 px centred horizontally, y≈186.5.
 *   - Card padding 32 px. Content width = 376 px.
 *   - Sections separated by 24 px gaps:
 *       Title (55) → Alert (64) → Fields (176) → InfoNote (32) → SignInBtn (40).
 *
 * Key differences from error state:
 *   - Heading: "Welcome back".
 *   - Alert: amber/orange warning with Clock icon.
 *   - Email field: pre-filled + read-only (pre-authenticated email remembered).
 *   - Password: empty input with "Enter password" placeholder + eye toggle.
 *   - "Forgot password?" below password input (not inline with label).
 *   - Info note below fields: ℹ previous location saved.
 *   - No "Need access?" / "Reset your password" rows.
 */
export function ExpiredSignIn() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    // In production: re-authenticate → redirect to saved location.
    router.push('/');
  };

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

      {/* ── Card ── */}
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
          <div className="px-8 py-8">
            {/* ── Title — height 55 px ──────────────────────────────── */}
            <div>
              <h1 className="text-[24px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.21]">
                Welcome back
              </h1>
              <p className="mt-1.5 text-[14px] text-[#808080] leading-[1.43]">
                Your session has ended. Please sign in again.
              </p>
            </div>

            {/* ── Warning alert — 24 px below title ────────────────── */}
            {/* Figma: 376×64, clock icon x=12 y=22, text x=42 y=12 */}
            <div
              className="mt-6 flex items-start gap-2.5 px-3 py-3"
              style={{
                borderRadius: '8px',
                border: '1px solid #FCD34D',
                background: '#FFFBEB',
                minHeight: '64px',
              }}
            >
              <Clock
                className="w-5 h-5 shrink-0 mt-0.5 text-[#B45309]"
                aria-hidden="true"
              />
              <p className="text-[13px] text-[#92400E] leading-[1.54]">
                Your session has expired for security. Please sign in again to
                continue.
              </p>
            </div>

            {/* ── Fields section — 24 px below alert ───────────────── */}
            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              {/* FieldEmail — pre-filled read-only */}
              <div>
                <label
                  htmlFor="expired-email"
                  className="block text-[14px] font-medium text-[#1F1F1F] leading-[20px]"
                >
                  School Email Address
                </label>
                <input
                  id="expired-email"
                  type="email"
                  autoComplete="email"
                  value="laura.hills@odel.edu.ng"
                  readOnly
                  className="mt-1.5 w-full h-10 px-3 bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg text-[14px] text-[#5C5C5C] cursor-default focus:outline-none select-none"
                  tabIndex={-1}
                  aria-readonly="true"
                />
              </div>

              {/* Password group */}
              <div className="mt-4">
                <label
                  htmlFor="expired-password"
                  className="block text-[14px] font-medium text-[#1F1F1F] leading-[20px]"
                >
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <input
                    id="expired-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 px-3 pr-10 bg-white border border-[#E0E0E0] rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/10 transition-colors duration-150"
                  />
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

                {/* "Forgot password?" — 8 px below input, right-aligned */}
                <div className="mt-2 flex justify-end">
                  <a
                    href="#"
                    className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* ── Info note — 24 px below fields bottom ────────────── */}
              {/* Figma: info icon 16×16 at x=0 y=0, text x=24 y=0, height=32 (2 lines) */}
              <div className="mt-6 flex items-start gap-2 text-[13px] text-[#808080] leading-[1.54]">
                <Info
                  className="w-4 h-4 shrink-0 mt-0.5 text-[#808080]"
                  aria-hidden="true"
                />
                <span>
                  Your previous location has been saved. You will be returned
                  after signing in.
                </span>
              </div>

              {/* ── Sign In button — 24 px below info note ─────────── */}
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="default"
                  disabled={loading}
                  className="w-full h-10 text-[14px] font-medium"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
