'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusNavLogo } from './icons';
import { useLogin } from '@/hooks/use-auth';

/**
 * Error sign-in state — aps-sign-in-error (Figma node 3074:2956).
 *
 * Integrated with NextAuth & React Query mutation hook (`useLogin`).
 */
export function ErrorSignIn() {
  const [email, setEmail] = useState('laura.hills@odel.edu.ng');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError('Please enter your school email address.');
      return;
    }

    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onError: (err: any) => {
          setFormError(err.message || 'The credentials you entered are incorrect. Please try again.');
        },
      }
    );
  };

  const errorMessage =
    formError ||
    loginMutation.error?.message ||
    'The credentials you entered are incorrect. Please try again.';
  const isLoading = loginMutation.isPending;

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
          {/* Card inner */}
          <div className="px-8 py-8">
            {/* ── Title section ─────────────────────────── */}
            <div>
              <h1 className="text-[24px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.21]">
                Sign in to Academic Planning
              </h1>
              <p className="mt-1.5 text-[14px] text-[#808080] leading-[1.43]">
                Enter your credentials to manage courses and curricula.
              </p>
            </div>

            {/* ── Error alert ──────────────── */}
            <div
              className="mt-6 flex items-start gap-2.5 px-3 py-3 rounded-lg border border-[#F69999] bg-[#FEF0F0] min-h-[64px]"
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

            {/* ── Fields section ─────────── */}
            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              {/* FieldEmail */}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  disabled={isLoading}
                  required
                  className="mt-1.5 w-full h-10 px-3 bg-white border border-[#DC2626] rounded-lg text-[14px] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-colors duration-150"
                />
              </div>

              {/* Password group */}
              <div className="mt-4">
                <label
                  htmlFor="error-password"
                  className="block text-[14px] font-medium text-[#1F1F1F] leading-[20px]"
                >
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <input
                    id="error-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    disabled={isLoading}
                    required
                    className="w-full h-10 px-3 pr-10 bg-white border border-[#DC2626] rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#1F1F1F] cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <a
                    href="#"
                    className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* ── Action ───────────────────────── */}
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

              {/* ── ResetLink ─────────────────── */}
              <p className="mt-6 text-center text-[13px] text-[#808080]">
                Need to reset your credentials?{' '}
                <a
                  href="#"
                  className="text-[#046aff] hover:underline focus:outline-none focus:underline"
                >
                  Contact IT Support
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
