'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nqb8limited/odel-fe-design-system';
import { CampusAppIcon } from './icons';

/**
 * Default sign-in card — aps-sign-in (Figma node 3074:2932).
 *
 * Layout (1440×900 canvas):
 *   - Full-page blue radial-gradient background.
 *   - White card  480×452 px, centred horizontally and vertically.
 *   - Card padding 40 px all sides.
 *   - LogoHeader (48 icon + 8 gap + 29 heading + 8 gap + 17 subtitle = 110 px).
 *   - 24 px gap → Form (EmailField 63 + 16 gap + PasswordField 63 = 142 px).
 *   - 24 px gap → Action (SignInBtn 41 + 16 gap + HelperText 15 = 72 px).
 */
export function DefaultSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // Simulate network round-trip; in production replace with a server action.
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push('/login?state=error');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(ellipse 160% 120% at 50% 0%, #5CA0FF 0%, #1B6AEA 45%, #1050CE 100%)',
      }}
    >
      {/* LoginCard — 480 px wide, 452 px tall */}
      <div
        className="w-[480px] max-w-full bg-white overflow-hidden"
        style={{
          borderRadius: '20px',
          boxShadow:
            '0px 8px 10px -4px rgba(0,0,0,0.06), 0px 20px 40px -8px rgba(0,0,0,0.18)',
        }}
      >
        <div className="px-10 pt-10 pb-10">
          {/* ── LogoHeader (110 px) ──────────────────────────────────────── */}
          <div className="flex flex-col items-center">
            {/* LogoCircle 48×48 */}
            <CampusAppIcon />

            {/* "CampusOS" — y=56 from LogoHeader top → 8 px below icon bottom (48+8=56) */}
            <h1 className="mt-2 text-[22px] font-bold text-[#0F172A] tracking-[-0.3px] leading-[1.32]">
              CampusOS
            </h1>

            {/* Subtitle — y=93 from LogoHeader top → 8 px below heading bottom (56+29+8=93) */}
            <p className="mt-2 text-[13px] text-[#808080] leading-[1.3] text-center">
              Enterprise Education Operations
            </p>
          </div>
          {/* ── End LogoHeader ───────────────────────────────────────────── */}

          {/* Form — starts at y=174 within card → 24 px after LogoHeader bottom */}
          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            {/* FieldEmail — height 63 px (label 16 + gap 6 + input 41) */}
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 w-full h-[41px] px-3 bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#046aff] focus:bg-white transition-colors duration-150"
              />
            </div>

            {/* FieldPassword — y=79 within Form → 16 px gap after FieldEmail (63+16=79) */}
            <div className="mt-4">
              {/* LabelRow — label left, "Forgot password?" right */}
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
              <input
                id="sign-in-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5 w-full h-[41px] px-3 bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg text-[14px] text-[#1F1F1F] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#046aff] focus:bg-white transition-colors duration-150"
              />
            </div>

            {/* Action — starts at y=340 within card → 24 px after Form bottom (316+24=340) */}
            <div className="mt-6">
              {/* SignInBtn — 400×41 px */}
              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="w-full h-[41px] text-[14px] font-medium"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>

              {/* HelperText — y=57 in Action → 16 px below button bottom (41+16=57) */}
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
