'use client';

import { useSearchParams } from 'next/navigation';
import { DefaultSignIn } from './components/default-sign-in';
import { ErrorSignIn } from './components/error-sign-in';
import { ExpiredSignIn } from './components/expired-sign-in';
import { NoAccess } from './components/no-access';

/**
 * Auth state router — reads the `?state=` URL param and renders the appropriate
 * auth screen variant matching the Figma "1 — Authentication & Access" section.
 *
 * States:
 *   (none)        → aps-sign-in        default sign-in card on blue background
 *   ?state=error  → aps-sign-in-error  failed login attempt with red alert
 *   ?state=expired→ aps-sign-in-expired session timeout with amber alert
 *   ?state=no-access → aps-no-access   missing planning role / permission denied
 *
 * This component MUST be wrapped in a <Suspense> boundary by its parent server
 * component because it calls useSearchParams() (Next.js App Router requirement).
 */
export function SignInView() {
  const params = useSearchParams();
  const state = params.get('state');

  switch (state) {
    case 'error':
      return <ErrorSignIn />;
    case 'expired':
      return <ExpiredSignIn />;
    case 'no-access':
      return <NoAccess />;
    default:
      return <DefaultSignIn />;
  }
}
