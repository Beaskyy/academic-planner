import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SignInView } from '@/features/auth/sign-in-view';

export const metadata: Metadata = {
  title: 'Sign In – CampusOS Academic Planning',
  description:
    'Sign in securely to CampusOS and access Academic Planning for your institution.',
};

/**
 * Login page — serves as the sign-in entry point (Step 1 of the APS user journey).
 *
 * The Suspense boundary is required by Next.js App Router whenever a child
 * client component calls useSearchParams().
 */
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <SignInView />
    </Suspense>
  );
}
