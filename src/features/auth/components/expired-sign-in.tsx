'use client';

import { useState, type FormEvent } from 'react';
import { Clock, Eye, EyeOff, Info, AlertCircle } from 'lucide-react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusNavLogo } from './icons';
import { useLogin } from '@/hooks/use-auth';

/**
 * Expired-session sign-in — aps-sign-in-expired (Figma node 3074:2992).
 *
 * Integrated with NextAuth & React Query mutation hook (`useLogin`).
 */
export function ExpiredSignIn() {
  const [email] = useState('laura.hills@campusos.edu');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!password) {
      setFormError('Please enter your password to resume your session.');
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onError: (err: any) => {
          setFormError(err.message || 'Authentication failed. Please check your credentials.');
        },
      }
    );
  };

  const errorMessage = formError || loginMutation.error?.message;
  const isLoading = loginMutation.isPending;

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
            {/* ── Title ──────────────────────────────── */}
            <div>
              <h1 className="text-[24px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.21]">
                Welcome back
              </h1>
              <p className="mt-1.5 text-[14px] text-[#808080] leading-[1.43]">
                Your session has ended. Please sign in again.
              </p>
            </div>

            {/* ── Warning alert ────────────────── */}
            <div
              className="mt-6 flex items-start gap-2.5 px-3 py-3 rounded-lg border border-[#FCD34D] bg-[#FFFBEB] min-h-[64px]"
              role="alert"
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

            {/* Error alert if any */}
            {errorMessage && (
              <div
                className="mt-4 flex items-start gap-2.5 px-3 py-3 rounded-lg border border-[#F69999] bg-[#FEF0F0]"
                role="alert"
              >
                <AlertCircle
                  className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]"
                  aria-hidden="true"
                />
                <p className="text-[13px] text-[#DC2626] leading-[1.54]">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* ── Fields section ───────────────── */}
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
                  value={email}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    disabled={isLoading}
                    required
                    className="w-full h-10 px-3 pr-10 bg-white border border-[#E0E0E0] rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#046aff] focus:ring-2 focus:ring-[#046aff]/10 transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#5C5C5C] transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="mt-2 flex justify-end">
                  <a
                    href="#"
                    className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* ── Info note ────────────── */}
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

              {/* ── Sign In button ─────────── */}
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="default"
                  disabled={isLoading}
                  className="w-full h-10 text-[14px] font-medium cursor-pointer"
                >
                  {isLoading ? 'Signing in…' : 'Sign In'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
