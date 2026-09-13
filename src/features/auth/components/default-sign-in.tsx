'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { CampusAppIcon } from './icons';
import { useLogin } from '@/hooks/use-auth';

/**
 * Default sign-in card — aps-sign-in (Figma node 3074:2932).
 *
 * Integrated with NextAuth & React Query mutation hook (`useLogin`).
 */
export function DefaultSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError('Please enter your email address.');
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
          setFormError(err.message || 'Authentication failed. Please check your credentials.');
        },
      }
    );
  };

  const errorMessage = formError || loginMutation.error?.message;
  const isLoading = loginMutation.isPending;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(ellipse 160% 120% at 50% 0%, #5CA0FF 0%, #1B6AEA 45%, #1050CE 100%)',
      }}
    >
      {/* LoginCard — 480 px wide */}
      <div
        className="w-[480px] max-w-full bg-white overflow-hidden"
        style={{
          borderRadius: '20px',
          boxShadow:
            '0px 8px 10px -4px rgba(0,0,0,0.06), 0px 20px 40px -8px rgba(0,0,0,0.18)',
        }}
      >
        <div className="px-10 pt-10 pb-10">
          {/* ── LogoHeader ──────────────────────────────────────── */}
          <div className="flex flex-col items-center">
            {/* LogoCircle 48×48 */}
            <CampusAppIcon />

            {/* "CampusOS" */}
            <h1 className="mt-2 text-[22px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.32]">
              CampusOS
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-[13px] text-[#808080] leading-[1.3] text-center">
              Enterprise Education Operations
            </p>
          </div>
          {/* ── End LogoHeader ───────────────────────────────────── */}

          {/* Error alert banner */}
          {errorMessage && (
            <div
              className="mt-6 flex items-start gap-2.5 px-3 py-3 rounded-lg border border-[#F69999] bg-[#FEF0F0]"
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            {/* FieldEmail */}
            <div>
              <label
                htmlFor="sign-in-email"
                className="block text-[13px] font-medium text-[#1F1F1F] leading-[16px]"
              >
                Email Address
              </label>
              <input
                id="sign-in-email"
                type="email"
                autoComplete="email"
                placeholder="laura.hills@campusos.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formError) setFormError(null);
                }}
                disabled={isLoading}
                required
                className={`mt-1.5 w-full h-[41px] px-3 bg-[#F5F5F5] border rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:bg-white transition-colors duration-150 ${
                  errorMessage ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#EBEBEB] focus:border-[#046aff]'
                }`}
              />
            </div>

            {/* FieldPassword */}
            <div className="mt-4">
              <div className="flex items-center justify-between leading-[16px]">
                <label
                  htmlFor="sign-in-password"
                  className="text-[13px] font-medium text-[#1F1F1F]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[13px] text-[#046aff] hover:underline focus:outline-none focus:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="sign-in-password"
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
                  className={`w-full h-[41px] px-3 pr-10 bg-[#F5F5F5] border rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:bg-white transition-colors duration-150 ${
                    errorMessage ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#EBEBEB] focus:border-[#046aff]'
                  }`}
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
            </div>

            {/* Action */}
            <div className="mt-6">
              <Button
                type="submit"
                variant="default"
                disabled={isLoading}
                className="w-full h-[41px] text-[14px] font-medium cursor-pointer"
              >
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>

              <p className="mt-4 text-center text-[13px] text-[#808080]">
                Need access?{' '}
                <a
                  href="#"
                  className="text-[#046aff] hover:underline focus:outline-none focus:underline"
                >
                  Contact your administrator
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
