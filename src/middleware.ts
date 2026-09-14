import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getRoleDashboardRoute, isRoleAllowedForRoute } from '@/lib/role-router';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow NextAuth API routes and static assets
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'academic-planner-super-secret-production-key-2026',
  });

  const isLoginPage = pathname === '/login';
  const isWorkspaceSelector = pathname === '/workspace-selector';

  // ── 1. Unauthenticated Users ───────────────────────────────────────────────
  if (!token) {
    if (isLoginPage) return NextResponse.next();
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
  }

  // ── 2. Authenticated Users ─────────────────────────────────────────────────
  const activeRoleName: string = (token.activeRole as any)?.name ?? '';
  const availableWorkspaces: any[] = (token.availableWorkspaces as any[]) ?? [];
  const hasMultipleWorkspaces = availableWorkspaces.length > 1;

  // If hitting /login while already logged in
  if (isLoginPage) {
    if (hasMultipleWorkspaces) {
      return NextResponse.redirect(new URL('/workspace-selector', req.url));
    }
    const dest = getRoleDashboardRoute(activeRoleName);
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // If hitting /workspace-selector
  if (isWorkspaceSelector) {
    // If only one workspace exists, bypass selector and go to dashboard
    if (!hasMultipleWorkspaces && activeRoleName) {
      const dest = getRoleDashboardRoute(activeRoleName);
      return NextResponse.redirect(new URL(dest, req.url));
    }
    return NextResponse.next();
  }

  // If multi-workspace user has not selected an active role yet, force workspace selector
  if (hasMultipleWorkspaces && !activeRoleName) {
    return NextResponse.redirect(new URL('/workspace-selector', req.url));
  }

  // ── 3. Strict Dashboard Route Isolation ────────────────────────────────────
  // Check if active role is permitted to access the requested route
  if (!isRoleAllowedForRoute(activeRoleName, pathname)) {
    const dest = getRoleDashboardRoute(activeRoleName);
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect all application routes except static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
